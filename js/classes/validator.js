function Constraint(conf) {
  this._conf = conf || {};
}

Constraint.prototype._validate = function(input) {
  return true;
};

Constraint.prototype.isValid = function(input) {
  if (this._conf.optional && input == undefined) {
    return true;
  }

  return this._validate(input);
};


function TypeConstraint(conf) {
  Constraint.call(this, conf);
}

inherits(TypeConstraint, Constraint);

TypeConstraint.prototype._validate = function(input) {
  if (!this._conf.type) {
    return true;
  }

  return typeof input == this._conf.type;
};


function StringConstraint(conf) {
  TypeConstraint.call(this, conf);
  this._conf.type = 'string';
}

inherits(StringConstraint, TypeConstraint);

StringConstraint.prototype._validate = function(input) {
  if (!TypeConstraint.prototype._validate.call(this, input)) {
    throw new Error('String expected');
  }
  if (input.length == 0) {
    throw new Error('Can\'t be empty');
  }
  if (this._conf.min && input.length < this._conf.min) {
    throw new Error('Min. length: ' + this._conf.min);
  }

  if (this._conf.max && input.length > this._conf.max) {
    throw new Error('Max. length: ' + this._conf.max);
  }

  return true;
};


function NumberConstraint(conf) {
  TypeConstraint.call(this, conf);
  this._conf.type = 'number';
}

inherits(NumberConstraint, TypeConstraint);

NumberConstraint.prototype._validate = function(input) {
  if (!TypeConstraint.prototype._validate.call(this, input) || isNaN(input)) {
    throw new Error('Number expected');
  }

  if (this._conf.min && input < this._conf.min) {
    throw new Error('Min value: ' + this._conf.min);
  }

  if (this._conf.max && input > this._conf.max) {
    throw new Error('Max value: ' + this._conf.max);
  }

  return true;
};

function RegExpConstraint(conf) {
  StringConstraint.call(this, conf);
}

inherits(RegExpConstraint, StringConstraint);

RegExpConstraint.prototype._validate = function(input) {

  if(!this._conf.regexp.test(input)){
    throw new Error(this._conf.error)
  }
}


function EmailConstraint(conf) {
  RegExpConstraint.call(this, conf);
  this._conf.regexp = /^\w+[\.+]?\w+@[\w\-]+\.[A-Za-z]{2,}$/;
  this._conf.error = 'Email expected';
}

inherits(EmailConstraint, RegExpConstraint);


function Validator(schema) {
  for (var fieldName in schema) {
    if (!(schema[fieldName] instanceof Constraint)) {
      schema[fieldName] = new Validator(schema[fieldName]);
    }
  }

  this._schema = schema;
  this._errors = [];
}

Validator.prototype.isValid = function(input) {
  if (typeof input != 'object') {
    return false;
  }

  for (var fieldName in this._schema) {
    var validation = this._schema[fieldName];
    var inputValue = input[fieldName];
    
    try{
      var result = validation.isValid(inputValue)
    } catch(e) {
      this._errors.push({
        fieldName: fieldName,
        error: e.message
      });
    } finally {
      if (typeof result == 'object') {
        this._errors = this._errors.concat(result); 
      }
    }
  }

  return this._errors;
}
