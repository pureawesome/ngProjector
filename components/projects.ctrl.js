(function() {
  "use strict";

  angular
    .module("ngProjector.projectsCtrl", [])
    .controller("ProjectListCtrl", function ($scope, $stateParams, Project) {
      $scope.projects = Project.query();
    });
})();
