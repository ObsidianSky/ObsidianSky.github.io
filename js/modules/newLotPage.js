app.module.newLotPage = (function() {
  var el = {};
  var sub = [];
  var specNames = [];
  var formData;
  var validationShema = {
    'lot-title': new StringConstraint({ max: 30 }),
    'lot-description': new StringConstraint({ max: 50 }),
    'lot-minimal-price': new NumberConstraint({ min: 1 }),
    'lot-blitz-price': new NumberConstraint({ min: 1 }),
    'lot-lifetime': new StringConstraint(),
    'lot-category': new StringConstraint()
  }

  function init(config) {
    el.container = config.container;
    render();
    collectDom();
    bindEvents();
    subscribe();
  }

  function render() {
    el.container.innerHTML = Templates.addLotPage(app.data.categories);
  }

  function collectDom() {
    el.lotForm = document.getElementById('lot-form');
    el.specContainer = document.getElementById('spec-container');

    el.title = document.getElementById('lot-title');
    el.description = document.getElementById('lot-description');
    el.minimalPrice = document.getElementById('lot-minimal-price');
    el.blitzPrice = document.getElementById('lot-blitz-price');
    el.lifetime = document.getElementById('lot-lifetime');
    el.categorySelect = document.getElementById('lot-category');
  }

  function bindEvents() {
    el.categorySelect.addEventListener('change', categorySelectHandler);
    el.lotForm.addEventListener('submit', formSubmit);
    el.lotForm.addEventListener('focusout', removeError);
  }

  function formSubmit(event) {
    event.preventDefault();

    collectFormData();
    refreshShema();

    var validator = new Validator(validationShema);
    var errors = validator.isValid(formData);

    if (errors.length > 0) {
      each(errors, function(errorObj) {
        showError(errorObj);
      });

      return;
    }

    addLot();
    cleanForm();
  }

  function showError(errorObj) {
    var inputField = document.getElementById(errorObj.fieldName);
    var errorFiled = inputField.parentNode.children[1];

    inputField.classList.add('error');
    errorFiled.innerHTML = errorObj.error;
  }

  function removeError(event) {
    if (event.target.matches('.input-field')) {
      event.target.classList.remove('error');
    }
  }

  function collectFormData() {
    formData = {
      'lot-title': el.title.value.trim(),
      'lot-description': el.description.value.trim(),
      'lot-minimal-price': Number(el.minimalPrice.value.trim()),
      'lot-blitz-price': Number(el.blitzPrice.value.trim()),
      'lot-lifetime': el.lifetime.value,
      'lot-category': el.categorySelect.value
    }

    if (el.specContainer.children[0]) {
      el.specsInputs = document.querySelectorAll('.lot-spec');
      formData['lot-spec'] = {}

      each(el.specsInputs, function(spec) {
        formData['lot-spec'][spec.name] = spec.value
      });
    }
  }

  function refreshShema() {
    if (!formData['lot-spec']) {
      return;
    }

    validationShema['lot-spec'] = {};

    each(specNames, function(specName) {
      validationShema['lot-spec'][specName] = new StringConstraint();
    });
  }

  function categorySelectHandler(event) {
    var chosenCategory = event.target.value;

    if (chosenCategory == '') {
      removeSpecs();
      return;
    }

    var spec = app.data.categories[chosenCategory].spec;

    getSpecNames(spec);

    el.specContainer.innerHTML = Templates.addLotSpecs(spec);
  }

  function getSpecNames(spec) {
    specNames.length = 0;
    for (var specName in spec) {
      specNames.push(specName.replace(/\s/g, '-'))
    }
  }

  function cleanForm() {
    el.title.value = '';
    el.description.value = '';
    el.minimalPrice.value = '';
    el.blitzPrice.value = '';
    el.lifetime.value = '';
    el.categorySelect.value = '';
    removeSpecs()
  }

  function removeSpecs(){
    el.specContainer.innerHTML = '';
    delete validationShema['lot-spec'];
    delete formData['lot-spec'];
  }

  function addLot() {
    var nowDate = new Date();
    var createdDate = +nowDate;
    var finalDate = nowDate.setDate(nowDate.getDate() + Number(formData['lot-lifetime']));

    formData['lot-spec'] = (function() {
      var obj = {};
      for (var specName in formData['lot-spec']) {
        obj[specName.replace(/\-/g, ' ')] = formData['lot-spec'][specName];
      }
      return obj;
    })();

    var lotData = {
      id: null,
      state: 1,
      title: formData['lot-title'],
      description: formData['lot-description'],
      thumbnail: 'http://placehold.it/260x260',
      images: [
        'http://placehold.it/600x600',
        'http://placehold.it/600x600',
        'http://placehold.it/600x600'
      ],
      minimalPrice: formData['lot-minimal-price'],
      blitzPrice: formData['lot-blitz-price'],
      sellerId: app.login.getUser().id,
      category: formData['lot-category'],
      createDate: createdDate,
      finalDate: finalDate,
      spec: formData['lot-spec'],
      bids: null
    }

    app.lotsList.addLot(new Lot(lotData));
    alert('Lot added.')
  }

  function removeEvents() {
    el.categorySelect.removeEventListener('change', categorySelectHandler);
    el.lotForm.removeEventListener('submit', addLot);
    el.lotForm.removeEventListener('focusout', removeError);
  }

  function subscribe() {
    sub.push(app.event.on('login', app.router.refresh.bind(app.router)));
    sub.push(app.event.on('logout', app.router.refresh.bind(app.router)));
  }

  function unsubscribe() {
    sub.forEach(function(subscriber) {
      subscriber.remove();
    });

    sub = [];
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
