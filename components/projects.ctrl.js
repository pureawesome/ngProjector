(function() {
  "use strict";

  angular
    .module("ngProjector.projectsCtrl", [])
    .controller("ProjectListCtrl", function ($scope, $state, $stateParams, Project) {
      $scope.projects = Project.query();

      $scope.deleteProject = function(project) {
        // if (popupService.showPopup('Really delete this?')) {
          project.$delete(function() {
            $state.go($state.current, {}, {reload: true});
          });
        // }
      };

      var originatorEv;
      $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };
    })
    .controller('ProjectViewCtrl', function($scope, $stateParams, Project, Task, Booking, $mdDialog, $mdMedia) {
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

      $scope.showBooking = function(id){
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        var data = Booking.get({ id: id });

        $mdDialog.show({
          controller: ['$scope', 'data', function($scope, data) {
            $scope.data = data;
          }],
          templateUrl: '/partials/booking/booking-view.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          fullscreen: useFullScreen,
          locals: { data: data }
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
        Project.update($scope.project);
        $state.go('projects');
      };

      $scope.loadProject = function() {
        Project.get({ id: $stateParams.id }, function(data){
          $scope.project = data.project;
          $scope.project.start_date = new Date(data.project.start_date);
          $scope.project.projected_end_date = new Date(data.project.projected_end_date);
          $scope.project.actual_end_date = new Date(data.project.actual_end_date);
        });
      };

      $scope.loadProject();
    })
    .controller("DialogController", function($scope, $mdDialog) {
      console.log('test');
    });
})();
