import ApiService from './api-service.js';

export default class ProjectApiService extends ApiService {
    constructor() {
        super();
        this.api_url = 'http://zhaw-web3-issue-tracker-api.herokuapp.com/api/projects/';
    }

    get(success) {
        super.get(this.api_url, success);
    }

    add(project, success) {
        super.add(this.api_url, project, success)
    }

    update(project, success) {
        super.update(this.api_url + project.id, project, success)
    }

    delete(project, success) {
        super.delete(this.api_url + project.id, success)
    }
}