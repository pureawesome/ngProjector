angular.module('ngProjector.services',[])
.factory('Project', function($resource, $localStorage) {
  return $resource('http://localhost:3000/projects/:id',
  { id: '@id' },
  {
    // get: {
    //   method: "GET",
    //   headers: {
    //     "Authorization": 'Bearer ' + $localStorage.currentUser.token
    //   }
    // },
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

          // add jwt token to auth header for all requests made by the $http service

          // console.log($httpProvider);
          // console.log($http.default);
          // $http.default.headers.common.Authorization = 'Bearer ' + response.auth_token;

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
    $http.post('http://localhost:3000/users/', {email: email, password: password, password_confirmation: password_confirmation})
    .success(function(response) {
      console.log('shit worked');
    });
  }
})
.factory('AuthInterceptor', function($q, $injector, $localStorage) {
  console.log($localStorage);
  console.log($localStorage.currentUser);
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
      if (response.status === 401 || response.status === 403) {
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
