import React, { useEffect, useRef, useState } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  
  // State for managing images and selection
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // State for undo history
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [linePoints, setLinePoints] = useState([]);

  // Add new state for resize handling
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialMouse, setInitialMouse] = useState({ x: 0, y: 0 });  

  // Save current state to history
  const saveToHistory = (newImages, newLinePoints = []) => {
    const newStep = {
      images: newImages.map(img => ({
        ...img,
        element: img.element,
        url: img.url,
        zIndex: img.zIndex || 0
      })),
      lines: newLinePoints.map(line => ({
        ...line,
        zIndex: line.zIndex || 0
      }))
    };

    setHistory(prev => [...prev.slice(0, currentStep + 1), newStep]);
    setCurrentStep(prev => prev + 1);
  };

  const bringToFront = () => {
    if (selectedImage === null) return;
    
    // Get highest z-index
    const maxZIndex = Math.max(
      ...images.map(img => img.zIndex || 0),
      ...((history[currentStep]?.lines || []).map(line => line.zIndex || 0)),
      0
    );

    // Update selected image z-index
    const newImages = images.map((img, index) => {
      if (index === selectedImage) {
        return { ...img, zIndex: maxZIndex + 1 };
      }
      return img;
    });

    setImages(newImages);
    // Keep the existing lines when saving history
    const currentLines = history[currentStep]?.lines || [];
    saveToHistory(newImages, currentLines);
    drawCanvas();
  };

  const undo = () => {
    if (currentStep > 0) {
      const previousStep = history[currentStep - 1];
      
      const restoredImages = previousStep.images.map(img => {
        const currentImage = images.find(current => current.url === img.url);
        return {
          ...img,
          element: currentImage ? currentImage.element : img.element
        };
      });
      
      setImages(restoredImages);
      setCurrentStep(prev => prev - 1);
      drawCanvas();
    }
  };

  const handleImageFile = (file) => {
    if (!file.type.match('image/(jpeg|png|gif)')) {
      alert('Please upload a valid image file (JPG, PNG, or GIF)');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = () => {
      const canvas = canvasRef.current;
      const scale = Math.min(
        (canvas.width - 20) / img.width,
        (canvas.height - 20) / img.height
      );
      
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;

      // Get highest z-index
      const maxZIndex = Math.max(
        ...images.map(img => img.zIndex || 0),
        ...((history[currentStep]?.lines || []).map(line => line.zIndex || 0)),
        0
      );
      
      const newImages = [...images, {
        element: img,
        x,
        y,
        width,
        height,
        url,
        zIndex: maxZIndex + 1
      }];
      
      setImages(newImages);
      saveToHistory(newImages);
    };
    
    img.src = url;
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    setImages([]);
    setSelectedImage(null);
    setLinePoints([]);
    saveToHistory([]);
  };

  const isPointInImage = (x, y, image) => {
    return x >= image.x && 
           x <= image.x + image.width && 
           y >= image.y && 
           y <= image.y + image.height;
  };

  // Define resize handles with their cursors
  const resizeHandles = {
    'nw': { cursor: 'nw-resize', x: -5, y: -5 },
    'ne': { cursor: 'ne-resize', x: 1, y: -5 },
    'se': { cursor: 'se-resize', x: 1, y: 1 },
    'sw': { cursor: 'sw-resize', x: -5, y: 1 }
  };

  // Helper function to check if a point is near a resize handle
  const getResizeHandle = (x, y, image) => {
    const handleSize = 10; // Size of resize handle hitbox

    for (const [position, handle] of Object.entries(resizeHandles)) {
      const handleX = position.includes('e') ? 
        image.x + image.width - handleSize/2 : 
        image.x - handleSize/2;
      const handleY = position.includes('s') ? 
        image.y + image.height - handleSize/2 : 
        image.y - handleSize/2;

      if (Math.abs(x - handleX) <= handleSize && Math.abs(y - handleY) <= handleSize) {
        return position;
      }
    }
    return null;
  };



  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
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
    const currentLines = history[currentStep]?.lines || [];
    currentLines.forEach(line => {
      if (line?.points?.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        ctx.stroke();
      }
    });

    // Draw all images with their z-index
    images
      .slice()
      .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
      .forEach((img, index) => {
        if (img.element) {
          ctx.drawImage(img.element, img.x, img.y, img.width, img.height);
        }
    });

    // Draw current line if drawing
    if (isDrawing && linePoints.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(linePoints[0].x, linePoints[0].y);
      for (let i = 1; i < linePoints.length; i++) {
        ctx.lineTo(linePoints[i].x, linePoints[i].y);
      }
      ctx.stroke();
    }

    // Draw selection border last
    if (selectedImage !== null) {
      const img = images[selectedImage];
      if (img) {
        ctx.save();
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(img.x - 2, img.y - 2, img.width + 4, img.height + 4);
        ctx.restore();
      }
    }

    if (selectedImage !== null) {
      const img = images[selectedImage];
      if (img) {
        ctx.save();
        
        // Draw selection border
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(img.x - 2, img.y - 2, img.width + 4, img.height + 4);

        // Draw resize handles
        ctx.fillStyle = '#00ff00';
        Object.entries(resizeHandles).forEach(([position, handle]) => {
          const x = position.includes('e') ? img.x + img.width : img.x;
          const y = position.includes('s') ? img.y + img.height : img.y;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    
    const ctx = canvas.getContext('2d');
    setContext(ctx);
    
    // Initial draw with white background
    drawCanvas();

    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          handleImageFile(blob);
          break;
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'z' && (navigator.platform.toLowerCase().includes('mac') ? e.metaKey : e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        undo();
      }
    };
    
    const handleResize = () => {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 20;
      drawCanvas();
    };

    window.addEventListener('paste', handlePaste);
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images, selectedImage, history, currentStep]);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check for resize handle first if an image is selected
    if (selectedImage !== null) {
      const handle = getResizeHandle(x, y, images[selectedImage]);
      if (handle) {
        setIsResizing(true);
        setResizeHandle(handle);
        setInitialSize({
          width: images[selectedImage].width,
          height: images[selectedImage].height
        });
        setInitialMouse({ x, y });
        return;
      }
    }

    const clickedImageIndex = images.findIndex(img => isPointInImage(x, y, img));
    
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
      setLinePoints([{ x, y }]);
    }
  };

  const draw = (e) => {
    if (!isDrawing && !isDragging && !isResizing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (isResizing && selectedImage !== null) {
      const img = images[selectedImage];
      const dx = x - initialMouse.x;
      const dy = y - initialMouse.y;
      
      // Calculate new size based on resize handle and maintain aspect ratio
      let newWidth = initialSize.width;
      let newHeight = initialSize.height;
      const aspectRatio = initialSize.width / initialSize.height;
      
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

      const newImages = images.map((img, index) => {
        if (index === selectedImage) {
          const newX = resizeHandle.includes('w') ? img.x - (newWidth - initialSize.width) : img.x;
          const newY = resizeHandle.includes('n') ? img.y - (newHeight - initialSize.height) : img.y;
          return {
            ...img,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
          };
        }
        return img;
      });
      
      setImages(newImages);
      drawCanvas();
    } else if (isDragging && selectedImage !== null) {
      const newImages = images.map((img, index) => {
        if (index === selectedImage) {
          return {
            ...img,
            x: x - dragOffset.x,
            y: y - dragOffset.y
          };
        }
        return img;
      });
      
      setImages(newImages);
      drawCanvas();
    } else if (isDrawing) {
      setLinePoints(prev => [...prev, { x, y }]);
      drawCanvas();
    }
  };

  const stopDrawing = () => {
    if (isResizing) {
      saveToHistory(images);
      setIsResizing(false);
      setResizeHandle(null);
    } else if (isDrawing && linePoints.length > 1) {
      const currentLines = history[currentStep]?.lines || [];
      
      // Get highest z-index
      const maxZIndex = Math.max(
        ...images.map(img => img.zIndex || 0),
        ...currentLines.map(line => line.zIndex || 0),
        0
      );

      const newLines = [...currentLines, { 
        points: [...linePoints],
        zIndex: maxZIndex + 1
      }];
      
      saveToHistory(images, newLines);
      setLinePoints([]);
    } else if (isDragging) {
      saveToHistory(images);
    }
    
    setIsDrawing(false);
    setIsDragging(false);
    drawCanvas();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  // Update canvas cursor based on resize handles
  const handleMouseMove = (e) => {
    if (selectedImage !== null && !isResizing && !isDragging) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const handle = getResizeHandle(x, y, images[selectedImage]);
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

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="mb-2 flex items-center gap-2">
          <label 
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
            title="Upload JPG, PNG, or GIF image"
          >
            Upload Image
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            onClick={clearWhiteboard}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="Clear all content from whiteboard"
          >
            Clear Whiteboard
          </button>
          <button
            onClick={undo}
            disabled={currentStep <= 0}
            className={`px-4 py-2 text-white rounded transition-colors ${
              currentStep <= 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            title={`Undo last action (${navigator.platform.toLowerCase().includes('mac') ? '⌘Z' : 'Ctrl+Z'})`}
          >
            Undo
          </button>
          <button
            onClick={bringToFront}
            disabled={selectedImage === null}
            className={`px-4 py-2 text-white rounded transition-colors ${
              selectedImage === null ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            title="Bring selected image to front"
          >
            Bring to Front
          </button>
          <div
            className="ml-2 px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-600 cursor-help"
            title="Click and drag to move images • Draw anywhere else"
          >
            ?
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-400 rounded cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
    </div>
  );
};

export default Whiteboard;