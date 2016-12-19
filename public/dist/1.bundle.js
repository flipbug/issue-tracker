webpackJsonp([1],{

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"superagen\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var ApiService = function () {
	    function ApiService() {
	        _classCallCheck(this, ApiService);

	        this.request = window.superagent;
	        this.api_url = '';
	    }

	    _createClass(ApiService, [{
	        key: 'get',
	        value: function get(url, success) {
	            this.request.get(url).then(success, this._failure);
	        }
	    }, {
	        key: 'add',
	        value: function add(url, obj, success) {
	            this.request.post(url).type('json').send(obj.toJson()).then(function (res) {
	                console.log("obj created");
	                if (success) success(res.body);
	            }, this._failure);
	        }
	    }, {
	        key: 'update',
	        value: function update(url, obj, success) {
	            this.request.put(url).type('json').send(obj.toJson()).then(function (res) {
	                console.log("obj updated");
	                if (success) success(res.body);
	            }, this._failure);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(url, success) {
	            this.request.delete(url).type('json').then(function (res) {
	                console.log("obj deleted");
	                if (success) success(res.body);
	            }, this._failure);
	        }
	    }, {
	        key: '_failure',
	        value: function _failure(data) {
	            console.error("An Error Occured");
	            console.log(data);
	        }
	    }]);

	    return ApiService;
	}();

	module.exports = ApiService;

/***/ }

});