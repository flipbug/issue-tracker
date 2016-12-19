import ApiService from './api-service.js';

export default class IssueApiService extends ApiService {
    constructor() {
        super();
        this.api_url = 'http://zhaw-web3-issue-tracker-api.herokuapp.com/api/project/';
    }

    get(project_id, success) {
        super.get(this.api_url + project_id + '/issues', success);
    }

    add(issue, success) {
        super.add(this.api_url + issue.project_id + '/issues', issue, success)
    }

    update(issue, success) {
        super.update(this.api_url + issue.project_id + '/issues/' + issue.id, issue, success)
    }

    delete(issue, success) {
        super.delete(this.api_url + issue.project_id + '/issues/' + issue.id, success)
    }
}