angular.module('ngProjector.services',[]).factory('Project', function($resource) {
  return $resource('http://localhost:3000/projects/:id', { id: '@id' },
    {
      'update': { method:'PUT' }
    }
  );
})
