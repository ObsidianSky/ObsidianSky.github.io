function Filter(lots) {
  this._lots = lots;
  this._filters = this._collectFilters();
  this._minPrice = Math.min.apply(null, this._collectPrice());
  this._maxPrice = Math.max.apply(null, this._collectPrice());
}

Filter.prototype._collectFilters = function() {
  var filters = {};

  this._lots.forEach(function(lot) {
    var lotSpec = lot.spec;

    for (var filterName in lotSpec) {
      var filterValue = lotSpec[filterName];

      if (!filters[filterName]) {
        filters[filterName] = []
      }

      if (filters[filterName].indexOf(String(filterValue)) == -1) {
        filters[filterName].push(String(filterValue))
      }
    }
  });

  for (var prop in filters) {
    if (isNaN(filters[prop][0])) {
      filters[prop].sort();
    } else {
      filters[prop].sort(function(a, b) {
        return a - b;
      });
    }
  }

  return filters;
}

Filter.prototype._collectPrice = function() {
  return this._lots.map(function(item) {
    return item.minimalPrice;
  });
}

Filter.prototype.getFilters = function() {
  return this._filters;
}

Filter.prototype.getMinPrice = function() {
  return this._minPrice;
}

Filter.prototype.getMaxPrice = function() {
  return this._maxPrice;
}

Filter.prototype.filter = function(config) {
  var minPrice = config.minPrice || this._minPrice;
  var maxPrice = config.maxPrice || this._maxPrice;
  var filterQuery = config.filterQuery || {};

  return this._lots.filter(function(lot) {
    if (lot.minimalPrice < minPrice || lot.minimalPrice > maxPrice) {
      return false;
    }

    for (var filterName in filterQuery) {
      var filterValues = filterQuery[filterName];
      if (filterValues.indexOf(String(lot.spec[filterName])) === -1) {
        return false;
      }
    }

    return true;
  });
}
