(function() {
  "use strict";

  angular
    .module("ngProjector.projectsCtrl", [])
    .controller("ProjectListCtrl", function ($scope, $stateParams, Project) {
      $scope.projects = Project.query();

      $scope.deleteProject = function(project) {
        // if (popupService.showPopup('Really delete this?')) {
          project.$delete(function() {
            $window.location.href = '';
          });
        // }
      };

      var originatorEv;
      $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };
    })
    .controller('ProjectViewCtrl', function($scope, $stateParams, Project, Task, $mdDialog, $mdMedia) {
      $scope.data = Project.get({ id: $stateParams.id });

      $scope.showTask = function(id){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        var task = Task.get({ project: $stateParams.id, id: id });

        $mdDialog.show({
          controller: ['$scope', 'task', function($scope, task) {
            $scope.task = task;
          }],
          templateUrl: '/partials/task/task-view.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          locals: { task: task }
        });

        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      }
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
        $scope.project.start_date = new Date($scope.project.start_date);
      };

      $scope.loadProject();
    })
    .controller("DialogController", function($scope, $mdDialog) {
      console.log('test');
    });
})();
