import Model from './model.js';
import IssueApiService from '../services/issue-api-service.js';

export default class Issue extends Model {

    constructor(object) {
        super();

        var defaultData = {id: 0, client_id: '', project_id: 0, priority: 0, title: '', due_date: '', done: false, project_client_id: 0};
        var data = Object.assign({}, defaultData, object);

        this.id = data.id;
        this.client_id = data.client_id;
        this.project_id = data.project_id;
        this.project_client_id = data.project_client_id;
        this.priority = data.priority;
        this.title = data.title;
        this.due_date = data.due_date;
        this.done = data.done;

        this.api = new IssueApiService();
        
        if (!this.id) {
            this.id = 0;
        }

        if (!this.client_id) {
            this.client_id = this.generateId();
        }
    }

    toggleDone(callback) {
        this.done = !this.done;
        console.log(this.done);
        this.save(callback);
    }

    save(callback) {
        if (this.id == 0) {
            var self = this;
            this.api.add(this, function(data) {
                self.id = data.id;
                if (callback) callback(self);
            });
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
            project_id: this.project_id,
            project_client_id: this.project_client_id,
            title: this.title,
            done: this.done,
            priority: this.priority,
            due_date: this.due_date });
    }

}