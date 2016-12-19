class ProjectCollection {

    constructor(bus) {
        // Local state
        this.collection = [];

        // Configuration
        this.localStorage_key = 'projects';

        this.projectApi = new ProjectApiService(bus);

        this.bus = bus;
        
        this.fetch();
    }

    get(id) {
        return this.collection.find(function(el) {
            return el.id == id;
        });
    }

    all() {
        return this.collection;
    }

    // Saving collection to localStorage
    persistLocalStorage() {
        console.log("persist");
        localStorage.setItem(this.localStorage_key, JSON.stringify(this.collection));
    }

    // Adds a model to the collection and persists it
    add(project) {
        var self = this;
        project.save(function(data) {
            self.collection.push(project);
            self.persistLocalStorage();
            self.bus.trigger('collectionUpdated');
        });
    }

    // Fetch models from localStorage into collection
    fetch() {
        // empty collection first
        this.collection = [];
        
        // read from storage
        var objects = JSON.parse(localStorage.getItem(this.localStorage_key)) || [];
        
        // restore objects
        for (var i = 0; i < objects.length; i++) {
            var issues = objects[i].issues;
            var project = new Project(objects[i].id, objects[i].client_id, objects[i].name, [], objects[i].active);
            for (var j = 0; issues && j < issues.length; j++) {
                project.addIssue(this.createIssue(issues[j]));
            }
            this.collection.push(project);
        }
        
        // sync projects asynchronously
        var self = this;
        //setInterval(function() { 
            self.sync();
        //}, 2000);

        this.bus.trigger('collectionUpdated');
    }

    sync() {
        this.collection.forEach(function(project, index) {
            this.syncProject(project);
        }, this);
    }

    syncProject(project) {
        var issueApi = new IssueApiService();
        var self = this;
        issueApi.get(project.id, function(data) {
            var issues = [];
            for (var j = 0; data.body && j < data.body.length; j++) {
                issues.push(self.createIssue(data.body[j]));
            }
            project.issues = issues;
            self.bus.trigger('projectSynced');
            self.persistLocalStorage();
        });
    }

    createIssue(data) {
        return new Issue(data.id, 
                        data.client_id, 
                        data.project_id, 
                        data.priority, 
                        data.title, 
                        data.due_date, 
                        data.done,
                        data.project_client_id);
    }
}