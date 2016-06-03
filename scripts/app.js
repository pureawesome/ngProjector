angular.module("ngProjector", ["ui.router", "ngResource", "ngMaterial", "ngMessages", "ngStorage", "ngProjector.projectsCtrl", "ngProjector.resourcesCtrl", "ngProjector.accessCtrl", "ngProjector.services"]);

angular.module("ngProjector").config(function($stateProvider, $httpProvider) {
  $stateProvider
  .state("projects", {
    url: '/projects',
    templateUrl: 'partials/project/projects.html',
    controller: 'ProjectListCtrl'
  })
  .state('viewProject', {
    url: '/projects/:id/view',
    templateUrl: 'partials/project/project-view.html',
    controller: 'ProjectViewCtrl'
  })
  .state('newProject', {
    url: '/projects/new',
    templateUrl: 'partials/project/project-add.html',
    controller: 'ProjectCreateCtrl'
  })
  .state('editProject', {
    url: '/projects/:id/edit',
    templateUrl: 'partials/project/project-edit.html',
    controller: 'ProjectEditCtrl'
  })

  .state("resources", {
    url: '/resources',
    templateUrl: 'partials/resource/resources.html',
    controller: 'ResourceListCtrl'
  })
  .state('viewResource', {
    url: '/resources/:id/view',
    templateUrl: 'partials/resource/resource-view.html',
    controller: 'ResourceViewCtrl'
  })
  .state('newResource', {
    url: '/resources/new',
    templateUrl: 'partials/resource/resource-add.html',
    controller: 'ResourceCreateCtrl'
  })
  .state('editResource', {
    url: '/resources/:id/edit',
    templateUrl: 'partials/resource/resource-edit.html',
    controller: 'ResourceEditCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'partials/access/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'partials/access/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'vm'
  })

  .state("home", {
    url: '/',
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  });
}).run(function($state, $location, $localStorage, $rootScope){
  // $state.go("home");
  console.log($localStorage.currentUser);
  // redirect to login page if not logged in and trying to access a restricted page
  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/login'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.currentUser) {
      $location.path('/login');
    }
  });
});
