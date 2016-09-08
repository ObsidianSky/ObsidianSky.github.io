function Gallery(imgSelector) {
  this._imgSelector = imgSelector || '.gallery';
  this._eventHandlers = {};
}

Gallery.prototype._createGallery = function() {
  this._overflow = document.createElement('div');
  this._overflow.className = 'gallery-overflow';

  this._container = document.createElement('div');
  this._container.className = 'gallery-image-container';
  this._overflow.appendChild(this._container);

  this._prev = document.createElement('div');
  this._prev.className = 'gallery-control gallery-prev fa fa-chevron-left';

  this._next = document.createElement('div');
  this._next.className = 'gallery-control gallery-next fa fa-chevron-right';

  this._img = document.createElement('img');
  this._img.className = 'gallery-image';

  this._container.appendChild(this._img);
  this._container.appendChild(this._prev);
  this._container.appendChild(this._next);

  document.body.appendChild(this._overflow);
}

Gallery.prototype._updateUrls = function() {
  var urls = [];
  var images = document.body.querySelectorAll(this._imgSelector);

  each(images, function(img) {
    urls.push(img.src);
  });

  this._urls = urls;
}

Gallery.prototype._refreshHeight = function() {
  this._img.style.maxHeight = document.documentElement.clientHeight + 'px';
}

Gallery.prototype._showImg = function(url) {
  this._activeIndex = this._urls.indexOf(url);
  this._img.src = url;
}

Gallery.prototype.showGallery = function() {
  this._overflow.classList.add('active');
}

Gallery.prototype.hideGallery = function() {
  this._overflow.classList.remove('active');
}

Gallery.prototype.showNext = function() {
  var url = this._urls[this._activeIndex + 1] || this._urls[0];
  this._showImg(url);
}

Gallery.prototype.showPrev = function() {
  var url = this._urls[this._activeIndex - 1] || this._urls[this._urls.length - 1];
  this._showImg(url);
}

Gallery.prototype._bindEvents = function() {
  var bodyClick = function(event) {
    if (event.target.matches(this._imgSelector)) {
      this._showImg(event.target.src);
      this.showGallery();
      return;
    }

    if (event.target == this._overflow) {
      this.hideGallery();
    }
  };

  var containerClick = function(event) {
    if (event.target == (this._prev)) {
      this.showPrev();
    }

    if (event.target == (this._next)) {
      this.showNext();
    }
  };

  var windowResize = function() {
    this._refreshHeight();
  };


  this._eventHandlers.bodyClick = bodyClick.bind(this);
  this._eventHandlers.containerClick = containerClick.bind(this);
  this._eventHandlers.windowResize = windowResize.bind(this);

  document.body.addEventListener('click', this._eventHandlers.bodyClick);
  this._container.addEventListener('click', this._eventHandlers.containerClick);
  window.addEventListener('resize', this._eventHandlers.windowResize);
}

Gallery.prototype._removeEvents = function() {
  document.body.removeEventListener('click', this._eventHandlers.bodyClick);
  this._container.removeEventListener('click', this._eventHandlers.containerClick);
  window.removeEventListener('resize', this._eventHandlers.windowResize);
}

Gallery.prototype.destroy = function() {
  this._removeEvents();
  document.body.removeChild(this._overflow);
}

Gallery.prototype.init = function() {
  this._createGallery();
  this._bindEvents();
  this._updateUrls();
  this._refreshHeight();
}
