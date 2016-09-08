'use strict';

function Login(userList, event) {
  this.userList = userList;
  this.currentUser = null;
  this.event = event;
}

Login.prototype.authorize = function(email, password) {
  var user = this.userList.getUserByEmail(email);

  if (user && user.password === password) {
    this.currentUser = user;
    this.currentUser.listen(this.event);
    return true;
  }

  return false;
};

Login.prototype.logout = function() {
  this.currentUser.unlisten();
  this.currentUser = null;
};

Login.prototype.isAutorized = function() {
  return !!this.currentUser;
};

Login.prototype.getUser = function() {
  return this.currentUser;
};
