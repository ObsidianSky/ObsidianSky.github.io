app.module.userPage = (function() {
  var el = {};
  var sub = [];
  var data = {};
  var user;
  var loginUserProfile;

  function init(config) {
    el.container = config.container;
    user = config.user;
    loginUserProfile = config.loginUserProfile;

    prepareRenderData();
    render();
    subscribe();
  }

  function prepareRenderData() {
    data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      bidedLots: getBidedLots(),
      lotsOnSale: getLotsOnSale(),
      wonLots: getWonLots()
    }
  }

  function render() {
    el.container.innerHTML = Templates.userPage(data);
  }

  function getBidedLots() {
    if (!loginUserProfile) {
      return [];
    }

    return user.activeLots.map(function(lotId) {
      var lot = app.lotsList.getLot(lotId);
      return {
        url: app.router.createUrl('lotPage', { id: lotId }),
        title: lot.title,
        bid: lot.getBid(user.id)
      }
    });
  }

  function getLotsOnSale() {
    return user.lotsOnSale.map(function(lotId) {
      var lot = app.lotsList.getLot(lotId);
      return {
        url: app.router.createUrl('lotPage', { id: lotId }),
        title: lot.title,
        minimalPrice: lot.minimalPrice,
        blitzPrice: lot.blitzPrice
      }
    });
  }

  function getWonLots() {
    if (!loginUserProfile) {
      return [];
    }

    return user.wonLots.map(function(lotId) {
      var lot = app.lotsList.getLot(lotId);

      return {
        url: app.router.createUrl('lotPage', { id: lotId }),
        title: lot.title,
        price: lot.getBid(user.id)
      }
    });
  }

  function subscribe() {
    sub.push(app.event.on('login', app.router.refresh.bind(app.router)));
    sub.push(app.event.on('logout', app.router.refresh.bind(app.router)));
  }

  function unsubscribe() {
    sub.forEach(function(subscriber) {
      subscriber.remove();
    });

    sub = [];
  }

  function destroy() {
    el.container.innerHTML = "";
    unsubscribe();
  }

  return {
    init: init,
    destroy: destroy
  }
})();
