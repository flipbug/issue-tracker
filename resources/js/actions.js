import Project from './models/project.js';
import Issue from './models/issue.js';

module.exports = {
    loadProjects: loadProjects,
    toggleProjectForm: toggleProjectForm,
    addProject: addProject,
    addIssue: addIssue,
    removeIssue: removeIssue,
    toggleIssue: toggleIssue,
    switchProjectById: switchProjectById,
}

function loadProjects() {
    return function(dispatch,getState) {
        // read from storage
        var json = JSON.parse(localStorage.getItem("projects"));
        var objects = json ? json.projects : [];
        var projects = [];
        // restore objects
        for (var i = 0; i < objects.length; i++) {
            var project = new Project(objects[i]);
            var issues = objects[i].issues;
            for (var j = 0; issues && j < issues.length; j++) {
                project.issues[j] = new Issue(issues[j]);
            }
            projects.push(project);
        }
        dispatch(projectsLoaded(projects));
        dispatch(switchProject(projects[0])) // not very nice
    }
}

function addProject(data) {
    return function(dispatch, getState) {
        var project = new Project(data);
        dispatch(projectAdded(project));
        dispatch(switchProject(project));
        project.save(function(result) {
            dispatch(projectUpdated(new Project(result)));
            console.info("project saved");
        }.bind(dispatch));
    }
}

function addIssue(project, data) {
    // project.addIssue is asynchronous, but we don't need to wait for it 
    return function(dispatch, getState) {
        project.addIssue(new Issue(data), function(issue) {
            project.issues.forEach(function(el) {
                if (el.client_id == issue.client_id) el = issue;
            });
            dispatch(projectUpdated(project));
            console.info("issue saved");
        }.bind(dispatch));
        dispatch(projectUpdated(project));
    }
}

function toggleIssue(project, data) {
    return function(dispatch, getState) {
        project.toggleIssue(data.id, function(issue) {
            console.info("issue saved");
            dispatch(projectUpdated(project));
        }.bind(dispatch));
        dispatch(projectUpdated(project));
    }
}

function removeIssue(project, data) {
    return function(dispatch, getState) {
        project.removeIssue(data.id, function() {
            console.info("issue removed");
            dispatch(projectUpdated(project));

        }.bind(dispatch));
        dispatch(projectUpdated(project));
    }
}

function syncIssues(project) {
    return function(dispatch, getState) {
        console.log("start sync");
        project.syncIssues(function() {
            dispatch(projectUpdated(project));
        }.bind(dispatch));
    }
}

function projectAdded(project) {
    return {type:'PROJECT_ADDED', data: project}
}

function projectsLoaded(projects) {
    return {type:'PROJECTS_LOADED', data: projects}
}

function projectUpdated(project) {
    return {type:'PROJECT_UPDATED', data: project}
}

function switchProjectById(id) {
    return function(dispatch, getState) {
        console.log(getState());
        var project = getState().projects.find(function(el) {
            return el.id == id;
        });
        dispatch(switchProject(project));
    }
}

function switchProject(project) {
    return function(dispatch, getState) {
        dispatch(syncIssues(project));
        dispatch(projectSwitch(project));
    }
}

function projectSwitch(project) {
    return {type:'PROJECT_SWITCH', data: project}
}

function toggleProjectForm() {
  return {type:'TOGGLE_PROJECT_FORM'}
}