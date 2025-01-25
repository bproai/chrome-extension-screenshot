"use strict";
(self["webpackChunkchrome_extension_screenshot_server"] = self["webpackChunkchrome_extension_screenshot_server"] || []).push([["app"],{

/***/ 3534:
/*!********************************************!*\
  !*** ./components/TranscriptionViewer.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ 45);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ 8168);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 467);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 3453);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ 4756);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-markdown */ 8668);
/* harmony import */ var _ui_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/card */ 3027);
/* harmony import */ var remark_gfm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! remark-gfm */ 1905);




var _excluded = ["inline", "className", "children"],
  _excluded2 = ["children"],
  _excluded3 = ["ordered", "children"],
  _excluded4 = ["ordered", "children"],
  _excluded5 = ["children"],
  _excluded6 = ["children"],
  _excluded7 = ["children"],
  _excluded8 = ["children"],
  _excluded9 = ["children"],
  _excluded10 = ["children"];





function TranscriptionViewer() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([]),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState, 2),
    transcriptions = _useState2[0],
    setTranscriptions = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(true),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(null),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(function () {
    fetchTranscriptions();
  }, []);
  var fetchTranscriptions = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
      var response, data;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch('http://localhost:3002/transcribed-images');
          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();
          case 6:
            data = _context.sent;
            if (data.success) {
              setTranscriptions(data.images);
            } else {
              setError('Failed to fetch transcriptions');
            }
            _context.next = 14;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            setError('Error connecting to server');
            console.error('Fetch error:', _context.t0);
          case 14:
            _context.prev = 14;
            setLoading(false);
            return _context.finish(14);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 10, 14, 17]]);
    }));
    return function fetchTranscriptions() {
      return _ref.apply(this, arguments);
    };
  }();
  var components = {
    h1: function h1(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h1", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "text-3xl font-bold mt-6 mb-4"
      }));
    },
    h2: function h2(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h2", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "text-2xl font-bold mt-6 mb-3"
      }));
    },
    p: function p(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("p", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "my-2"
      }));
    },
    code: function code(_ref2) {
      var inline = _ref2.inline,
        className = _ref2.className,
        children = _ref2.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, _excluded);
      var match = /language-(\w+)/.exec(className || '');
      return inline ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("code", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "font-mono text-sm bg-gray-50 rounded px-1 font-semibold",
        style: {
          color: 'rgb(0, 0, 0)'
        }
      }), children) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("code", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "font-mono text-sm block font-semibold",
        style: {
          color: 'rgb(0, 0, 0)'
        }
      }), children);
    },
    pre: function pre(_ref3) {
      var children = _ref3.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref3, _excluded2);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("pre", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "bg-gray-50 rounded-lg p-4 my-4 overflow-x-auto font-semibold",
        style: {
          color: 'rgb(0, 0, 0)'
        }
      }), children);
    },
    ol: function ol(_ref4) {
      var ordered = _ref4.ordered,
        children = _ref4.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref4, _excluded3);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ol", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "list-decimal ml-6 my-2"
      }), children);
    },
    ul: function ul(_ref5) {
      var ordered = _ref5.ordered,
        children = _ref5.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref5, _excluded4);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ul", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "list-disc ml-6 my-2"
      }), children);
    },
    table: function table(_ref6) {
      var children = _ref6.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref6, _excluded5);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
        className: "overflow-x-auto my-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("table", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "min-w-full table-auto border-collapse border border-gray-300"
      }), children));
    },
    thead: function thead(_ref7) {
      var children = _ref7.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref7, _excluded6);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("thead", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "bg-gray-50 border-b border-gray-300"
      }), children);
    },
    tbody: function tbody(_ref8) {
      var children = _ref8.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref8, _excluded7);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("tbody", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "bg-white divide-y divide-gray-200"
      }), children);
    },
    tr: function tr(_ref9) {
      var children = _ref9.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref9, _excluded8);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("tr", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "hover:bg-gray-50 transition-colors"
      }), children);
    },
    th: function th(_ref10) {
      var children = _ref10.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref10, _excluded9);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("th", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b"
      }), children);
    },
    td: function td(_ref11) {
      var children = _ref11.children,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref11, _excluded10);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("td", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
        className: "px-4 py-2 whitespace-normal break-words text-sm text-gray-900"
      }), children);
    }
  };
  var renderContent = function renderContent(content) {
    if (!content) return null;
    try {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(react_markdown__WEBPACK_IMPORTED_MODULE_7__.ReactMarkdown, {
        components: components,
        remarkPlugins: [remark_gfm__WEBPACK_IMPORTED_MODULE_8__["default"]],
        className: "prose max-w-none break-words"
      }, content);
    } catch (err) {
      console.error('Markdown rendering error:', err);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
        className: "text-red-500"
      }, "Error rendering markdown: ", err.message);
    }
  };
  if (loading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
      className: "text-center p-4"
    }, "Loading transcriptions...");
  }
  if (error) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
      className: "text-center p-4 text-red-500"
    }, error);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
    className: "container mx-auto p-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h1", {
    className: "text-3xl font-bold mb-6"
  }, "Transcriptions"), transcriptions.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
    className: "text-center p-4"
  }, "No transcriptions found") : transcriptions.map(function (doc) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ui_card__WEBPACK_IMPORTED_MODULE_6__.Card, {
      key: doc._id,
      className: "w-full max-w-3xl mx-auto mb-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_ui_card__WEBPACK_IMPORTED_MODULE_6__.CardContent, {
      className: "p-6"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("div", {
      className: "mb-4 text-sm text-gray-500"
    }, "Object Key: ", doc.objectKey, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("br", null), "Created: ", new Date(doc.createdAt).toLocaleString()), renderContent(doc.transcription)));
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TranscriptionViewer);

/***/ }),

/***/ 3027:
/*!********************************!*\
  !*** ./components/ui/card.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: () => (/* binding */ Card),
/* harmony export */   CardContent: () => (/* binding */ CardContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Card(_ref) {
  var className = _ref.className,
    children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "rounded-lg border bg-card text-card-foreground shadow-sm ".concat(className)
  }, children);
}
function CardContent(_ref2) {
  var className = _ref2.className,
    children = _ref2.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-6 pt-0 ".concat(className)
  }, children);
}


/***/ }),

/***/ 1518:
/*!************************!*\
  !*** ./public/app.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ 5338);
/* harmony import */ var _components_TranscriptionViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/TranscriptionViewer */ 3534);




// Initialize React app
var container = document.getElementById('root');
var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_TranscriptionViewer__WEBPACK_IMPORTED_MODULE_2__["default"], null)));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(1518)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app.7e4b5d7d2ce8e1acc455.js.map