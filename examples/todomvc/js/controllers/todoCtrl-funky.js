// Generated by CoffeeScript 1.7.1

/* global todomvc, angular */
'use strict';

/*
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
var todoFuncs;

todoFuncs = {
  init: function() {
    this.todos = this.$.todos = this.todoStorage.get();
    this.$.newTodo = '';
    this.$.editedTodo = null;
    if (this.$loc.path() === '') {
      this.$loc.path('/');
    }
    return this.$.location = this.$loc;
  },
  watch: {
    'location.path()': function(path) {
      return this.$.statusFilter = path === '/active' ? {
        completed: false
      } : path === '/completed' ? {
        completed: true
      } : null;
    },
    '{object}todos': '_onTodoChange'
  },
  _onTodoChange: function(newValue, oldValue) {
    this.$.remainingCount = this.fF(this.todos, {
      completed: false
    }).length;
    this.$.completedCount = this.todos.length - this.$.remainingCount;
    this.$.allChecked = !this.$.remainingCount;
    if (newValue !== oldValue) {
      return this.todoStorage.put(this.todos);
    }
  },
  addTodo: function() {
    var newTodo;
    newTodo = this.$.newTodo.trim();
    if (!newTodo.length) {
      return;
    }
    this.todos.push({
      title: newTodo,
      completed: false
    });
    return this.$.newTodo = "";
  },
  editTodo: function(todo) {
    this.$.editedTodo = todo;
    return this.$.originalTodo = angular.extend({}, todo);
  },
  doneEditing: function(todo) {
    this.$.editedTodo = null;
    todo.title = todo.title.trim();
    if (!todo.title) {
      return this.$.removeTodo(todo);
    }
  },
  revertEditing: function(todo) {
    this.todos[this.todos.indexOf(todo)] = this.$.originalTodo;
    return this.$.doneEditing(this.$.originalTodo);
  },
  removeTodo: function(todo) {
    return this.todos.splice(this.todos.indexOf(todo), 1);
  },
  clearCompletedTodos: function() {
    return this.$.todos = this.todos = this.todos.filter(function(val) {
      return !val.completed;
    });
  },
  markAll: function(completed) {
    var todo, _i, _len, _ref, _results;
    _ref = this.todos;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      todo = _ref[_i];
      _results.push(todo.completed = completed);
    }
    return _results;
  }
};

todomvc.cC(angular.extend(todoFuncs, {
  name: 'ThisDoesNotMapToNgController',
  el: '#todoapp',
  inject: {
    $scope: '$',
    $location: '$loc',
    todoStorage: '.',
    filterFilter: 'fF'
  }
}));
