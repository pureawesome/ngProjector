(function() {
  "use strict";

  angular
    .module("ngProjector.accessCtrl", [])
    .controller("LoginCtrl", function ($location, Authentication) {
      var vm = this;

      vm.login = login;

      initController();

      function initController() {
        // reset login status
        Authentication.Logout();
      };

      function login() {
        vm.loading = true;
        Authentication.Login(vm.email, vm.password, function (result) {
          if (result === true) {
            $location.path('/');
          } else {
            vm.error = 'Username or password is incorrect';
            vm.loading = false;
          }
        });
      };
    })
    .controller("RegisterCtrl", function(Registration) {
      var vm = this;

      vm.register = register;

      function register() {
        console.log('register');
        Registration.Create(vm.email, vm.password, vm.confirmPassowrd, function(result) {
          console.log('callback');
        })
      }
    });
  })();
