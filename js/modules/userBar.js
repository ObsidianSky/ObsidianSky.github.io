app.module.userBar = (function() {
  var el = {};
  var sub = [];
  var data = {};

  function init(config) {
    el.container = config.container;
    prepareRenderData();
    render();
    collectDom();
    bindEvents();
    subscribe();
  }

  function prepareRenderData() {
    var user = app.login.getUser();

    data = {
      addLotLink: app.router.createUrl('addLotPage'),
      userProfileLink: app.router.createUrl('userPage', { id: user.id }),
      userName: user.name,
      userMoney: user.money
    }
  }

  function render() {
    el.container.innerHTML = Templates.userBar(data);
  }

  function collectDom() {
    el.logoutButton = document.getElementById('logout-button');
    el.money = document.getElementById('user-money');
  }

  function bindEvents() {
    el.logoutButton.addEventListener('click', logout);
  }

  function subscribe() {
    sub.push(app.event.on('user/moneyChanged', updateMoney));
  }

  function updateMoney(data) {
    el.money.innerHTML = data.money;
  }

  function logout() {
    app.login.logout();
    app.event.fire('logout');
  }

  function removeEvents() {
    el.logoutButton.removeEventListener('click', logout);
  }

  function unsubscribe() {
    sub.forEach(function(subscriber) {
      subscriber.remove();
    });

    sub = [];
  }

  function destroy() {
    removeEvents();
    unsubscribe();
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }
})();
