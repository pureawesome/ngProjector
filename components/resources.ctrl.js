(function() {
  "use strict";

  angular
    .module("ngProjector.resourcesCtrl", [])
    .controller("ResourceListCtrl", function ($scope, $stateParams, Resource) {
      $scope.resources = Resource.query();

      $scope.deleteResource = function(resource) {
        if (popupService.showPopup('Really delete this?')) {
          resource.$delete(function() {
            $window.location.href = '';
          });
        }
      };
    })
    .controller('ResourceViewCtrl', function($scope, $stateParams, Resource) {
      $scope.resource = Resource.get({ id: $stateParams.id });
    })
    .controller('ResourceCreateCtrl', function($scope, $state, $stateParams, Resource) {
      $scope.resource = new Resource();

      $scope.addResource = function() {
        $scope.resource.$save(function() {
          $state.go('resources');
        });
      };
    })
    .controller('ResourceEditCtrl', function($scope, $state, $stateParams, Resource) {
      $scope.updateResource = function() {
        $scope.resource.$update(function() {
          $state.go('resources');
        });
      };

      $scope.loadResource = function() {
        $scope.resource = Resource.get({ id: $stateParams.id });
      };

      $scope.loadResource();
    });
})();
