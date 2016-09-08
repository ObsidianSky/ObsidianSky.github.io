function Event() {
  this._events = {};
}

Event.prototype.on = function(event, listener) {
  var self = this;

  if (!this._events[event]) {
    this._events[event] = [];
  }

  var index = this._events[event].length
  this._events[event].push(listener);

  return {
    remove: function() {
      delete self._events[event][index];
    }
  }
}

Event.prototype.fire = function(event, data) {
  var self = this;

  if (!this._events[event]) {
    return;
  }

  setTimeout(function() {
    self._events[event].forEach(function(listener) {
      listener(data)
    });
  }, 0);
}
