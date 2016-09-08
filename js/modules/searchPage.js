app.module.searchPage = (function() {
  var el = {};
  var data = {};
  var searchQuery;
  var searchResult;
  var pagination;

  function init(config) {
    el.container = config.container;
    searchQuery = config.searchQuery;

    pagination = new Paginator({
      wrapperClass: 'pagination-page clearfix',
      paginationClass: 'pagination',
      itemsContainerSelector: '.search-result-container',
      paginationContainerSelector: '.pagination-container',
      itemSelector: '.search-item',
      itemsPerPage: 6
    });

    search();
    prepareRenderData();
    render();
  }

  function prepareRenderData() {
    var replaceReg = new RegExp(searchQuery, 'gi');

    data = searchResult.map(function(lot) {
      return {
        title: lot.title.replace(replaceReg, '<span class="search-highlight">$&</span>'),
        alt: lot.title,
        description: lot.description.replace(replaceReg, '<span class="search-highlight">$&</span>'),
        thumbnail: lot.thumbnail,
        url: app.router.createUrl('lotPage', { id: lot.id })
      }
    });
  }

  function render() {
    el.container.innerHTML = Templates.searchPage(data);
    pagination.init();
  }

  function renderResult() {
    searchResultContainer.innerHTML = Templates.searchItem(data);
  }

  function search() {
    searchQuery = decodeURI(searchQuery);
    searchResult = app.lotsList.search(searchQuery);
    app.event.fire('searchPage/search', searchQuery);
  }

  function destroy() {
    el.container.innerHTML = '';
    pagination = null;
    app.event.fire('searchPage/destroy');
  }

  return {
    init: init,
    destroy: destroy
  }
})();
