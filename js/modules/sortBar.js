app.module.sortBar = (function() {
  var el = {};
  var sub = [];
  var data = {};
  var sorter = new Sorter();
  var lots;
  var sortType;

  function init(config) {
    el.container = config.container;
    render(config.sortData);
    lots = config.lots;
    collectDom();
    bindEvents();
  }

  function render(data) {
    el.container.innerHTML = Templates.sortBar(data);
  }

  function collectDom() {
    el.select = document.getElementById('sort-select');
  }

  function bindEvents() {
    el.select.addEventListener('change', sortTypeChange);
  }

  function removeEvents() {
    el.select.removeEventListener('change', sortTypeChange);
  }

  function sortTypeChange(event) {
    sortOn(event.target.value);
  }

  function sortOn(newSortType) {
    sortType = newSortType;
    sort(lots);
  }

  function sort(newLots) {
    lots = newLots;
    sorter.sort(lots, sortType);

    app.event.fire('sort', lots)
  }

  function destroy() {
    removeEvents();
    el.container.innerHTML = "";
    el = {};
  }

  return {
    sort: sort,
    sortOn: sortOn,
    init: init,
    destroy: destroy
  }

})();
