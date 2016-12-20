module.exports = reducer;

function reducer(state={projects: [], currentProject: {}, showProjectForm: false, projectLoaded: false}, action) {
    console.log("-- State --");
    console.log(action);
    
    switch(action.type) {
        case 'PROJECTS_LOADED':
            state = Object.assign({}, state, {projects: action.data, projectLoaded: true});
            break;
        case 'PROJECT_SWITCH':
            state = Object.assign({}, state, {currentProject: action.data});
            break;
        case 'PROJECT_ADDED':
            var projects = state.projects;
            projects.push(action.data);
            state = Object.assign({}, state, {projects: projects});
            break;
        case 'PROJECT_UPDATED':
            var projects = state.projects;
            projects.forEach(function(el) {
                if (el.client_id == action.data.client_id) el = action.data;
            });
            state = Object.assign({}, state, {projects: projects});
            break;
        case 'TOGGLE_PROJECT_FORM':
            state = Object.assign({}, state, {showProjectForm: !state.showProjectForm});
            break;
    }

    // check if projects are already loaded, otherwise we would overwrite them
    if (state.projectLoaded) {
        persistLocalStorage(state);
    }

    return state;
    
}

function persistLocalStorage(data) {
    console.log("persist localstorage");
    localStorage.setItem("projects", JSON.stringify(data));
}