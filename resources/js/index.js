var riot = require('riot');
var redux = require('redux');
var thunk = require('redux-thunk')

require('../scss/styles.scss');

require('../components/projects.tag.html');
require('../components/project.tag.html')
require('../components/projectcreate.tag.html');
require('../components/projectselector.tag.html');
require('../components/issuelist.tag.html');
require('../components/issue.tag.html');
require('../components/issuecreate.tag.html');

var reducer = require('./reducer.js');

var createStoreWithMiddleware = redux.compose(
  redux.applyMiddleware(thunk)
)(redux.createStore)

var reduxStore = createStoreWithMiddleware(reducer)

document.addEventListener('DOMContentLoaded', () => {
    riot.route.stop();
    riot.route.start(true);
    riot.mount('projects, projectselector', {store:reduxStore});
});