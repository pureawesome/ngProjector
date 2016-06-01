angular.module('ngProjector.services',[])
.factory('Project', function($resource) {
  return $resource('http://localhost:3000/projects/:id', { id: '@id' },
    {
      'update': { method:'PUT' }
    }
  );
})
.factory('Resources', function($resource) {
  return $resource('http://localhost:3000/resources/:id', { id: '@id' },
    {
      'update': { method:'PUT' }
    }
  );
})
.service('popupService',function($window){
    this.showPopup=function(message){
      return $window.confirm(message);
    }
})
;
