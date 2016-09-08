(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['addLotPage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container">\r\n  <div class="row">\r\n    <div class="col-xs-12 col-sm-6">\r\n      <form id="lot-form">\r\n\r\n        <label for="lot-title">Title:</label>\r\n        <div class="input-wrapper">\r\n          <input id="lot-title" type="text" class="input-field">\r\n          <div class="error-box"></div>\r\n        </div>  \r\n\r\n\r\n        <label for="lot-description">Description</label>\r\n        <div class="input-wrapper">\r\n          <textarea id="lot-description" type="text" class="input-field"></textarea>\r\n          <div class="error-box"></div>\r\n        </div>  \r\n\r\n        <label for="lot-minimal-price">Minimal price:</label>\r\n        <div class="input-wrapper">\r\n          <input id="lot-minimal-price" type="text" class="input-field">\r\n          <div class="error-box"></div>\r\n        </div>  \r\n\r\n        <label for="lot-blitz-price">Blitz price:</label>\r\n        <div class="input-wrapper">\r\n          <input id="lot-blitz-price" type="text" class="input-field">\r\n          <div class="error-box"></div>\r\n        </div>  \r\n\r\n        <div class="row"> \r\n          <div class="col-sm-6">  \r\n              <label for="lot-lifetime">Lifetime:</label>\r\n          <div class="input-wrapper">\r\n            <select id="lot-lifetime" class="input-field">\r\n              <option value="1">1 Day</option>\r\n              <option value="3">3 Days</option>\r\n              <option value="5">5 Days</option>\r\n              <option value="7">7 Days</option>\r\n            </select>\r\n            <div class="error-box"></div>\r\n          </div>  \r\n\r\n          </div>\r\n          <div class="col-sm-6">  \r\n            <label for="lot-category">Category:</label>\r\n\r\n            <div class="input-wrapper">\r\n              <select id="lot-category" class="input-field">\r\n                <option value=""></option>\r\n                ';
 for(var categoryName in obj) { ;
__p += '\r\n                  <option value="' +
((__t = ( categoryName )) == null ? '' : __t) +
'">' +
((__t = ( categoryName )) == null ? '' : __t) +
'</option>\r\n                ';
 } ;
__p += '\r\n              </select>\r\n              <div class="error-box"></div>\r\n            </div> \r\n            \r\n          </div>\r\n        </div>\r\n    \r\n        <div id="spec-container">\r\n          <!--specs will bw here-->\r\n        </div>\r\n        <br>\r\n        <input type="submit" class="button" value="Add new lot">\r\n      </form>\r\n    </div>\r\n  </div>    \r\n</div>\r\n\r\n  ';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['addLotSpecs'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\r\n  ';
 for(var specName in obj){ ;
__p += '\r\n    <div class="col-sm-6">\r\n      <label for="' +
((__t = ( specName.replace(/\s/g, '-') )) == null ? '' : __t) +
'">' +
((__t = ( specName )) == null ? '' : __t) +
':</label>\r\n      <div class="input-wrapper">\r\n        <select id="' +
((__t = ( specName.replace(/\s/g, '-') )) == null ? '' : __t) +
'" name="' +
((__t = ( specName.replace(/\s/g, '-') )) == null ? '' : __t) +
'" class="lot-spec input-field">\r\n          <option value=""></option>\r\n          ';
 obj[specName].forEach(function(value) { ;
__p += '\r\n            <option value="' +
((__t = ( value )) == null ? '' : __t) +
'">' +
((__t = ( value )) == null ? '' : __t) +
'</option>\r\n          ';
 }); ;
__p += '\r\n        </select>\r\n        <div class="error-box"></div>\r\n      </div> \r\n     </div>  \r\n  ';
 } ;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['categoryPage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n  <div class="row">   \r\n    <div class="col-xs-12 col-sm-2">\r\n      <div id="filter-container">\r\n        <!--filter will be here-->\r\n      </div>\r\n    </div>\r\n    <div class="col-xs-12 col-sm-10">\r\n      <div id="sort-bar-container" class="row">\r\n        <!--sortbar will be here-->\r\n      </div>\r\n      <div id="grid-container" class="row">\r\n        <!--grid will be here-->\r\n      </div>\r\n      <div id="pagination-container">\r\n        <!--pagination will be here-->\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['contactPage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n  <h1>Contact page</h1>\r\n  <div class="map-responsive-wrapper">\r\n      <div id="map" class="map"></div>\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['filter'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="filter">\r\n  <form id="filter-price-form">\r\n    <div class="row">\r\n      <div class="col-xs-12">\r\n        <label for="min-price">Min. price</label>\r\n        <input type="text" class="input-field" id="min-price" data-min="' +
((__t = ( minPrice )) == null ? '' : __t) +
'" value="' +
((__t = ( minPrice )) == null ? '' : __t) +
'">\r\n      </div>\r\n    </div>\r\n    <br>\r\n    <div class="row">\r\n      <div class="col-xs-12">\r\n        <label for="max-price">Max. price</label>\r\n        <input type="text" class="input-field" id="max-price" data-max="' +
((__t = ( maxPrice )) == null ? '' : __t) +
'" value="' +
((__t = ( maxPrice )) == null ? '' : __t) +
'"> \r\n      </div>\r\n    </div>\r\n    <br>\r\n    <div class="row">\r\n      <div class="col-xs-12 col-sm-12">\r\n        <input class="button button-block button-primary" type="submit" value="Filter"> \r\n      </div>\r\n    </div>\r\n  </form>\r\n  ';
 for (var filterName in spec) { ;
__p += '\r\n    <div class="filter-box">\r\n      <h4>' +
((__t = ( filterName )) == null ? '' : __t) +
'</h4>\r\n      ';
 spec[filterName].forEach(function(filter) { ;
__p += '\r\n        <div>\r\n          <input class="filter-spec cbox" type="checkbox" id="' +
((__t = ( filterName )) == null ? '' : __t) +
'-' +
((__t = ( filter )) == null ? '' : __t) +
'" name="' +
((__t = ( filterName )) == null ? '' : __t) +
'" value="' +
((__t = ( filter )) == null ? '' : __t) +
'">\r\n          <label class="cbox-label"for="' +
((__t = ( filterName )) == null ? '' : __t) +
'-' +
((__t = ( filter )) == null ? '' : __t) +
'">' +
((__t = ( filter )) == null ? '' : __t) +
'</label>\r\n        </div>\r\n      ';
 }); ;
__p += '\r\n\r\n    </div>\r\n  ';
 } ;
__p += '\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['homePage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container">\r\n  <div class="slider-wrapper">\r\n    <div class="slider-prev slider-control"><i class="fa fa-chevron-left"></i></div>\r\n    <div class="slider-next slider-control"><i class="fa fa-chevron-right"></i></div>\r\n    <div id="homeSlider" class="slider">\r\n      <div class="slider-inner">\r\n        ';
slider.forEach(function(imgSrc){;
__p += '\r\n         <div class="slide"><img src="' +
((__t = (imgSrc)) == null ? '' : __t) +
'"></div>\r\n        ';
});;
__p += '\r\n      </div>\r\n    </div> \r\n  </div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['loginBar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form id="login-form" class="login-form  panel">\r\n  <div class="row">\r\n    <div class="col-xs-12 col-sm-6">\r\n      <div class="input-wrapper">\r\n        <input id="login-email" type="text" class="input-field white-border" placeholder="E-mail">\r\n        <div class="error-box"></div>\r\n      </div>  \r\n    </div>\r\n    <div class="col-xs-12 col-sm-6">\r\n      <div class="input-wrapper">\r\n        <input id="login-password" type="password" class="input-field white-border" placeholder="Password">\r\n        <div class="error-box"></div>\r\n      </div> \r\n    </div>\r\n  </div>\r\n  <input id="login-button" type="submit" class="button button-block" value="Login">\r\n</form>\r\n';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['lotBox'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="col-xs-12 col-sm-6 col-md-4 lot-box-wrapper">\r\n  <div class="lot-box">\r\n    <img src="' +
((__t = ( thumbnail )) == null ? '' : __t) +
'" alt="' +
((__t = ( title )) == null ? '' : __t) +
'">\r\n    <h3 class="lot-box-heading"><a href="' +
((__t = ( url )) == null ? '' : __t) +
'">' +
((__t = ( title )) == null ? '' : __t) +
'</a></h3>\r\n    <p>Final date: ' +
((__t = ( finalDate )) == null ? '' : __t) +
'</p>\r\n    <p>Minimal price: ' +
((__t = ( minimalPrice )) == null ? '' : __t) +
' $</p>\r\n      <p>Owner: <a href="' +
((__t = ( ownerUrl )) == null ? '' : __t) +
'">' +
((__t = ( ownerName )) == null ? '' : __t) +
'</a></p>\r\n      <p>\r\n      <table>\r\n       <tbody>\r\n        ';
 for (var prop in spec) { ;
__p += '\r\n          <tr>\r\n            <td>' +
((__t = ( prop )) == null ? '' : __t) +
'</td>\r\n            <td>' +
((__t = ( spec[prop] )) == null ? '' : __t) +
'</td>\r\n          </tr>\r\n        ';
 }; ;
__p += '\r\n        </tbody>\r\n      </table>\r\n      </p>\r\n  </div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['lotPageBids'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="row">\r\n  <div class="col-xs-12 col-sm-8 col-md-6">\r\n  <table>\r\n    <thead>\r\n      <tr>\r\n        <th>User</th>\r\n        <th>Bid</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n    ';
 obj.forEach(function(bid){ ;
__p += '\r\n    \t<tr>\r\n        <td><a href="' +
((__t = (bid.userLink)) == null ? '' : __t) +
'">' +
((__t = (bid.userName)) == null ? '' : __t) +
'</a></td>\r\n        <td>' +
((__t = (bid.userBid)) == null ? '' : __t) +
'$</td>\r\n    \t</tr>\r\n    ';
 }); ;
__p += '\r\n    </tbody>\r\n  </table>\r\n</div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['lotPage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container">\r\n\t<div id="lot-page-container">\r\n\t\t<div class="row">\r\n\t\t\t<div class="col-xs-12 col-sm-5">\r\n\t\t\t <div class="lot-gallery row">\r\n\t\t\t\t\t';
 images.forEach(function(image) { ;
__p += '\r\n\t\t\t\t\t\t<div class="col-xs-4 col-sm-6 col-md-4">\t\r\n\t\t\t\t\t\t\t<div class="lot-image-wrapper">\r\n\t\t\t\t\t\t\t\t<img src="' +
((__t = ( image )) == null ? '' : __t) +
'" alt="' +
((__t = ( title )) == null ? '' : __t) +
'" class="lot-image">\r\n\t\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t';
 }); ;
__p += '\r\n\t\t\t </div>\r\n\t\t\t</div>\r\n\t\t\t<div class="col-xs-12 col-sm-7">\r\n\t\t\t\t<h3 class="lot-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h3>\r\n\t\t\t\t<div class="panel">\r\n\t\t\t\t\t<div class="row">\r\n\t\t\t\t\t\t<div class="col-sm-6">Lot owner: <a href="' +
((__t = ( lotOwnerProfileLink )) == null ? '' : __t) +
'" class="lot-owner">' +
((__t = ( lotOwnerName )) == null ? '' : __t) +
'</a></div>\r\n\t\t\t\t\t\t<div class="col-sm-6">Final date: <span class="lot-final-date">' +
((__t = ( finalDate )) == null ? '' : __t) +
'</span></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<br>\r\n\t\t\t\t\t<div class="row">\r\n\t\t\t\t\t\t<div class="col-sm-6">Minimal price: <span class="lot-minimal-price">' +
((__t = ( minimalPrice )) == null ? '' : __t) +
'</span> $</div>\r\n\t\t\t\t\t\t<div class="col-sm-6">Blitz price: <strong><span class="lot-blitz-price">' +
((__t = ( blitzPrice )) == null ? '' : __t) +
'</span> $</strong></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<br>\r\n\t\t\t\t\t<div class="row">\r\n\t\t\t\t\t\t<div id="buy-panel" class="col-xs-12">\r\n\t\t\t\t\t\t\t<div class="row ' +
((__t = ( !active ? 'hidden' : '' )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t\t\t<div class="col-sm-6">\r\n\t\t\t\t\t\t\t\t\t<form id="bid-form" class="form-inline">\r\n\t\t\t\t\t\t\t\t\t\t<div class="row">\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="col-sm-6">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input id="bid-input" type="number" class="input-field input-field--wb" placeholder="Your bid">\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t<div class="col-sm-6">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input type="submit" class="button button-primary" value="Add bid">\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t</form>\r\n\t\t\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\t\t\t<div class="col-sm-6">\r\n\t\t\t\t\t\t\t\t\t<input id="blitz-buy" type="button" class="button button-primary" value="Buy now!">\r\n\t\t\t\t\t\t\t\t</div>\t\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t';
 if(!active) { ;
__p += '\r\n\t\t\t\t\t\t\t\tThis lot is not active.\r\n\t\t\t\t\t\t\t';
 } ;
__p += '\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<br>\r\n\t\t\t\t\t<div id="lot-bids" class="' +
((__t = ( !active ? 'hidden' : '' )) == null ? '' : __t) +
'">\r\n\t\t\t\t\t\t';
 if (bids) { ;
__p += '\r\n\t\t\t\t\t\t\t' +
((__t = ( Templates.lotPageBids(bids) )) == null ? '' : __t) +
'\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\r\n\t\t\t\t\t\t';
 if (userBid) { ;
__p += '\r\n\t\t\t\t\t\t\tYour bid: ' +
((__t = ( userBid )) == null ? '' : __t) +
' $\r\n\t\t\t\t\t\t';
 } ;
__p += '\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<br>\r\n\t\t<div class="row ">\r\n\t\t\t<div class="col-xs-12 lot-description">' +
((__t = ( description )) == null ? '' : __t) +
'</div>\r\n\t\t</div>\t\r\n\t</div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['lotsGrid'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

if(obj.length == 0){ ;
__p += '\r\n  <div class="col-xs-12">\r\n    <h2>No results</h2>\r\n  </div>\r\n';
};
__p += '\r\n\r\n';
obj.forEach(function(lot) {;
__p += '\r\n  ' +
((__t = ( Templates.lotBox(lot) )) == null ? '' : __t) +
'\r\n';
});;
__p += '\r\n';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['pageNotFound'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n  <h1>Page Not Found</h1>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['searchBar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="search-bar">\r\n  <div class="row">\r\n    <form id="search-form">\r\n      <div class="col-xs-8 col-sm-8 col-lg-10"><input id="seach-input" class="input-field" type="text" placeholder="Search query"></div> \r\n      <div class="col-xs-4 col-sm-4 col-lg-2"><input type="submit" class="button button-block" value="Search"></div>  \r\n    </form>\r\n  </div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['searchPage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container">\r\n  <div id="search-result-container" class="search-result-container">\r\n    ' +
((__t = ( Templates.searchResult(obj) )) == null ? '' : __t) +
'\r\n  </div>\r\n  <div id="pagination-container" class="pagination-container"></div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['searchResult'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if (obj.length == 0) { ;
__p += '\r\n  <h2>No results</h2>\r\n';
 } else { ;
__p += '\r\n  ';
 obj.forEach(function(lot) { ;
__p += '\r\n  <div class="search-item lot-box">\r\n    <div class="row">\r\n      <div class="col-sm-2">\r\n        <img src="' +
((__t = ( lot.thumbnail )) == null ? '' : __t) +
'" alt="' +
((__t = ( lot.alt )) == null ? '' : __t) +
'" class="image-responsive center-block">\r\n      </div>\r\n      <div class="col-sm-10">\r\n        <h3><a href="' +
((__t = ( lot.url )) == null ? '' : __t) +
'">' +
((__t = ( lot.title )) == null ? '' : __t) +
'</a></h3>\r\n        <p>' +
((__t = ( lot.description )) == null ? '' : __t) +
'</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  ';
 }) ;
__p += '\r\n';
 } ;
__p += '\r\n';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['sortBar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="sort-bar clearfix">\r\n  <div class="col-xs-12 col-sm-6 col-md-4">\r\n    <select id="sort-select" class="input-field">\r\n      ';
obj.forEach(function(sortOption){;
__p += '\r\n        <option value="' +
((__t = (sortOption.value)) == null ? '' : __t) +
'">' +
((__t = (sortOption.name)) == null ? '' : __t) +
'</option>\r\n      ';
});;
__p += '\r\n    </select>\r\n  </div>\r\n</div>';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['userBar'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="panel">\r\n  <div class="row">\r\n    <div class="col-xs-5">\r\n      <div>User: <span><a href="' +
((__t = ( userProfileLink )) == null ? '' : __t) +
'">' +
((__t = ( userName )) == null ? '' : __t) +
'</a></span></div>\r\n      <div>Money: <span id="user-money">' +
((__t = ( userMoney )) == null ? '' : __t) +
'</span>$</div>\r\n    </div>  \r\n    <div class="col-xs-7">\r\n      <div class="row">\r\n        <div class="col-xs-6">\r\n          <a href="' +
((__t = ( addLotLink )) == null ? '' : __t) +
'" id="add-lot-button" class="button button-primary pull-right">Add lot</a>\r\n        </div> \r\n        <div class="col-xs-6">\r\n          <button id="logout-button" class="button pull-right">Logout</button>\r\n        </div>     \r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n';

}
return __p
}})();
(function() {
'use strict;'
var _ = {};
var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;'
};
var escapeRegexp = new RegExp('[' + Object.keys(escapeMap).join('') + ']', 'g');
_.escape = function(string) {
    if (!string) return '';
    return String(string).replace(escapeRegexp, function(match) {
        return escapeMap[match];
    });
};
(window['Templates'] = window['Templates'] || {})['userPage'] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="container">\r\n  <div class="user-info">\r\n  \t<div>Name: <span class="user-name">' +
((__t = ( name )) == null ? '' : __t) +
'</span></div>\r\n  \t<div>E-mail: <span class="user-email">' +
((__t = ( email )) == null ? '' : __t) +
'</span></div>\r\n  \t<div>Phone: <span class="user-phone">' +
((__t = ( phone )) == null ? '' : __t) +
'</span></div>\r\n  \t<div>Country: <span class="user-country">' +
((__t = ( country )) == null ? '' : __t) +
'</span></div>\r\n  </div>\r\n  \r\n  <div class="row">\r\n      ';
 if (lotsOnSale.length > 0) { ;
__p += '\r\n        <div class="col-sm-6">\r\n          <h2>On sale</h2>\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th>Lot</th>\r\n                <th>Min. price</th>\r\n                <th>Blitz price</th>\r\n              </tr>\r\n            </thead> \r\n            <tbody> \r\n            ';
 lotsOnSale.forEach(function(lot) { ;
__p += '\r\n              <tr>\r\n                <th><a href="' +
((__t = ( lot.url )) == null ? '' : __t) +
'">' +
((__t = ( lot.title )) == null ? '' : __t) +
'</a></th>\r\n                <th>' +
((__t = ( lot.minimalPrice )) == null ? '' : __t) +
' $</th>\r\n                <th>' +
((__t = ( lot.blitzPrice )) == null ? '' : __t) +
' $</th>\r\n              </tr>\r\n            ';
 }); ;
__p += '\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      ';
 }; ;
__p += '\r\n\r\n      ';
 if (bidedLots.length > 0) { ;
__p += '\r\n        <div class="col-sm-3">\r\n          <h2>Bids</h2>\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th>Lot</th>\r\n                <th>Bid</th>\r\n              </tr>\r\n            </thead>   \r\n            <tbody>\r\n            ';
 bidedLots.forEach(function(lot) { ;
__p += '\r\n            <tr>\r\n              <td><a href="' +
((__t = ( lot.url )) == null ? '' : __t) +
'">' +
((__t = ( lot.title )) == null ? '' : __t) +
'</a></td>\r\n              <td>' +
((__t = ( lot.bid )) == null ? '' : __t) +
' $</td>\r\n            </tr>\r\n            ';
 }); ;
__p += '\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      ';
 }; ;
__p += '\r\n\r\n      ';
 if (wonLots.length > 0) { ;
__p += '\r\n        <div class="col-sm-3">\r\n          <h2>Won</h2>\r\n          <table>\r\n            <thead>\r\n              <tr>\r\n                <th>Lot</th>\r\n                <th>Price</th>\r\n              </tr>\r\n            </thead>   \r\n            <tbody>\r\n            ';
 wonLots.forEach(function(lot) { ;
__p += '\r\n            <tr>\r\n              <td><a href="' +
((__t = ( lot.url )) == null ? '' : __t) +
'">' +
((__t = ( lot.title )) == null ? '' : __t) +
'</a></td>\r\n              <td>' +
((__t = ( lot.price )) == null ? '' : __t) +
' $</td>\r\n            </tr>\r\n            ';
 }); ;
__p += '\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      ';
 }; ;
__p += '\r\n  </div>\r\n</div>\r\n\r\n';

}
return __p
}})();