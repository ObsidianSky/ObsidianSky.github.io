function Slider(options) {
  this.sliderContainer = options.sliderContainer;
  this.sliderInner = this.sliderContainer.children[0];
  this.slides = this.sliderInner.children;
  this.prevButton = options.prevButton;
  this.nextButton = options.nextButton;
  this.slideWidth = 0;
  this.totalOffset = 0;
  this.currentSlide = 0;
  this.canSlide = true;
  this._eventHandlers = {};
}

Slider.prototype.refreshWidth = function() {
  var self = this;

  this.slideWidth = this.sliderContainer.clientWidth;

  each(this.slides, function(slide) {
    slide.style.width = self.slideWidth + 'px';
  });

  this.totalOffset = this.slideWidth * this.currentSlide;
  this.sliderInner.style.right = this.totalOffset + "px";
  this.sliderInner.style.width = this.slides.length * this.slideWidth + 'px';
}

Slider.prototype._bindEvents = function() {
  this._eventHandlers.refreshWidth = this.refreshWidth.bind(this);
  this._eventHandlers.next = this.next.bind(this);
  this._eventHandlers.prev = this.prev.bind(this);

  window.addEventListener('resize', this._eventHandlers.refreshWidth);
  this.prevButton.addEventListener('click', this._eventHandlers.prev);
  this.nextButton.addEventListener('click', this._eventHandlers.next);
}

Slider.prototype._removeEvents = function() {
  window.removeEventListener('resize', this._eventHandlers.refreshWidth);
  this.prevButton.removeEventListener('click', this._eventHandlers.prev);
  this.nextButton.removeEventListener('click', this._eventHandlers.next);
}

Slider.prototype._moveSlide = function(value) {
  var self = this;

  if (!this.canSlide || this.currentSlide + value > this.slides.length - 1 || this.currentSlide + value < 0) {
    return;
  }

  this.canSlide = false;

  this.currentSlide += value;

  var offset = value * this.slideWidth;

  var start = Date.now();
  var animationTime = 600;

  requestAnimationFrame(slide);

  function slide() {
    var now = Date.now();
    var timeDiff = now - start;

    if (timeDiff < animationTime) {
      var offsetPercent = timeDiff / animationTime;
      self.sliderInner.style.right = self.totalOffset + offset * offsetPercent + "px";
      requestAnimationFrame(slide)
    } else {
      self.totalOffset += offset;
      self.sliderInner.style.right = self.totalOffset + "px";
      self.canSlide = true;
    }
  }
}

Slider.prototype.next = function() {
  this._moveSlide(1);
}

Slider.prototype.prev = function() {
  this._moveSlide(-1);
}

Slider.prototype.init = function() {
  this.refreshWidth();
  this._bindEvents();
}

Slider.prototype.destroy = function() {
  this._removeEvents();
}
