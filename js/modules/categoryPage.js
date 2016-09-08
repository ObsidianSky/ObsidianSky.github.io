app.module.categoryPage = (function() {
  var el = {};
  var sub = [];
  var data = {};
  var sortData = [{
    name: "From new to old",
    value: "new"
  }, {
    name: "End time soon",
    value: "liveASC"
  }, {
    name: 'From cheap to expensive',
    value: 'priceASC'
  }, {
    name: 'From expensive to cheap',
    value: 'priceDESC'
  }];

  function init(config) {
    el.container = config.container;

    render();
    collectDom();

    app.module.sortBar.init({
      container: el.sortBarContainer,
      sortData: sortData,
      lots: config.lots
    });

    app.module.grid.init({
      container: el.gridContainer
    });

    app.module.filter.init({
      container: el.filterContainer,
      lots: config.lots
    });

    app.module.sortBar.sortOn('new');
    app.module.grid.buildGrid(config.lots);

    subscribe();
  }


  function render() {
    el.container.innerHTML = Templates.categoryPage();
  }

  function collectDom() {
    el.gridContainer = document.getElementById('grid-container');
    el.filterContainer = document.getElementById('filter-container');
    el.sortBarContainer = document.getElementById('sort-bar-container');
  }

  function subscribe() {
    sub.push(app.event.on('filter', app.module.sortBar.sort));
    sub.push(app.event.on('sort', app.module.grid.buildGrid));
  }

  function unsubscribe() {
    sub.forEach(function(subscriber) {
      subscriber.remove();
    });

    sub = [];
  }

  function destroy() {
    unsubscribe();
    app.module.sortBar.destroy();
    app.module.grid.destroy();
    app.module.filter.destroy();
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }
})();
