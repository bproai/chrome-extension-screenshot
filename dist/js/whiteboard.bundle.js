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
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 7013);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 4467);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 3453);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ 6540);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);



function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

var Whiteboard = function Whiteboard() {
  var _textElements$editing, _textElements$editing2, _textElements$editing3;
  var canvasRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState, 2),
    isDrawing = _useState2[0],
    setIsDrawing = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState3, 2),
    context = _useState4[0],
    setContext = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState5, 2),
    lastX = _useState6[0],
    setLastX = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0),
    _useState8 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState7, 2),
    lastY = _useState8[0],
    setLastY = _useState8[1];

  // State for managing images and selection
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]),
    _useState10 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState9, 2),
    images = _useState10[0],
    setImages = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),
    _useState12 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState11, 2),
    selectedImage = _useState12[0],
    setSelectedImage = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState14 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState13, 2),
    isDragging = _useState14[0],
    setIsDragging = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
      x: 0,
      y: 0
    }),
    _useState16 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState15, 2),
    dragOffset = _useState16[0],
    setDragOffset = _useState16[1];

  // State for undo history
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]),
    _useState18 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState17, 2),
    history = _useState18[0],
    setHistory = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(-1),
    _useState20 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState19, 2),
    currentStep = _useState20[0],
    setCurrentStep = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]),
    _useState22 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState21, 2),
    linePoints = _useState22[0],
    setLinePoints = _useState22[1];

  // New state for text handling
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]),
    _useState24 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState23, 2),
    textElements = _useState24[0],
    setTextElements = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),
    _useState26 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState25, 2),
    selectedText = _useState26[0],
    setSelectedText = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState28 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState27, 2),
    isAddingText = _useState28[0],
    setIsAddingText = _useState28[1];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),
    _useState30 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState29, 2),
    editingText = _useState30[0],
    setEditingText = _useState30[1];

  // Add new state for resize handling
  var _useState31 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false),
    _useState32 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState31, 2),
    isResizing = _useState32[0],
    setIsResizing = _useState32[1];
  var _useState33 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null),
    _useState34 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState33, 2),
    resizeHandle = _useState34[0],
    setResizeHandle = _useState34[1];
  var _useState35 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
      width: 0,
      height: 0
    }),
    _useState36 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState35, 2),
    initialSize = _useState36[0],
    setInitialSize = _useState36[1];
  var _useState37 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({
      x: 0,
      y: 0
    }),
    _useState38 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_useState37, 2),
    initialMouse = _useState38[0],
    setInitialMouse = _useState38[1];

  // Save current state to history
  var saveToHistory = function saveToHistory(newImages) {
    var newLinePoints = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var newTextElements = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var newStep = {
      images: newImages.map(function (img) {
        return _objectSpread(_objectSpread({}, img), {}, {
          element: img.element,
          url: img.url,
          zIndex: img.zIndex || 0
        });
      }),
      lines: newLinePoints.map(function (line) {
        return _objectSpread(_objectSpread({}, line), {}, {
          zIndex: line.zIndex || 0
        });
      }),
      textElements: newTextElements.map(function (text) {
        return _objectSpread(_objectSpread({}, text), {}, {
          zIndex: text.zIndex || 0
        });
      })
    };
    setHistory(function (prev) {
      return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prev.slice(0, currentStep + 1)), [newStep]);
    });
    setCurrentStep(function (prev) {
      return prev + 1;
    });
  };
  var startAddingText = function startAddingText() {
    setIsAddingText(true);
    setSelectedImage(null);
    setSelectedText(null);
    canvasRef.current.style.cursor = 'text';
  };
  var handleCanvasClick = function handleCanvasClick(e) {
    var _history$currentStep;
    if (!isAddingText) return;
    var rect = canvasRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Get highest z-index
    var maxZIndex = Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(images.map(function (img) {
      return img.zIndex || 0;
    })).concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(textElements.map(function (text) {
      return text.zIndex || 0;
    })), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((((_history$currentStep = history[currentStep]) === null || _history$currentStep === void 0 ? void 0 : _history$currentStep.lines) || []).map(function (line) {
      return line.zIndex || 0;
    })), [0]));
    var newText = {
      x: x,
      y: y,
      text: '',
      fontSize: 20,
      zIndex: maxZIndex + 1,
      isEditing: true
    };
    var newIndex = textElements.length;
    setTextElements(function (prev) {
      return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prev), [newText]);
    });
    setEditingText(newIndex);
    setIsAddingText(false);
    canvasRef.current.style.cursor = 'default';
  };
  var handleTextChange = function handleTextChange(index, newText) {
    var _history$currentStep2;
    var updatedElements = textElements.map(function (el, i) {
      return i === index ? _objectSpread(_objectSpread({}, el), {}, {
        text: newText
      }) : el;
    });
    setTextElements(updatedElements);
    saveToHistory(images, ((_history$currentStep2 = history[currentStep]) === null || _history$currentStep2 === void 0 ? void 0 : _history$currentStep2.lines) || [], updatedElements);
  };
  var handleTextClick = function handleTextClick(index, e) {
    e.stopPropagation();
    setSelectedText(index);
    setSelectedImage(null);
    setEditingText(index);
  };
  var handleTextBlur = function handleTextBlur() {
    var _history$currentStep3;
    setEditingText(null);
    var updatedElements = textElements.map(function (el) {
      return _objectSpread(_objectSpread({}, el), {}, {
        isEditing: false
      });
    });
    setTextElements(updatedElements);
    saveToHistory(images, ((_history$currentStep3 = history[currentStep]) === null || _history$currentStep3 === void 0 ? void 0 : _history$currentStep3.lines) || [], updatedElements);
  };
  var bringToFront = function bringToFront() {
    var _history$currentStep4, _history$currentStep5;
    if (selectedImage === null) return;

    // Get highest z-index
    var maxZIndex = Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(images.map(function (img) {
      return img.zIndex || 0;
    })).concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((((_history$currentStep4 = history[currentStep]) === null || _history$currentStep4 === void 0 ? void 0 : _history$currentStep4.lines) || []).map(function (line) {
      return line.zIndex || 0;
    })), [0]));

    // Update selected image z-index
    var newImages = images.map(function (img, index) {
      if (index === selectedImage) {
        return _objectSpread(_objectSpread({}, img), {}, {
          zIndex: maxZIndex + 1
        });
      }
      return img;
    });
    setImages(newImages);
    // Keep the existing lines when saving history
    var currentLines = ((_history$currentStep5 = history[currentStep]) === null || _history$currentStep5 === void 0 ? void 0 : _history$currentStep5.lines) || [];
    saveToHistory(newImages, currentLines);
    drawCanvas();
  };
  var undo = function undo() {
    if (currentStep > 0) {
      var previousStep = history[currentStep - 1];
      var restoredImages = previousStep.images.map(function (img) {
        var currentImage = images.find(function (current) {
          return current.url === img.url;
        });
        return _objectSpread(_objectSpread({}, img), {}, {
          element: currentImage ? currentImage.element : img.element
        });
      });
      setImages(restoredImages);
      setCurrentStep(function (prev) {
        return prev - 1;
      });
      drawCanvas();
    }
  };
  var handleImageFile = function handleImageFile(file) {
    if (!file.type.match('image/(jpeg|png|gif)')) {
      alert('Please upload a valid image file (JPG, PNG, or GIF)');
      return;
    }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      var _history$currentStep6;
      var canvas = canvasRef.current;
      var scale = Math.min((canvas.width - 20) / img.width, (canvas.height - 20) / img.height);
      var width = img.width * scale;
      var height = img.height * scale;
      var x = (canvas.width - width) / 2;
      var y = (canvas.height - height) / 2;

      // Get highest z-index
      var maxZIndex = Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(images.map(function (img) {
        return img.zIndex || 0;
      })).concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])((((_history$currentStep6 = history[currentStep]) === null || _history$currentStep6 === void 0 ? void 0 : _history$currentStep6.lines) || []).map(function (line) {
        return line.zIndex || 0;
      })), [0]));
      var newImages = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(images), [{
        element: img,
        x: x,
        y: y,
        width: width,
        height: height,
        url: url,
        zIndex: maxZIndex + 1
      }]);
      setImages(newImages);
      saveToHistory(newImages);
    };
    img.src = url;
  };
  var clearWhiteboard = function clearWhiteboard() {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    setImages([]);
    setSelectedImage(null);
    setTextElements([]); // Add this line
    setSelectedText(null); // Add this line  
    setLinePoints([]);
    saveToHistory([], [], []);
  };
  var isPointInImage = function isPointInImage(x, y, image) {
    return x >= image.x && x <= image.x + image.width && y >= image.y && y <= image.y + image.height;
  };

  // Define resize handles with their cursors
  var resizeHandles = {
    'nw': {
      cursor: 'nw-resize',
      x: -5,
      y: -5
    },
    'ne': {
      cursor: 'ne-resize',
      x: 1,
      y: -5
    },
    'se': {
      cursor: 'se-resize',
      x: 1,
      y: 1
    },
    'sw': {
      cursor: 'sw-resize',
      x: -5,
      y: 1
    }
  };

  // Helper function to check if a point is near a resize handle
  var getResizeHandle = function getResizeHandle(x, y, image) {
    var handleSize = 10; // Size of resize handle hitbox

    for (var _i = 0, _Object$entries = Object.entries(resizeHandles); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_Object$entries[_i], 2),
        position = _Object$entries$_i[0],
        handle = _Object$entries$_i[1];
      var handleX = position.includes('e') ? image.x + image.width - handleSize / 2 : image.x - handleSize / 2;
      var handleY = position.includes('s') ? image.y + image.height - handleSize / 2 : image.y - handleSize / 2;
      if (Math.abs(x - handleX) <= handleSize && Math.abs(y - handleY) <= handleSize) {
        return position;
      }
    }
    return null;
  };
  var drawCanvas = function drawCanvas() {
    var _history$currentStep7;
    var canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas and draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set common drawing styles
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw all completed lines from history first
    var currentLines = ((_history$currentStep7 = history[currentStep]) === null || _history$currentStep7 === void 0 ? void 0 : _history$currentStep7.lines) || [];
    currentLines.forEach(function (line) {
      var _line$points;
      if ((line === null || line === void 0 || (_line$points = line.points) === null || _line$points === void 0 ? void 0 : _line$points.length) >= 2) {
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for (var i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        ctx.stroke();
      }
    });

    // Draw all images with their z-index
    images.slice().sort(function (a, b) {
      return (a.zIndex || 0) - (b.zIndex || 0);
    }).forEach(function (img, index) {
      if (img.element) {
        ctx.drawImage(img.element, img.x, img.y, img.width, img.height);
      }
    });

    // Draw text elements
    textElements.slice().sort(function (a, b) {
      return (a.zIndex || 0) - (b.zIndex || 0);
    }).forEach(function (textEl, index) {
      if (!textEl.isEditing) {
        ctx.font = "".concat(textEl.fontSize, "px Arial");
        ctx.fillStyle = '#000000';
        ctx.fillText(textEl.text, textEl.x, textEl.y);

        // Draw selection border if selected
        if (index === selectedText) {
          var metrics = ctx.measureText(textEl.text);
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 2;
          ctx.strokeRect(textEl.x - 2, textEl.y - textEl.fontSize, metrics.width + 4, textEl.fontSize + 4);
        }
      }
    });

    // Draw current line if drawing
    if (isDrawing && linePoints.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(linePoints[0].x, linePoints[0].y);
      for (var i = 1; i < linePoints.length; i++) {
        ctx.lineTo(linePoints[i].x, linePoints[i].y);
      }
      ctx.stroke();
    }

    // Draw selection border last
    if (selectedImage !== null) {
      var img = images[selectedImage];
      if (img) {
        ctx.save();
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(img.x - 2, img.y - 2, img.width + 4, img.height + 4);
        ctx.restore();
      }
    }
    if (selectedImage !== null) {
      var _img = images[selectedImage];
      if (_img) {
        ctx.save();

        // Draw selection border
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(_img.x - 2, _img.y - 2, _img.width + 4, _img.height + 4);

        // Draw resize handles
        ctx.fillStyle = '#00ff00';
        Object.entries(resizeHandles).forEach(function (_ref) {
          var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, 2),
            position = _ref2[0],
            handle = _ref2[1];
          var x = position.includes('e') ? _img.x + _img.width : _img.x;
          var y = position.includes('s') ? _img.y + _img.height : _img.y;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    var canvas = canvasRef.current;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    var ctx = canvas.getContext('2d');
    setContext(ctx);

    // Initial draw with white background
    drawCanvas();
    var handlePaste = function handlePaste(e) {
      var _e$clipboardData;
      var items = (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 ? void 0 : _e$clipboardData.items;
      if (!items) return;
      var _iterator = _createForOfIteratorHelper(items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          if (item.type.indexOf('image') !== -1) {
            var blob = item.getAsFile();
            handleImageFile(blob);
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
    var handleKeyDown = function handleKeyDown(e) {
      if (e.key === 'z' && (navigator.platform.toLowerCase().includes('mac') ? e.metaKey : e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        undo();
      }
    };
    var handleResize = function handleResize() {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 20;
      drawCanvas();
    };
    window.addEventListener('paste', handlePaste);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return function () {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images, selectedImage, history, currentStep, textElements, selectedText, isDrawing]);
  var startDrawing = function startDrawing(e) {
    var rect = canvasRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Check for resize handle first if an image is selected
    if (selectedImage !== null) {
      var handle = getResizeHandle(x, y, images[selectedImage]);
      if (handle) {
        setIsResizing(true);
        setResizeHandle(handle);
        setInitialSize({
          width: images[selectedImage].width,
          height: images[selectedImage].height
        });
        setInitialMouse({
          x: x,
          y: y
        });
        return;
      }
    }
    var clickedImageIndex = images.findIndex(function (img) {
      return isPointInImage(x, y, img);
    });
    if (clickedImageIndex !== -1) {
      setSelectedImage(clickedImageIndex);
      setIsDragging(true);
      setDragOffset({
        x: x - images[clickedImageIndex].x,
        y: y - images[clickedImageIndex].y
      });
    } else {
      setSelectedImage(null);
      setIsDrawing(true);
      setLastX(x);
      setLastY(y);
      setLinePoints([{
        x: x,
        y: y
      }]);
    }
  };
  var draw = function draw(e) {
    if (!isDrawing && !isDragging && !isResizing) return;
    var rect = canvasRef.current.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    if (isResizing && selectedImage !== null) {
      var img = images[selectedImage];
      var dx = x - initialMouse.x;
      var dy = y - initialMouse.y;

      // Calculate new size based on resize handle and maintain aspect ratio
      var newWidth = initialSize.width;
      var newHeight = initialSize.height;
      var aspectRatio = initialSize.width / initialSize.height;
      if (resizeHandle.includes('e')) {
        newWidth = Math.max(50, initialSize.width + dx);
        newHeight = newWidth / aspectRatio;
      } else if (resizeHandle.includes('w')) {
        newWidth = Math.max(50, initialSize.width - dx);
        newHeight = newWidth / aspectRatio;
      }
      if (resizeHandle.includes('s')) {
        newHeight = Math.max(50, initialSize.height + dy);
        newWidth = newHeight * aspectRatio;
      } else if (resizeHandle.includes('n')) {
        newHeight = Math.max(50, initialSize.height - dy);
        newWidth = newHeight * aspectRatio;
      }
      var newImages = images.map(function (img, index) {
        if (index === selectedImage) {
          var newX = resizeHandle.includes('w') ? img.x - (newWidth - initialSize.width) : img.x;
          var newY = resizeHandle.includes('n') ? img.y - (newHeight - initialSize.height) : img.y;
          return _objectSpread(_objectSpread({}, img), {}, {
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
          });
        }
        return img;
      });
      setImages(newImages);
      drawCanvas();
    } else if (isDragging && selectedImage !== null) {
      var _newImages = images.map(function (img, index) {
        if (index === selectedImage) {
          return _objectSpread(_objectSpread({}, img), {}, {
            x: x - dragOffset.x,
            y: y - dragOffset.y
          });
        }
        return img;
      });
      setImages(_newImages);
      drawCanvas();
    } else if (isDrawing) {
      setLinePoints(function (prev) {
        return [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prev), [{
          x: x,
          y: y
        }]);
      });
      drawCanvas();
    }
  };
  var stopDrawing = function stopDrawing() {
    if (isResizing) {
      saveToHistory(images);
      setIsResizing(false);
      setResizeHandle(null);
    } else if (isDrawing && linePoints.length > 1) {
      var _history$currentStep8;
      var currentLines = ((_history$currentStep8 = history[currentStep]) === null || _history$currentStep8 === void 0 ? void 0 : _history$currentStep8.lines) || [];

      // Get highest z-index
      var maxZIndex = Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(images.map(function (img) {
        return img.zIndex || 0;
      })).concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(currentLines.map(function (line) {
        return line.zIndex || 0;
      })), [0]));
      var newLines = [].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(currentLines), [{
        points: (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(linePoints),
        zIndex: maxZIndex + 1
      }]);
      saveToHistory(images, newLines);
      setLinePoints([]);
    } else if (isDragging) {
      saveToHistory(images);
    }
    setIsDrawing(false);
    setIsDragging(false);
    drawCanvas();
  };
  var handleFileChange = function handleFileChange(e) {
    var _e$target$files;
    var file = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (file) {
      handleImageFile(file);
    }
  };

  // Update canvas cursor based on resize handles
  var handleMouseMove = function handleMouseMove(e) {
    if (selectedImage !== null && !isResizing && !isDragging) {
      var rect = canvasRef.current.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var handle = getResizeHandle(x, y, images[selectedImage]);
      if (handle) {
        canvasRef.current.style.cursor = resizeHandles[handle].cursor;
      } else if (isPointInImage(x, y, images[selectedImage])) {
        canvasRef.current.style.cursor = 'move';
      } else {
        canvasRef.current.style.cursor = 'crosshair';
      }
    }
    draw(e);
  };

  // Add text input overlay
  var TextInputOverlay = function TextInputOverlay(_ref3) {
    var text = _ref3.text,
      index = _ref3.index,
      x = _ref3.x,
      y = _ref3.y;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("input", {
      type: "text",
      value: text,
      onChange: function onChange(e) {
        return handleTextChange(index, e.target.value);
      },
      onBlur: handleTextBlur,
      style: {
        position: 'absolute',
        left: x + 'px',
        top: y - 20 + 'px',
        background: 'white',
        border: '1px solid #ccc',
        outline: 'none',
        font: '20px Arial',
        minWidth: '100px',
        padding: '2px 4px',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      },
      autoFocus: true
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
    className: "min-h-screen bg-gray-100 p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
    className: "bg-white rounded-lg shadow-lg p-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
    className: "mb-2 flex items-center gap-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("label", {
    className: "inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors",
    title: "Upload JPG, PNG, or GIF image"
  }, "Upload Image", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("input", {
    type: "file",
    accept: "image/jpeg,image/png,image/gif",
    onChange: handleFileChange,
    className: "hidden"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("button", {
    onClick: clearWhiteboard,
    className: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors",
    title: "Clear all content from whiteboard"
  }, "Clear Whiteboard"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("button", {
    onClick: undo,
    disabled: currentStep <= 0,
    className: "px-4 py-2 text-white rounded transition-colors ".concat(currentStep <= 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'),
    title: "Undo last action (".concat(navigator.platform.toLowerCase().includes('mac') ? '⌘Z' : 'Ctrl+Z', ")")
  }, "Undo"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("button", {
    onClick: bringToFront,
    disabled: selectedImage === null,
    className: "px-4 py-2 text-white rounded transition-colors ".concat(selectedImage === null ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'),
    title: "Bring selected image to front"
  }, "Bring to Front"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("button", {
    onClick: startAddingText,
    className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors",
    title: "Add text to whiteboard"
  }, "Add Text"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
    className: "ml-2 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-600 cursor-help",
    title: "Click and drag to move images \u2022 Draw anywhere else \u2022 Click Add Text to insert text"
  }, "?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("div", {
    className: "relative",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("canvas", {
    ref: canvasRef,
    className: "border-2 border-gray-400 rounded cursor-crosshair",
    onMouseDown: startDrawing,
    onMouseMove: handleMouseMove,
    onMouseUp: stopDrawing,
    onMouseOut: stopDrawing,
    onClick: handleCanvasClick
  }), editingText !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(TextInputOverlay, {
    text: ((_textElements$editing = textElements[editingText]) === null || _textElements$editing === void 0 ? void 0 : _textElements$editing.text) || '',
    index: editingText,
    x: ((_textElements$editing2 = textElements[editingText]) === null || _textElements$editing2 === void 0 ? void 0 : _textElements$editing2.x) || 0,
    y: ((_textElements$editing3 = textElements[editingText]) === null || _textElements$editing3 === void 0 ? void 0 : _textElements$editing3.y) || 0
  }))));
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