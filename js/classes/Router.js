'use strict';

function Router() {
  this._routes = [];
  this._defaultAction = null;
}

Router.prototype.route = function(name, route, handler) {
  this._routes.push({
    name: name,
    defaultRoute: route,
    pattern: new RegExp('^' + route.replace(/:[\w\-\%]+/g, '(\[\\w\\-\%\]+)') + '$'),
    callback: handler
  });

  return this;
}

Router.prototype.refresh = function() {
  var path = location.hash.slice(1);
  this.toPath(path);
}

Router.prototype.toPath = function(path) {
  var args;

  for (var i = 0; i < this._routes.length; i++) {
    args = path.match(this._routes[i].pattern);

    if (args) {
      args = args.slice(1);

      if (this.beforePageChange) {
        this.beforePageChange();
      }

      this._routes[i].callback.apply(null, args);

      if (this.afterPageChange) {
        this.afterPageChange();
      }

      return;
    }
  }

  this.notFound();
}

Router.prototype.notFound = function() {
  if (!this._notFoundHandler) {
    return;
  }

  if (this.beforePageChange) {
    this.beforePageChange();
  }

  this._notFoundHandler();
}


Router.prototype.setNotFound = function(handler) {
  if (typeof handler !== 'function') {
    return;
  }

  this._notFoundHandler = handler;

  return this;
}

Router.prototype.createUrl = function(name, params) {
  for (var i = 0; i < this._routes.length; i++) {
    if (this._routes[i].name == name) {
      if (!params) {
        return '#' + this._routes[i].defaultRoute;
      }

      return '#' + this._routes[i].defaultRoute.replace(/:\w+/g, function(match) {
        return params[match.slice(1)];
      });
    }
  }
}

Router.prototype.beforePageChange = function(callback) {
  if (typeof callback !== 'function') {
    return;
  }

  this.beforePageChange = callback;
  return this;
}

Router.prototype.afterPageChange = function(callback) {
  if (typeof callback !== 'function') {
    return;
  }

  this.afterPageChange = callback;
  return this;
}

Router.prototype.init = function() {
  var self = this;

  if (!location.hash) {
    location.hash = '/';
  }

  this.refresh();
}
