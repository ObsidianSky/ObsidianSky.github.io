'use strict';

function loadBundle(array, cb) {
  var totalFiles = array.length;
  var loaded = 0;

  array.forEach(function(item) {
    loadData(item.url, item.name, totalCheck)
  })

  function totalCheck() {
    loaded++;
    if (loaded == totalFiles) {
      cb();
    }
  }
}

function loadData(url, name, callback) {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) {
      return;
    }

    if (this.status != 200) {
      throw new Error((this.status ? this.statusText : 'the request failed'));
    }

    if (!app.data) {
      app.data = {};
    }

    app.data[name] = JSON.parse(this.responseText);
    callback();
  }

  xhr.open('GET', url, true);
  xhr.send();
}

function inherits(sub, base) {
  sub.prototype = Object.create(base.prototype, { constructor: sub });
}

function each(nodeList, fn) {
  for (var i = 0; i < nodeList.length; i++) {
    fn(nodeList[i], i, nodeList);
  }
}

function addNull(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

function dateFormat(date) {
  var year = String(date.getFullYear()).slice(2);
  var month = addNull(date.getMonth() + 1);
  var day = addNull(date.getDate());
  var hours = addNull(date.getHours());
  var minutes = addNull(date.getMinutes());

  return day + '.' + month + '.' + year + ' - ' + hours + ':' + minutes;
}
