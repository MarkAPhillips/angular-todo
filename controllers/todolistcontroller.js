(function() {
  "use strict";

  angular.module("App")
    .controller("TodoListController", todoListController);

  todoListController.$inject = ["$resource"];

  function todoListController($resource) {

    var vm = this;
    
    /* Todo move as an env. constant */
    var restApiUrl = "http://jsonplaceholder.typicode.com/todos";
    loadTodos();

    vm.add = addTodo;

    /* Get a list of aLL Todo list items */
    function loadTodos() {
      $resource(restApiUrl).query().$promise.then(function(data) {
        vm.todos = data.slice(0, 20);
      });
    }

    /* Add a new Todo list item */
    function addTodo() {
      vm.todos.unshift({
        "title": vm.item
      });
      vm.item = "";
    }

    /* Delete an item from the Todo list */
    vm.delete = function(id) {
      var array = vm.todos;
      var index = array.map(function(item) {
        return item.id
      }).indexOf(id);
      vm.todos.splice(index, 1);
    }
  }
})();
