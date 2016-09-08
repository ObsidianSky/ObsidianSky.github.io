function Paginator(options) {

  this.wrapperClass = options.wrapperClass || 'pagination-page';
  this.paginationClass = options.paginationClass || 'pagination';
  this.itemsPerPage = options.itemsPerPage || 9;
  this.itemsContainerSelector = options.itemsContainerSelector;
  this.itemSelector = options.itemSelector;
  this.paginationContainerSelector = options.paginationContainerSelector;
  this.pageCount = 0;
  this.pagesArray = [];
  this.navArray = [];
}

Paginator.prototype._wrapItems = function() {
  var itemsPerPage = this.itemsPerPage;
  var wrapperClass = this.wrapperClass;
  var itemsContainer = document.querySelector(this.itemsContainerSelector);
  var pageCount = 0;
  var pages = [];
  var items = itemsContainer.querySelectorAll(this.itemSelector)
  var itemsLength = items.length;
  var wrapperElement;

  Array.prototype.forEach.call(items, function(item, index) {
    if ((index) % itemsPerPage === 0) {
      wrapperElement = document.createElement('div');
      wrapperElement.className = wrapperClass;
      wrapperElement.setAttribute('data-page', pageCount + 1);
      pageCount++;
    }

    wrapperElement.appendChild(itemsContainer.removeChild(item));

    if ((index + 1) % itemsPerPage === 0 || (index + 1) == itemsLength) {
      pages.push(wrapperElement);
      itemsContainer.appendChild(wrapperElement);
    }
  });

  this.pageCount = pageCount;
  this.pagesArray = pages;
}

Paginator.prototype._createPagination = function() {
  var self = this;
  var paginationContainer = document.querySelector(this.paginationContainerSelector);

  this.navArray.length = 0;
  paginationContainer.innerHTML = "";

  if (this.pageCount <= 1) {
    return;
  }

  var ul = document.createElement('ul');
  ul.className = this.paginationClass;

  for (var i = 1; i <= this.pageCount; i++) {
    var li = document.createElement('li');

    li.innerHTML = i;
    li.setAttribute('data-pageTo', i);
    self.navArray.push(li);

    ul.appendChild(li);
  }

  ul.addEventListener('click', function(event) {

    if (!event.target.matches('li')) {
      return;
    }

    var li = event.target;
    var pageNumber = li.getAttribute('data-pageTo');

    self.showPage(pageNumber);
  });

  paginationContainer.appendChild(ul);
}

Paginator.prototype.showPage = function(pageNumber) {
  var self = this;

  if (pageNumber < 1 || pageNumber > this.pageCount) {
    return;
  }

  if (this.pageCount == 1) {
    this.pagesArray[0].classList.add('active');
    return;
  }

  this.pagesArray.forEach(function(item, index) {
    if (item.getAttribute('data-page') == pageNumber) {
      self.navArray[index].classList.add('active');
      item.classList.add('active');
      return;
    }

    self.navArray[index].classList.remove('active');
    item.classList.remove('active');
  });
}

Paginator.prototype.init = function() {
  this._wrapItems();
  this._createPagination();
  this.showPage(1);
}
