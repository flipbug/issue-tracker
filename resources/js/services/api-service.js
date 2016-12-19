var request = require('superagent');

export default class ApiService {

    constructor() {
        this.request = request;
        this.api_url = '';
    }

    get(url, success) {
        this.request
            .get(url)
            .type('json')
            .then(function(res) {
                console.log("obj created");
                if(success) success(res.body);
        }, this._failure);
    }

    add(url, obj, success) {
        this.request
            .post(url)
            .type('json')
            .send(obj.toJson())
            .then(function(res) {
                console.log("obj created");
                if(success) success(res.body);
        }, this._failure);
    }

    update(url, obj, success) {
        this.request
            .put(url)
            .type('json')
            .send(obj.toJson())
            .then(function(res) {
                console.log("obj updated");
                if(success) success(res.body);
        }, this._failure);
    }

    delete(url, success) {
        this.request
            .delete(url)
            .type('json')
            .then(function(res) {
                console.log("obj deleted");
                if(success) success(res.body);
        }, this._failure);
    }

    _failure(data) {
        console.error("An Error Occured");
        console.log(data);
    }
}