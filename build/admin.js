/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setting */ \"./src/setting.js\");\n\nvar render = wp.element.render;\nrender(React.createElement(_setting__WEBPACK_IMPORTED_MODULE_0__[\"default\"], null), document.getElementById('ewm-setting-root'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/setting.js":
/*!************************!*\
  !*** ./src/setting.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setting_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setting.scss */ \"./src/setting.scss\");\n/* harmony import */ var _setting_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_setting_scss__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\nvar __ = wp.i18n.__;\nvar _wp$components = wp.components,\n    Panel = _wp$components.Panel,\n    PanelRow = _wp$components.PanelRow,\n    Placeholder = _wp$components.Placeholder,\n    Spinner = _wp$components.Spinner;\nvar _wp$element = wp.element,\n    Component = _wp$element.Component,\n    Fragment = _wp$element.Fragment;\n\nvar Settings = /*#__PURE__*/function (_Component) {\n  _inherits(Settings, _Component);\n\n  function Settings(props) {\n    var _this;\n\n    _classCallCheck(this, Settings);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Settings).call(this, props));\n    _this.state = {\n      isAPILoaded: false,\n      isAPISaving: false,\n      select_option: '-1',\n      el_widget_list: []\n    };\n    _this.el_widgets = [];\n    _this.selected_widget = [];\n    _this.changeStatus = _this.changeStatus.bind(_assertThisInitialized(_this));\n    _this.changeOptions = _this.changeOptions.bind(_assertThisInitialized(_this));\n    _this.selectCheckbox = _this.selectCheckbox.bind(_assertThisInitialized(_this));\n    _this.selectApply = _this.selectApply.bind(_assertThisInitialized(_this));\n    return _this;\n  } // Formatting to all the previous setting when the component is mounted.\n\n\n  _createClass(Settings, [{\n    key: \"componentDidMount\",\n    value: function () {\n      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n        var _this2 = this;\n\n        var el_widget_list;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                // Making array of object.\n                el_widget_list = this.state.el_widget_list;\n                Object.keys(ewm_widgets).map(function (value, index) {\n                  el_widget_list[index] = {\n                    title: ewm_widgets[value],\n                    slug: value,\n                    status: true\n                  };\n                });\n                this.setState({\n                  el_widget_list: el_widget_list\n                }); // Getting data from setting model api.\n\n                wp.api.loadPromise.then(function () {\n                  _this2.widget = new wp.api.models.Settings();\n\n                  if (!_this2.state.isAPILoaded) {\n                    _this2.widget.fetch().then(function (response) {\n                      console.log(response);\n                      var el_widget_list = _this2.state.el_widget_list;\n                      Object.keys(_this2.state.el_widget_list).map(function (index) {\n                        if (response.ewm_widget.some(function (val) {\n                          return val === _this2.state.el_widget_list[index].slug;\n                        })) {\n                          el_widget_list[index].status = !_this2.state.el_widget_list[index].status;\n\n                          _this2.el_widgets.push(_this2.state.el_widget_list[index].slug);\n                        }\n                      });\n\n                      _this2.setState({\n                        el_widget_list: el_widget_list\n                      });\n\n                      _this2.setState({\n                        isAPILoaded: true\n                      });\n                    });\n                  }\n                });\n\n              case 4:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function componentDidMount() {\n        return _componentDidMount.apply(this, arguments);\n      }\n\n      return componentDidMount;\n    }() // Selected elements pushed into new array.\n\n  }, {\n    key: \"selectCheckbox\",\n    value: function selectCheckbox(e, index) {\n      // Select those which are checked.\n      if (e.target.checked) {\n        this.selected_widget.push(this.state.el_widget_list[index].slug);\n      } else {\n        var itemIndex = this.selected_widget.indexOf(this.state.el_widget_list[index].slug);\n        this.selected_widget.splice(itemIndex, 1);\n      }\n\n      console.log(this.selected_widget);\n    } // Selecting particular option from select.\n\n  }, {\n    key: \"selectChange\",\n    value: function selectChange(e) {\n      this.setState({\n        select_option: e.target.value\n      });\n    } // For saving the setting in the setting api.\n\n  }, {\n    key: \"changeOptions\",\n    value: function changeOptions(option, value) {\n      var _this3 = this;\n\n      this.setState({\n        isAPISaving: true\n      });\n      var model = new wp.api.models.Settings(_defineProperty({}, option, value));\n      model.save().then(function (response) {\n        console.log(response);\n\n        if ('success' == status) {\n          _this3.setState({\n            isAPISaving: false\n          });\n        }\n      });\n    }\n  }, {\n    key: \"selectApply\",\n    value: function selectApply() {\n      var _this4 = this;\n\n      var el_widget_list = this.state.el_widget_list;\n\n      if ('activate' == this.state.select_option) {\n        Object.keys(this.state.el_widget_list).map(function (index) {\n          if (_this4.selected_widget.some(function (val) {\n            return val === _this4.state.el_widget_list[index].slug;\n          }) && !_this4.state.el_widget_list[index].status) {\n            el_widget_list[index].status = !el_widget_list[index].status;\n\n            var itemIndex = _this4.el_widgets.indexOf(_this4.state.el_widget_list[index].slug);\n\n            _this4.el_widgets.splice(itemIndex, 1);\n          }\n        });\n      } else {\n        console.log('sad');\n      }\n\n      this.setState({\n        el_widget_list: el_widget_list\n      });\n    } // For changing the status from activate to deactivate and vice versa.\n\n  }, {\n    key: \"changeStatus\",\n    value: function changeStatus(index) {\n      var el_widget_list = this.state.el_widget_list;\n      el_widget_list[index].status = !this.state.el_widget_list[index].status;\n      this.setState({\n        el_widget_list: el_widget_list\n      }); // If the status is false then push otherwise pop.\n\n      if (!this.state.el_widget_list[index].status) {\n        this.el_widgets.push(this.state.el_widget_list[index].slug);\n      } else {\n        var itemIndex = this.el_widgets.indexOf(this.state.el_widget_list[index].slug);\n        this.el_widgets.splice(itemIndex, 1);\n      }\n\n      this.changeOptions('ewm_widget', this.el_widgets);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this5 = this;\n\n      if (!this.state.isAPILoaded) {\n        return React.createElement(Placeholder, null, React.createElement(Spinner, null));\n      }\n\n      return React.createElement(Fragment, null, React.createElement(\"header\", {\n        \"class\": \"ewm-setting-header\"\n      }, React.createElement(\"div\", {\n        \"class\": \"ewm-setting-title\"\n      }, React.createElement(\"h1\", null, __('Elementor Widget Manager')))), React.createElement(Panel, {\n        className: \"ewm-setting-container\"\n      }, React.createElement(\"div\", {\n        className: \"ewm-select-options-container\"\n      }, React.createElement(\"div\", {\n        className: \"ewm-select-options-container-checkbox\"\n      }, React.createElement(\"input\", {\n        type: \"checkbox\",\n        className: \"ewm-select-options-checkbox\"\n      })), React.createElement(\"div\", {\n        className: \"ewm-select-options-container-select\"\n      }, React.createElement(\"select\", {\n        value: this.state.select_option,\n        onChange: function onChange(e) {\n          return _this5.selectChange(e);\n        }\n      }, React.createElement(\"option\", {\n        value: \"-1\"\n      }, __('Bulk Actions')), React.createElement(\"option\", {\n        value: \"activate\"\n      }, __('Activate')), React.createElement(\"option\", {\n        value: \"deactive\"\n      }, __('Deactivate')))), React.createElement(\"div\", {\n        className: \"ewm-select-options-container-button\"\n      }, React.createElement(\"button\", {\n        className: \"button\",\n        onClick: this.selectApply\n      }, __('Apply')))), React.createElement(PanelRow, null, React.createElement(\"ul\", {\n        className: \"ewm-setting-list\"\n      }, Object.keys(this.state.el_widget_list).map(function (index) {\n        return React.createElement(\"li\", {\n          className: \"ewm-setting-list-item \" + (_this5.state.el_widget_list[index].status ? 'deactivate' : 'activate')\n        }, React.createElement(\"div\", {\n          className: \"ewm-setting-list-item-container-checkbox\"\n        }, React.createElement(\"input\", {\n          type: \"checkbox\",\n          className: \"ewm-setting-list-item-checkbox\",\n          onClick: function onClick(e) {\n            return _this5.selectCheckbox(e, index);\n          }\n        })), React.createElement(\"div\", {\n          className: \"ewm-setting-list-item-container-title\"\n        }, React.createElement(\"h4\", null, __(_this5.state.el_widget_list[index].title))), React.createElement(\"div\", {\n          className: \"ewm-setting-list-item-container-button\"\n        }, React.createElement(\"button\", {\n          id: 'item-' + index,\n          onClick: function onClick() {\n            return _this5.changeStatus(index);\n          },\n          className: \"ewm-setting-list-button\"\n        }, _this5.state.el_widget_list[index].status ? __('Deactivate') : __('Activate'))));\n      })))));\n    }\n  }]);\n\n  return Settings;\n}(Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Settings);\n\n//# sourceURL=webpack:///./src/setting.js?");

/***/ }),

/***/ "./src/setting.scss":
/*!**************************!*\
  !*** ./src/setting.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/setting.scss?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });