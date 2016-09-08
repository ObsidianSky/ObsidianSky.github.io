function Sorter() {}

Sorter.prototype.sort = function(lots, sortOrder) {
  switch (sortOrder) {
    case 'priceASC':
      lots.sort(function(lot1, lot2) {
        return lot1.minimalPrice - lot2.minimalPrice;
      });

      break;

    case 'priceDESC':
      lots.sort(function(lot1, lot2) {
        return lot2.minimalPrice - lot1.minimalPrice;
      });

      break;

    case 'old':
      lots.sort(function(lot1, lot2) {
        return lot1.createDate - lot2.createDate;
      });

      break;

    case 'new':
      lots.sort(function(lot1, lot2) {
        return lot2.createDate - lot1.createDate;
      });

      break;

    case 'liveASC':
      lots.sort(function(lot1, lot2) {
        return lot1.finalDate - lot2.finalDate;
      });

      break;

    case 'liveDESC':
      lots.sort(function(lot1, lot2) {
        return lot2.finalDate - lot1.finalDate;
      });

      break;
  }
}
