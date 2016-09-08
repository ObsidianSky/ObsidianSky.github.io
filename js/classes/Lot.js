'use strict';

function Lot(lotData) {
  this.id = lotData.id;
  this.state = lotData.state;
  this.title = lotData.title;
  this.description = lotData.description;
  this.thumbnail = lotData.thumbnail;
  this.images = lotData.images;
  this.minimalPrice = lotData.minimalPrice;
  this.blitzPrice = lotData.blitzPrice;
  this.sellerId = lotData.sellerId;
  this.category = lotData.category;
  this.createDate = lotData.createDate;
  this.finalDate = lotData.finalDate;
  this.spec = lotData.spec;
  this.bids = lotData.bids;
}

Lot.prototype.getState = function() {
  return this.state;
}

Lot.prototype.setState = function(state) {
  if (typeof state == 'number' && !isNaN(state)) {
    this.state = state;
  } else {
    throw new LotError('Invalid state value: "' + state + '". Number expected.');
  }
}

Lot.prototype.addBid = function(userId, price) {
  if (this.minimalPrice > price || isNaN(price)) {
    throw new LotError('Minimal bid: ' + this.minimalPrice + ' $');
  }

  if (!this.bids) {
    this.bids = {};
  }

  this.bids[userId] = price;
};

Lot.prototype.getBids = function() {
  var bids = this.bids;
  var bidsArray = [];

  if (!bids) {
    return null;
  }

  for (var userId in bids) {
    bidsArray.push({
      userId: userId,
      userBid: bids[userId]
    });
  }

  bidsArray.sort(function(bid1, bid2) {
    return bid2.userBid - bid1.userBid;
  });

  return bidsArray;
}

Lot.prototype.getBid = function(id) {
  if (!this.bids || !this.bids[id]) {
    return null;
  }

  return this.bids[id];
}

Lot.prototype.setBid = function(id, bid) {
  if (isNaN(Number(id))) {
    throw new Error('Invalid id value: "' + id + '". Number expected.');
  }

  if (!this.bids) {
    this.bids = {}
  }

  this.bids[id] = bid;
}

Lot.prototype.listen = function(Event) {
  this.methods = [];

  this.setState = function() {
    Lot.prototype.setState.apply(this, arguments);
    Event.fire('lot/stateChanged', {
      state: this.state
    });
  }

  this.methods.push('setState');

  this.addBid = function() {
    Lot.prototype.addBid.apply(this, arguments);
    Event.fire('lot/bidAdded');
  }

  this.methods.push('addBid');
}

Lot.prototype.unlisten = function() {
  var self = this;

  this.methods.forEach(function(method) {
    delete self[method];
  });

  delete this.methods;
}


function LotError(message) {
  this.name = 'Lot error';
  this.message = message;
}

LotError.prototype = Object.create(Error.prototype);
LotError.prototype.constructor = LotError;
