app.module.filter = (function() {
  var data;
  var el = {};
  var lotFilter;

  function init(config) {
    el.container = config.container;
    lotFilter = new Filter(config.lots);
    prepareRenderData();
    render();
    collectDom();
    bindEvents();
  }

  function prepareRenderData() {
    data = {
      minPrice: lotFilter.getMinPrice(),
      maxPrice: lotFilter.getMaxPrice(),
      spec: lotFilter.getFilters()
    }
  }

  function render() {
    el.container.innerHTML = Templates.filter(data);
  }

  function collectDom() {
    el.minPriceInput = document.getElementById('min-price');
    el.maxPriceInput = document.getElementById('max-price');
    el.specs = document.querySelectorAll('.filter-spec');
    el.filterForm = document.getElementById('filter-price-form');
  }

  function bindEvents() {
    el.filterForm.addEventListener('submit', filter);
  }

  function removeEvents() {
    el.filterForm.removeEventListener('submit', filter);
  }

  function filter(event) {
    event.preventDefault();

    var filters = collectFilters();
    var result = lotFilter.filter(filters);

    app.event.fire('filter', result);
  }

  function collectFilters() {
    var minPrice = Number(el.minPriceInput.value);
    var maxPrice = Number(el.maxPriceInput.value);

    if (minPrice < data.minPrice || minPrice > maxPrice || isNaN(minPrice)) {
      minPrice = data.minPrice;
      el.minPriceInput.value = minPrice;
    }

    if (maxPrice > data.maxPrice || minPrice > maxPrice || isNaN(maxPrice)) {
      maxPrice = data.maxPrice;
      el.maxPriceInput.value = maxPrice;
    }

    var filters = {
      minPrice: minPrice,
      maxPrice: maxPrice,
      filterQuery: {}
    }

    each(el.specs, function(spec) {
      if (spec.checked) {
        var filterName = spec.name;
        var filterValue = spec.value;

        if (!filters.filterQuery[filterName]) {
          filters.filterQuery[filterName] = []
        }

        filters.filterQuery[filterName].push(filterValue);
      }
    });

    return filters;
  }

  function destroy() {
    removeEvents();
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }
})();
