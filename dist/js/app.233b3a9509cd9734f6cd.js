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
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ 8168);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ 45);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 467);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 3453);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ 4756);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-markdown */ 8668);
/* harmony import */ var _ui_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ui/card */ 3027);




var _excluded = ["node"],
  _excluded2 = ["node"],
  _excluded3 = ["node"],
  _excluded4 = ["node", "inline"],
  _excluded5 = ["node"],
  _excluded6 = ["node"],
  _excluded7 = ["node"];




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
    h1: function h1(_ref2) {
      var node = _ref2.node,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, _excluded);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h1", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "text-3xl font-bold mt-6 mb-4"
      }));
    },
    h2: function h2(_ref3) {
      var node = _ref3.node,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref3, _excluded2);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("h2", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "text-2xl font-bold mt-6 mb-3"
      }));
    },
    p: function p(_ref4) {
      var node = _ref4.node,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref4, _excluded3);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("p", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "my-2"
      }));
    },
    code: function code(_ref5) {
      var node = _ref5.node,
        inline = _ref5.inline,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref5, _excluded4);
      return inline ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("code", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "font-mono text-sm bg-gray-100 rounded px-1"
      })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("code", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "font-mono text-sm block"
      }));
    },
    pre: function pre(_ref6) {
      var node = _ref6.node,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref6, _excluded5);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("pre", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "bg-gray-50 rounded-lg p-4 my-4 overflow-x-auto"
      }));
    },
    ol: function ol(_ref7) {
      var node = _ref7.node,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref7, _excluded6);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ol", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "list-decimal ml-6 my-2"
      }));
    },
    ul: function ul(_ref8) {
      var node = _ref8.node,
        props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref8, _excluded7);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement("ul", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        className: "list-disc ml-6 my-2"
      }));
    }
  };
  var renderContent = function renderContent(content) {
    if (!content) return null;
    try {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default().createElement(react_markdown__WEBPACK_IMPORTED_MODULE_7__.ReactMarkdown, {
        components: components,
        className: "prose max-w-none"
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
//# sourceMappingURL=app.233b3a9509cd9734f6cd.js.map