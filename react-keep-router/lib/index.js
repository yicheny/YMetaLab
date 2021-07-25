'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactRouterDom = require('react-router-dom');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var KeepSwitch = /*#__PURE__*/function (_Switch) {
  _inherits(KeepSwitch, _Switch);

  var _super = _createSuper(KeepSwitch);

  function KeepSwitch() {
    _classCallCheck(this, KeepSwitch);

    return _super.apply(this, arguments);
  }

  return KeepSwitch;
}(reactRouterDom.Switch);

var RouteCaChe = /*#__PURE__*/function () {
  function RouteCaChe() {
    _classCallCheck(this, RouteCaChe);

    _defineProperty(this, "_cache", new Map());
  }

  _createClass(RouteCaChe, [{
    key: "setCache",
    value: function setCache(key, value) {
      this._cache.set(key, value);
    }
  }, {
    key: "getCache",
    value: function getCache(key) {
      this._cache.get(key);
    }
  }, {
    key: "clearOne",
    value: function clearOne(key) {
      this._cache["delete"](key);
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this._cache.clear();
    }
  }]);

  return RouteCaChe;
}();

new RouteCaChe();

var KeepRoute = /*#__PURE__*/function (_Route) {
  _inherits(KeepRoute, _Route);

  var _super = _createSuper(KeepRoute);

  function KeepRoute() {
    _classCallCheck(this, KeepRoute);

    return _super.apply(this, arguments);
  }

  _createClass(KeepRoute, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(reactRouterDom.Route, this.props);
    }
  }]);

  return KeepRoute;
}(reactRouterDom.Route);

exports.KeepRoute = KeepRoute;
exports.KeepSwitch = KeepSwitch;
//# sourceMappingURL=index.js.map
