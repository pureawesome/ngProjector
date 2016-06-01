(function() {
  "use strict";

  angular
    .module("ngProjector.projectsCtrl", [])
    .controller("ProjectListCtrl", function ($scope, $stateParams, Project) {
      $scope.projects = Project.query();

      $scope.deleteProject = function(project) {
        if (popupService.showPopup('Really delete this?')) {
          project.$delete(function() {
            $window.location.href = '';
          });
        }
      };
    })
    .controller('ProjectViewCtrl', function($scope, $stateParams, Project) {
      $scope.project = Project.get({ id: $stateParams.id });
    })
    .controller('ProjectCreateCtrl', function($scope, $state, $stateParams, Project) {
      $scope.project = new Project();

      $scope.addProject = function() {
        $scope.project.$save(function() {
          $state.go('projects');
        });
      };
    })
    .controller('ProjectEditCtrl', function($scope, $state, $stateParams, Project) {
      $scope.updateProject = function() {
        $scope.project.$update(function() {
          $state.go('projects');
        });
      };

      $scope.loadProject = function() {
        $scope.project = Project.get({ id: $stateParams.id });
        console.log($scope.project);
        $scope.project.start_date = new Date($scope.project.start_date);
        console.log($scope.project.start_date);
      };

      $scope.loadProject();
    });
})();
