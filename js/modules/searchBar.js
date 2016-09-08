app.module.searchBar = (function() {
  var sub = [];
  var el = {};

  function init(config) {
    el.container = config.container;
    render();
    collectDom();
    bindEvents();
    subscribe();
  }

  function render() {
    el.container.innerHTML = Templates.searchBar();
  }

  function collectDom() {
    el.searchInput = document.getElementById('seach-input');
    el.searchForm = document.getElementById('search-form');
  }

  function bindEvents() {
    el.searchForm.addEventListener('submit', searchSubmit);
  }

  function subscribe() {
    sub.push(app.event.on('searchPage/search', updateInputValue));
    sub.push(app.event.on('searchPage/destroy', updateInputValue.bind(null, '')));
  }

  function searchSubmit(event) {
    event.preventDefault();
    var searchQuery = el.searchInput.value.trim();

    if (searchQuery === "") {
      return;
    }

    var encodedQuery = encodeURI(searchQuery);
    var searchPath = app.router.createUrl('search', { searchQuery: encodedQuery });

    location.hash = searchPath.slice(1);
  }

  function updateInputValue(text) {
    el.searchInput.value = text;
  }

  function unsubscribe() {
    sub.forEach(function(subscriber) {
      subscriber.remove();
    })
    sub = [];
  }

  function removeEvents() {
    el.searchForm.removeEventListener('submit', searchSubmit);
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
