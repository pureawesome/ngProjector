(function() {
  "use strict";

  angular
    .module("ngProjector.indexCtrl", [])
    .controller("HomeCtrl", function () {

    })
    .controller("TranslationCtrl", function($state, $stateParams, $translate, Translation) {
      var vm = this;

      vm.addTranslation = addTranslation;
      vm.changeLanguage= changeLanguage;
      vm.translation = new Translation();
      vm.translations = Translation.query();

      function addTranslation() {
        vm.translation.$save(function() {
          $state.go($state.current, {}, {reload: true});
        });
      };

      function changeLanguage(langKey) {
        $translate.use(langKey);
      };
    })
  })();
