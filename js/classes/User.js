'use strict';

function User(userData) {
  this.id = userData.id;
  this.name = userData.name;
  this.email = userData.email;
  this.password = userData.password;
  this.phone = userData.phone;
  this.country = userData.country;
  this.money = userData.money;
  this.activeLots = userData.activeLots;
  this.lotsOnSale = userData.lotsOnSale;
  this.wonLots = userData.wonLots;
}

User.prototype.getMoney = function() {
  return this.money;
}

User.prototype.addBid = function(lotId, price) {
  if (this.money < price) {
    throw new UserError('Not enough money');
  }
  this.activeLots.push(lotId);
};

User.prototype.addMoney = function(money) {
  if (isNaN(money)) {
    throw new UserError('Invalid money value: "' + money + '". Number expected.')
  }

  this.money += money;
}

User.prototype.buyLot = function(lotId, price) {
  if (this.money < price) {
    throw new UserError('Not enough money');
  }
  this.removeActiveLot(lotId);
  this.wonLots.push(lotId);
  this.addMoney(-price);
}

User.prototype.removeActiveLot = function(lotId) {
  var lotPos = this.activeLots.indexOf(lotId);

  if(lotPos == -1){
    return;
  }

  this.activeLots.splice(lotPos, 1); 
}

User.prototype.hasBid = function(lotId) {
  debugger;
  return this.activeLots.indexOf(lotId) !== -1;
}

User.prototype.listen = function(Event) {
  this.methods = [];
  this.addMoney = function() {
    User.prototype.addMoney.apply(this, arguments);
    Event.fire('user/moneyChanged', {
      money: this.money
    });
  }

  this.methods.push('addMoney');
}

User.prototype.unlisten = function() {
  var self = this;

  this.methods.forEach(function(method) {
    delete self[method];
  })

  delete this.methods;
}

function UserError(message) {
  this.name = 'User error';
  this.message = message;
}

UserError.prototype = Object.create(Error.prototype);
UserError.prototype.constructor = UserError;
