app.module.grid = (function() {
  var data;
  var el = {};
  var pagination;

  function init(config) {
    el.container = config.container;

    pagination = new Paginator({
      wrapperClass: 'pagination-page clearfix',
      paginationClass: 'pagination',
      itemsContainerSelector: '#grid-container',
      paginationContainerSelector: '#pagination-container',
      itemSelector: '.lot-box-wrapper'
    });
  }

  function prepareRenderData(lots) {
    data = lots.map(function(lot) {
      return {
        title: lot.title,
        thumbnail: lot.thumbnail,
        url: app.router.createUrl('lotPage', { id: lot.id }),
        ownerName: app.userList.getUser(lot.sellerId).name,
        ownerUrl: app.router.createUrl('userPage', { id: lot.sellerId }),
        finalDate: dateFormat(new Date(lot.finalDate)),
        createDate: lot.createDate,
        minimalPrice: lot.minimalPrice,
        spec: lot.spec
      }
    });
  }

  function render() {
    el.container.innerHTML = Templates.lotsGrid(data);
  }

  function buildGrid(lots) {
    prepareRenderData(lots);
    render();
    pagination.init();
  }

  function destroy() {
    pagination = null;
    el.container.innerHTML = "";
  }

  return {
    buildGrid: buildGrid,
    init: init,
    destroy: destroy
  }
})();
