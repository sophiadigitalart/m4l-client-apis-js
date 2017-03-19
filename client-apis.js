var me = this;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiClient = __webpack_require__(2);

var _ApiClient2 = _interopRequireDefault(_ApiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clients = {};

var MaxShell = function () {
  function MaxShell() {
    _classCallCheck(this, MaxShell);
  }

  _createClass(MaxShell, [{
    key: "start",
    value: function start() {
      var client_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (!client_id) return;
      clients[client_id] = new _ApiClient2.default();
    }
  }, {
    key: "stop",
    value: function stop() {
      var client_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (client_id) {
        if (!clients[client_id]) return;
        clients[client_id].close();
        delete clients[client_id];
      } else {
        for (var c in clients) {
          clients[c].close();
        }clients = {};
      }
    }
  }, {
    key: "notifydeleted",
    value: function notifydeleted() {
      this.stop();
      pusher.cancel();
    }
  }, {
    key: "msg_int",
    value: function msg_int(client_id, req_id, action) {
      var client = clients[client_id];
      if (!client) output(client_id, req_id, 2, "no client with id", client_id);

      for (var _len = arguments.length, params = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        params[_key - 3] = arguments[_key];
      }

      switch (action) {
        case "echo":
          output(client_id, req_id, 0, params);
          return;
        case "info":
          var path = params.join(" ");
          var info = client.getInfo(path);
          if (!info) output(client_id, req_id, 2, "no info for path", path);else output(client_id, req_id, 0, info);
          return;
        case "new":
          var path = params.slice(0, params.length - 1).join(" ");
          var followPath = params[params.length - 1];
          var jsApi = client.createApi(path, followPath);
          if (!jsApi) output(client_id, req_id, 2, "no api at path", path);else output(client_id, req_id, 0, jsApi.getInfo());
          return;
      }
      var apikey = parseInt(params[0]);
      var api = client.getApiByKey(apikey);
      if (!api) {
        output(client_id, req_id, 2, "no api for key", apikey);
        return;
      }
      switch (action) {
        case "get":
          var property = params[1];
          output(client_id, req_id, 0, api.get(property));
          return;
        case "set":
          var property = params[1];
          var value = params[2];
          api.set(property, value);
          return;
        case "call":
          var name = params[1];
          var args = params.slice(2);
          output(client_id, req_id, 0, api.call(name, args));
          return;
        case "observe":
          var property = params[1];
          //      api.observe(property, val => output(client_id, req_id, 1, val))
          api.observe(property, function (val) {
            return observebuffered(client_id, req_id, val);
          });
          return;
        case "unobserve":
          var property = params[1];
          api.unobserve(property);
          return;
        case "destroy":
          client.destroy(apikey);
          return;
      }
    }
  }]);

  return MaxShell;
}();

exports.default = MaxShell;


function output(client_id, req_id, status) {
  for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    args[_key2 - 3] = arguments[_key2];
  }

  me.outlet.apply(me, [0, client_id, req_id, status].concat(args));
}

/*
 * When you have a lot of param updates (e.g. by moving around hard on a live-remote-params/XY-Pad),
 * you can observe ever increasing delays.
 * The number one way to get rid of those is to NOT have the Live App visible on the desktop. Really.
 * It would be a little silly to ask people to do that, so here's one workaround:
 * The observed values don't get sent immediately. Instead they are buffered and sent out every 5 ms.
 * If an observed value changes in the meantime, only the latest value is sent.
 * Also, the Task has to wait longer if js is too busy which kinda auto-adjusts the output.
 *
 * tl;dr: We trade observe-param speed for a massive boost in set-param speed.
 * 
 */

var obuffer = [];
var pusher = new Task(outputBuffer);
pusher.interval = 5;
pusher.repeat(-1);

function observebuffered(client_id, req_id, val) {
  var client = obuffer[client_id];
  if (!client) {
    client = [];
    obuffer[client_id] = client;
  }
  client[req_id] = val;
}

