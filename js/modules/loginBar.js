app.module.loginBar = (function() {
  var el = {}
  var validationShema = {
    'login-email': new EmailConstraint(),
    'login-password': new StringConstraint(),
  }

  function init(config) {
    el.container = config.container;
    render();
    collectDom();
    bindEvents();
  }

  function render() {
    el.container.innerHTML = Templates.loginBar();
  }

  function collectDom() {
    el.form = document.getElementById('login-form');
    el.emailInput = document.getElementById('login-email');
    el.passInput = document.getElementById('login-password');
  }

  function bindEvents() {
    el.form.addEventListener('submit', submit);
    el.form.addEventListener('focusout', removeError);
  }

  function removeEvents() {
    el.form.removeEventListener('submit', submit);
    el.form.removeEventListener('focusout', removeError);
  }

  function submit(event) {
    event.preventDefault();
    var formData = {
      'login-email': el.emailInput.value.trim(),
      'login-password': el.passInput.value.trim()
    }

    var validator = new Validator(validationShema);
    var errors = validator.isValid(formData);

    if (errors.length > 0) {
      each(errors, function(errorObj) {
        showError(errorObj);
      });

      return;
    }

    if (app.login.authorize(formData['login-email'], formData['login-password'])) {
      app.event.fire('login', app.login.getUser());
    } else {
      alert('Authorization failed');
    }
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

  function destroy() {
    removeEvents();
    el.container.innerHTML = "";
  }

  return {
    init: init,
    destroy: destroy
  }
})();
