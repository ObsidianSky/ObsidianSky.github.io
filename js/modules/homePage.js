app.module.homePage = (function() {
  var el = {};
  var slider;
  var data = {
    slider: [
      'img/slider/1.jpg',
      'img/slider/2.jpg',
      'img/slider/3.jpg'
    ]
  };

  function init(config) {
    el.container = config.container;
    render();
    collectDom();
    sliderInit();
  }

  function render() {
    el.container.innerHTML = Templates.homePage(data);
  }

  function collectDom() {
    el.slider = document.getElementById('homeSlider');
    el.prevButton = document.querySelector('.slider-prev');
    el.nextButton = document.querySelector('.slider-next');
  }

  function sliderInit() {
    slider = new Slider({
      sliderContainer: el.slider,
      prevButton: el.prevButton,
      nextButton: el.nextButton
    });
    slider.init();
  }

  function destroy() {
    slider.destroy();
    slider = null;
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }
})();
