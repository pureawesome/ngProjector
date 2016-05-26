angular.module("ngProjector", ["ui.router", "ngResource", "ngMaterial", "ngProjector.projectsCtrl", "ngProjector.services"]);

angular.module("ngProjector").config(function($stateProvider, $httpProvider) {
  $stateProvider.state("projects", {
    url: '/projects',
    templateUrl: 'partials/project/projects.html',
    controller: 'ProjectListCtrl'
  }).state('viewProject', {
    url: '/projects/:id/view',
    templateUrl: 'partials/project/project-view.html',
    controller: 'ProjectViewController'
  }).state('newProject', {
    url: '/projects/new',
    templateUrl: 'partials/project/project-add.html',
    controller: 'ProjectCreateController'
  }).state('editProject', {
    url: '/projects/:id/edit',
    templateUrl: 'partials/project/project-edit.html',
    controller: 'ProjectEditController'
  }).state("home", {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  });
}).run(function($state){
  $state.go("home");
});
