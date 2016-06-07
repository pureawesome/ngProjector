(function() {
  "use strict";

  angular
    .module("ngProjector.resourcesCtrl", [])
    .controller("ResourceListCtrl", function ($scope, $state, $stateParams, Resource) {
      $scope.resources = Resource.query();

      $scope.deleteResource = function(resource) {
        // if (popupService.showPopup('Really delete this?')) {
          resource.$delete(function() {
            $state.go($state.current, {}, {reload: true});
          });
        // }
      };
    })
    .controller('ResourceViewCtrl', function($scope, $stateParams, Resource) {
      $scope.data = Resource.get({ id: $stateParams.id });
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
        Resource.update($scope.resource)
        $state.go('resources');
      };

      $scope.loadResource = function() {
        Resource.get({ id: $stateParams.id }, function(data) {
          $scope.resource = data.resource;
        });
      };

      $scope.loadResource();
    });
})();
