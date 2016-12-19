import Model from './model.js';
import Issue from './issue.js';
import ProjectApiService from '../services/project-api-service.js';
import IssueApiService from '../services/issue-api-service.js';

export default class Project extends Model {

    constructor(object) {
        super();
    
        var defaultData = {id: 0, client_id: '', name: '', issues: [], active: true};
        var data = Object.assign({}, defaultData, object);

        this.id = data.id;
        this.client_id = data.client_id;
        this.name = data.name;
        this.issues = data.issues;
        this.active = data.active;

        this.api = new ProjectApiService();
        this.issueApi = new IssueApiService();

        if (!this.client_id) {
            this.client_id = super.generateId();
        }
    }

    addIssue(issue, callback) {
        issue.project_id = this.id;
        issue.project_client_id = this.client_id;
        this.issues.push(issue);
        issue.save(function(data) {
            // update issue after successfull api call
            var issue = {}
            this.issues.forEach(function(el) {
                if (el.client_id == data.client_id){
                    el = new Issue(data);
                    issue = el;
                } 
            });
            if (callback) callback(issue);
        }.bind(this));
    }

    removeIssue(id, callback) {
        for (var i = 0; i < this.issues.length; i++) {
            if (id == this.issues[i].id) {
                this.issues[i].delete(callback);
                this.issues.splice(i, 1);
            }
        }
    }

    toggleIssue(id, callback) {
        for (var i = 0; i < this.issues.length; i++) {
            if (id == this.issues[i].id) {
                this.issues[i].toggleDone(callback)
            }
        }
    }

    syncIssues(callback) {
        this.issueApi.get(this.id, function(data) {
            var issues = [];
            for(var i = 0; i < data.length; i++) {
                issues.push(new Issue(data[i]));
            }
            this.issues = issues;
            console.log(data);
            if (callback) callback();
        }.bind(this));
    }

    save(callback) {
        if (this.id == 0) {
            this.api.add(this, function(data) {
                this.id = data.id;
                if (callback) callback(data);
            }.bind(this));
        } else {
            this.api.update(this, callback);
        }
    }

    delete(callback) {
        this.api.delete(this, callback);
    }

    toJson() {
        return JSON.stringify({
            id: this.id,
            client_id: this.client_id,
            title: this.name,
            active: this.active });
    }

}