function outputBuffer() {
  for (var cid in obuffer) {
    var cl = obuffer[cid];
    for (var rid in cl) {
      output(parseInt(cid), rid, 1, cl[rid]);
      delete cl[rid];
    }
    if (!cl.length) delete obuffer[cid];
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (str, separator, limit) {
	if (!limit || separator === undefined) return str.split(separator, limit);
	if (!separator.length) return limit > 0 ? splitStart_noSep(str, limit) : splitEnd_noSep(str, -limit);
	return limit > 0 ? splitStart(str, separator, limit, 0, []) : splitEnd(str, separator, -limit, str.length, []);
};

function splitStart_noSep(str, lim) {
	var ret = [];
	lim = Math.min(lim, str.length) - 1;
	for (var i = 0; i < lim; ++i) {
		ret.push(str[i]);
	}ret.push(str.slice(lim));
	return ret;
}

function splitEnd_noSep(str, lim) {
	var ret = [];
	lim = Math.min(lim, str.length);
	var firstSlice = str.length - lim + 1;
	ret.push(str.slice(0, firstSlice));
	for (var i = firstSlice; i < str.length; ++i) {
		ret.push(str[i]);
	}return ret;
}

function splitStart(str, sep, lim, cur, acc) {
	var index = str.indexOf(sep, cur);
	if (index == -1 || acc.length + 1 == lim) {
		acc.push(str.slice(cur));
		return acc;
	}
	acc.push(str.slice(cur, index));
	return splitStart(str, sep, lim, index + sep.length, acc);
}

function splitEnd(str, sep, lim, cur, acc) {
	var index = str.lastIndexOf(sep, cur);
	if (cur == -1 || index == -1 || acc.length + 1 == lim) {
		acc.unshift(str.slice(0, cur + 1));
		return acc;
	}
	acc.unshift(str.slice(index + sep.length, cur + 1));
	return splitEnd(str, sep, lim, index - 1, acc);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JsApi = __webpack_require__(4);

var _JsApi2 = _interopRequireDefault(_JsApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var api_keys = 0;
var jsApis = {};

var ApiClient = function () {
  function ApiClient() {
    _classCallCheck(this, ApiClient);
  }

  _createClass(ApiClient, [{
    key: "createApi",
    value: function createApi(path) {
      var followPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var api = new _JsApi2.default(path, followPath);
      if (!api.exists()) return null;
      var key = ++api_keys;
      api.setKey(key);
      jsApis[key] = api;
      return api;
    }
  }, {
    key: "getInfoApi",
    value: function getInfoApi() {
      if (!this.infoapi) this.infoapi = new _JsApi2.default("live_set");
      return this.infoapi;
    }
  }, {
    key: "getApiByKey",
    value: function getApiByKey(key) {
      return jsApis[key];
    }
  }, {
    key: "getInfo",
    value: function getInfo(path) {
      this.getInfoApi().setPath(path);
      return this.getInfoApi().getInfo();
    }
  }, {
    key: "destroy",
    value: function destroy(apikey) {
      var api = jsApis[apikey];
      if (!api) return;
      api.close();
      delete jsApis[apikey];
    }
  }, {
    key: "close",
    value: function close() {
      for (var a in jsApis) {
        jsApis[a].close();
      }jsApis = {};
    }
  }]);

  return ApiClient;
}();

exports.default = ApiClient;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiObserver = function () {
  function ApiObserver(api, property, callback) {
    _classCallCheck(this, ApiObserver);

    var self = this;
    this.api = new LiveAPI(me.patcher, function (val) {
      if (val.shift() == property) callback(val);
    }, "live_set");
    this.api.path = api.path;
    this.api.mode = api.mode;
    this.api.property = property;
  }

  _createClass(ApiObserver, [{
    key: "close",
    value: function close() {
      this.api.property = 0;
      this.api.id = 0;
      this.api = null;
    }
  }]);

  return ApiObserver;
}();

exports.default = ApiObserver;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiObserver = __webpack_require__(3);

var _ApiObserver2 = _interopRequireDefault(_ApiObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ssplit = __webpack_require__(1);

var JsApi = function () {
  function JsApi(path, followPath) {
    _classCallCheck(this, JsApi);

    this.api = new LiveAPI(me.patcher, path);
    this.api.mode = followPath ? 0 : 1;
    this.observers = {};
  }

  _createClass(JsApi, [{
    key: "exists",
    value: function exists() {
      return this.getId() != 0;
    }
  }, {
    key: "getKey",
    value: function getKey() {
      return this.key;
    }
  }, {
    key: "setKey",
    value: function setKey(key) {
      this.key = key;
    }
  }, {
    key: "getPath",
    value: function getPath() {
      return this.api.path;
    }
  }, {
    key: "setPath",
    value: function setPath(path) {
      this.api.path = path;
    }
  }, {
    key: "getId",
    value: function getId() {
      return parseInt(this.api.id + "");
    }
  }, {
    key: "isFollowPath",
    value: function isFollowPath() {
      return this.api.mode == 1;
    }
  }, {
    key: "close",
    value: function close() {
      for (var o in this.observers) {
        this.observers[o].close();
      }this.observers = {};
    }
  }, {
    key: "get",
    value: function get(property) {
      return this.api.get(property);
    }
  }, {
    key: "call",
    value: function call(name) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.api.call(name, args);
    }
  }, {
    key: "set",
    value: function set(property, value) {
      this.api.set(property, value);
    }
  }, {
    key: "observe",
    value: function observe(property, callback) {
      if (this.observers[property]) return;
      this.observers[property] = new _ApiObserver2.default(this.api, property, callback);
    }
  }, {
    key: "unobserve",
    value: function unobserve(property) {
      if (!this.observers[property]) return;
      this.observers[property].close();
      delete this.observers[property];
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      if (!this.getId()) return null;
      var info = {
        key: this.key,
        id: this.getId(),
        path: this.api.unquotedpath,
        type: this.api.type,
        description: undefined,
        properties: [],
        functions: [],
        children: [],
        childs: []
      };
      this.api.info.split("\n").forEach(function (line) {
        var kv = ssplit(line, " ", 2);
        switch (kv[0]) {
          case "child":
            info.childs.push(kv[1]);break;
          case "children":
            info.children.push(kv[1]);break;
          case "description":
            info.description = kv[1];break;
          case "property":
            info.properties.push(kv[1]);break;
          case "function":
            info.functions.push(kv[1]);break;
        }
      });

      return JSON.stringify(info);
    }
  }]);

  return JsApi;
}();

exports.default = JsApi;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _MaxShell = __webpack_require__(0);

var _MaxShell2 = _interopRequireDefault(_MaxShell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shell = new _MaxShell2.default();

me.start = shell.start;
me.stop = shell.stop;
me.msg_int = shell.msg_int;
me.notifydeleted = shell.notifydeleted;

/***/ })
/******/ ]);
});