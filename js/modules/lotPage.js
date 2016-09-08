app.module.lotPage = (function() {
  var el = {};
  var sub = [];
  var data = {};
  var lot;
  var user;
  var gallery;

  function init(config) {
    el.container = config.container;
    lot = config.lot;
    setUser();
    prepareRenderData();
    render();
    collectDom();
    refreshGalleryHeight()
    bindEvents();
    subscribe();
    lot.listen(app.event)
  }

  function setUser() {
    user = app.login.getUser();
  }

  function prepareRenderData() {
    data = {
      active: lot.state == 1 ? true : false,
      title: lot.title,
      description: lot.description,
      thumbnail: lot.thumbnail,
      images: lot.images || [],
      minimalPrice: lot.minimalPrice,
      blitzPrice: lot.blitzPrice,
      finalDate: dateFormat(new Date(lot.finalDate)),
      lotOwnerName: app.userList.getUser(lot.sellerId).name,
      lotOwnerProfileLink: app.router.createUrl('userPage', { id: lot.sellerId }),
      bids: getBids(),
      userBid: user ? lot.getBid(user.id) : null
    }
  }

  function render() {
    el.container.innerHTML = Templates.lotPage(data);
    gallery = new Gallery('.lot-image');
    gallery.init();
  }

  function collectDom() {
    el.buyPanel = document.getElementById('buy-panel');
    el.bidsContainer = document.getElementById('lot-bids');
    el.bidInput = document.getElementById('bid-input');
    el.bidForm = document.getElementById('bid-form');
    el.buyButton = document.getElementById('blitz-buy');
    el.imgWrappers = el.container.querySelectorAll('.lot-image-wrapper');
  }

  function refreshGalleryHeight() {
    each(el.imgWrappers, function(el) {
      el.style.height = Math.ceil(el.offsetWidth) + 'px';
    });
  }

  function bindEvents() {
    el.bidForm.addEventListener('submit', bidHandler);
    el.buyButton.addEventListener('click', buyHandler);
    window.addEventListener('resize', refreshGalleryHeight);
  }

  function subscribe() {
    sub.push(app.event.on('lot/stateChanged', stateChange));
    sub.push(app.event.on('lot/bidAdded', updateBids));
    sub.push(app.event.on('login', setUser));
    sub.push(app.event.on('login', updateBids));
    sub.push(app.event.on('logout', removeBids));
  }

  function removeEvents() {
    el.bidForm.removeEventListener('submit', bidHandler);
    el.buyButton.removeEventListener('click', buyHandler);
    window.removeEventListener('resize', refreshGalleryHeight);
  }

  function unsubscribe() {
    sub.forEach(function(subscriber) {
      subscriber.remove();
    });

    sub = [];
  }

  function getBids() {
    if (!(user && user.id === lot.sellerId)) {
      return null;
    }

    var bids = lot.getBids();

    if (!bids) {
      return null;
    }

    return bids.map(function(bidObj) {
        bidObj.userLink = app.router.createUrl('userPage', { id: bidObj.userId }),
        bidObj.userName = app.userList.getUser(bidObj.userId).name
      return bidObj;
    });
  }

  function bidHandler(event) {
    event.preventDefault();

    var price = Number(el.bidInput.value);

    if (!user) {
      alert('You must authorize');
      return;
    }

    if (user.id === lot.sellerId) {
      alert('You can\'t bid on your own lot');
      return;
    }

    try {
      user.addBid(lot.id, price);
      lot.addBid(user.id, price);
    } catch (e) {
      alert(e.message);
    }

    el.bidInput.value = '';
  }

  function buyHandler() {
    if (!user) {
      alert('You must authorize');
      return;
    }

    if (user.id === lot.sellerId) {
      alert('You can\'t buy your own lot');
      return;
    }


    try {
      user.buyLot(lot.id, lot.blitzPrice);
      var seller = app.userList.getUser(lot.sellerId);
      seller.addMoney(lot.blitzPrice);

      lot.setBid(user.id, lot.blitzPrice);
      lot.setState(2);
    } catch (e) {
      alert(e.message);
    }

  }

  function stateChange() {
    el.buyPanel.innerHTML = 'This lot is not active.';
    removeBids();
  }

  function removeBids() {
    el.bidsContainer.innerHTML = '';
  }

  function updateBids() {
    var bids = getBids();
    if (bids) {
      el.bidsContainer.innerHTML = Templates.lotPageBids(bids);
    }
    console.log(user);
    if (user.hasBid(lot.id)) {
      el.bidsContainer.innerHTML = 'Your bid: ' + lot.getBid(user.id) + ' $'
    }
  }

  function destroy() {
    removeEvents();
    unsubscribe();
    lot.unlisten();
    gallery.destroy();
    gallery = null;
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }

})();
