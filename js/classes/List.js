'use strict';

function UserList() {
  this.users = [];
}

UserList.prototype.init = function(usersData) {
  var self = this;
  usersData.forEach(function(userData) {
    self.addUser(new User(userData));
  });
};

UserList.prototype.getUserByEmail = function(email) {
  for (var i = 0; i < this.users.length; i++) {
    if (this.users[i].email === email) {
      return this.users[i];
    }
  }

  return false;
};

UserList.prototype.addUser = function(user) {
  if (user instanceof User) {
    if (!user.id) {
      user.id = this.users.length + 1;
    }

    this.users.push(user);
  }
}

UserList.prototype.getUser = function(id) {
  return this.users[id - 1] || null;
}



function LotsList() {
  this.lots = [];
}

LotsList.prototype.init = function(lotsData) {
  var self = this;
  lotsData.forEach(function(lotData) {
    self.addLot(new Lot(lotData));
  });
};

LotsList.prototype.getLot = function(id) {
  return this.lots[id - 1] || null;
};

LotsList.prototype.getAllLots = function() {
  return this.lots;
};

LotsList.prototype.getActiveLots = function() {
  return this.lots.filter(function(lot) {
    if (lot.state == 1) {
      return true
    }

    return false;
  });
};

LotsList.prototype.getLotsByArray = function(arrayOfId) {
  var self = this;

  return arrayOfId.map(function(item) {
    return self.getLot(item) || null;
  });
};

LotsList.prototype.getCategory = function(category) {
  var categoryArray = this.lots.filter(function(lot) {
    if (lot.category == category && lot.state == 1) {
      return true;
    }

    return false;
  });

  if (categoryArray.length == 0) {
    return null;
  }

  return categoryArray;
}

LotsList.prototype.search = function(searchQuery) {
  if (searchQuery === '') {
    return [];
  }

  var reg = new RegExp(searchQuery, 'i');

  var activeLots = this.getActiveLots();

  var filteredOnTitle = activeLots.filter(function(lot) {
    if (reg.test(lot.title)) {
      return true;
    }

    return false;
  });

  var filteredOnDescription = activeLots.filter(function(lot) {
    if (filteredOnTitle.indexOf(lot) == -1 && reg.test(lot.description)) {
      return true;
    }

    return false;
  });

  return filteredOnTitle.concat(filteredOnDescription);
}

LotsList.prototype.addLot = function(lot) {
  if (lot instanceof Lot) {
    if (!lot.id) {
      lot.id = this.lots.length + 1;
    }

    this.lots.push(lot);
  }
};


// TODO Вынести из этого класа
// LotsList.prototype.checkOutdateLot = function(userList) {
//   var self = this;

//   this.lots.forEach(function(lot) {
//     var nowTimeStamp = Date.now();

//     // если лот просроченный
//     if (lot.finalDate < nowTimeStamp) {

//       //получаем ставки на лот, они отсортированы по убыванию цены
//       var bids = lot.getBids();

//       if (bids) {

//         //проходимся по ставкам и проверяем есть ли у покупателя деньги
//         for (var i = 0; i < bids.length; i++) {
//           var user = userList.getUser(bids[i].userId);
//           var userMoney = user.getMoney();
//           var userBid = bids[i].userBid;

//           //саму покупку надо отделить от проверки количества денег
//           if (user.getMoney() >= userBid) {
//             user.activeLots.splice(user.activeLots.indexOf(lot.id), 1);
//             user.buyLot(lot.id, userBid)

//             //продавец получает деньги
//             userList.getUser(lot.sellerId).addMoney(userBid);

//             lot.setState(2);
//             break;
//           }
//         }
//       } else {
//         lot.setState(3);
//       }
//     }
//   });
// }
