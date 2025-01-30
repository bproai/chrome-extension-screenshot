"use strict";
(self["webpackChunkchrome_extension_screenshot_server"] = self["webpackChunkchrome_extension_screenshot_server"] || []).push([["whiteboard"],{

/***/ 2175:
/*!***********************************!*\
  !*** ./components/Whiteboard.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 3453);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var Whiteboard = function Whiteboard() {
  var canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
    isDrawing = _useState2[0],
    setIsDrawing = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
    context = _useState4[0],
    setContext = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState5, 2),
    lastX = _useState6[0],
    setLastX = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState7, 2),
    lastY = _useState8[0],
    setLastY = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var canvas = canvasRef.current;
    // Use more of the available space
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setContext(ctx);

    // Handle paste events
    var handlePaste = function handlePaste(e) {
      var _e$clipboardData;
      var items = (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 ? void 0 : _e$clipboardData.items;
      if (!items) return;
      var _iterator = _createForOfIteratorHelper(items),
        _step;
      try {
        var _loop = function _loop() {
          var item = _step.value;
          if (item.type.indexOf('image') !== -1) {
            var blob = item.getAsFile();
            var url = URL.createObjectURL(blob);
            var img = new Image();
            img.onload = function () {
              // Get the current context since it might have changed
              var currentCtx = canvasRef.current.getContext('2d');
              if (!currentCtx) return;

              // Calculate dimensions to fit the image while maintaining aspect ratio
              var canvas = canvasRef.current;
              var scale = Math.min((canvas.width - 20) / img.width, (canvas.height - 20) / img.height);
              var width = img.width * scale;
              var height = img.height * scale;
              var x = (canvas.width - width) / 2;
              var y = (canvas.height - height) / 2;
              currentCtx.drawImage(img, x, y, width, height);
              URL.revokeObjectURL(url);
            };
            img.src = url;
            return 1; // break
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          if (_loop()) break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    // Handle window resize
    var handleResize = function handleResize() {
      var currentCtx = canvasRef.current.getContext('2d');
      if (!currentCtx) return;
      var tempCanvas = document.createElement('canvas');
      var tempCtx = tempCanvas.getContext('2d');

      // Save current drawing
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      // Resize canvas
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 20;

      // Set white background
      currentCtx.fillStyle = 'white';
      currentCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Restore drawing
      currentCtx.drawImage(tempCanvas, 0, 0);
    };
    window.addEventListener('paste', handlePaste);
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  var startDrawing = function startDrawing(e) {
    var rect = canvasRef.current.getBoundingClientRect();
    setIsDrawing(true);
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
  };
  var draw = function draw(e) {
    if (!isDrawing || !context) return;
    var rect = canvasRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
    setLastX(x);
    setLastY(y);
  };
  var stopDrawing = function stopDrawing() {
    setIsDrawing(false);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "min-h-screen bg-gray-100 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: "bg-white rounded-lg shadow-lg p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("canvas", {
    ref: canvasRef,
    className: "border-2 border-gray-400 rounded cursor-crosshair",
    onMouseDown: startDrawing,
    onMouseMove: draw,
    onMouseUp: stopDrawing,
    onMouseOut: stopDrawing
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Whiteboard);

/***/ }),

/***/ 4216:
/*!***********************************!*\
  !*** ./public/whiteboard-app.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ 5338);
/* harmony import */ var _components_Whiteboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Whiteboard */ 2175);




// Initialize React app
var container = document.getElementById('root');
var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(container);
root.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Whiteboard__WEBPACK_IMPORTED_MODULE_2__["default"], null)));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__(4216)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=whiteboard.bundle.js.map