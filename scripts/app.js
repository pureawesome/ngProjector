angular.module("ngProjector", ["ui.router", "ngResource", "ngProjector.projectsCtrl", "ngProjector.services"]);

angular.module("ngProjector").config(function($stateProvider, $httpProvider) {
  $stateProvider.state("projects", {
    url: '/projects',
    templateUrl: 'partials/projects.html',
    controller: 'ProjectListCtrl'
  });
}).run(function($state){
  $state.go("projects");
});
