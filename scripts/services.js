angular.module('ngProjector.services',[])
.factory('Project', function($resource, $localStorage) {
  return $resource('http://localhost:3000/projects/:id',
  { id: '@id' },
  {
    update: {method: 'PUT'}
  }
  );
})
.factory('Resource', function($resource) {
  return $resource('http://localhost:3000/resources/:id', { id: '@id' },
    {
      'update': { method:'PUT' }
    }
  );
})
.factory('Task', function($resource) {
  return $resource('http://localhost:3000/projects/:project/tasks/:id', { project: '@project', id: '@id' },
    {
      'update': { method:'PUT' }
    }
  );
})
.factory('Booking', function($resource) {
  return $resource('http://localhost:3000/bookings/:id', { id: '@id' },
    {
      'update': { method:'PUT' }
    }
  );
})
.factory('Authentication', function($http, $localStorage) {
  var service = {};

  service.Login = Login;
  service.Logout = Logout;

  return service;

  function Login(email, password, callback) {

    $http.post('http://localhost:3000/authenticate', { email: email, password: password })
      .success(function (response) {
        // login successful if there's a token in the response
        if (response.auth_token) {
          // store username and token in local storage to keep user logged in between page refreshes
          $localStorage.currentUser = { email: email, token: response.auth_token };
          // execute callback with true to indicate successful login
          callback(true);
        } else {
          // execute callback with false to indicate failed login
          callback(false);
        }
      }
    );
  }

  function Logout() {
    // remove user from local storage and clear http auth header
    delete $localStorage.currentUser;
    // $http.defaults.headers.common.Authorization = '';
  }
})
.factory('Registration', function($http, $localStorage) {
  var service = {};

  service.Create = Create;

  return service;

  function Create(email, password, password_confirmation, callback) {
    $http.post('http://localhost:3000/register/', {email: email, password: password, password_confirmation: password_confirmation})
    .success(function(response) {
      if (response.auth_token) {
        // store username and token in local storage to keep user logged in between page refreshes
        $localStorage.currentUser = { email: email, token: response.auth_token };
        // execute callback with true to indicate successful login
        callback(true);
      } else {
        // execute callback with false to indicate failed login
        callback(false);
      }
    });
  }
})
.factory('AuthInterceptor', function($q, $injector, $localStorage) {
  return {
    request: function(config) {
      var token;
      if ($localStorage.currentUser && $localStorage.currentUser.token) {
        token = $localStorage.currentUser.token;
      }
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403 || response.status === 419) {
        // LocalService.unset('auth_token');
        // $injector.get('$state').go('login');
      }
      return $q.reject(response);
    }
  };
})
.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})
.service('popupService',function($window){
  this.showPopup=function(message){
    return $window.confirm(message);
  }
})
;
