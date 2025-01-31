import React, { useEffect, useRef, useState } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const handleImageFile = (file) => {
    if (!file.type.match('image/(jpeg|png|gif)')) {
      alert('Please upload a valid image file (JPG, PNG, or GIF)');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    
    img.onload = () => {
      const currentCtx = canvasRef.current.getContext('2d');
      if (!currentCtx) return;

      const canvas = canvasRef.current;
      const scale = Math.min(
        (canvas.width - 20) / img.width,
        (canvas.height - 20) / img.height
      );
      
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (canvas.width - width) / 2;
      const y = (canvas.height - height) / 2;
      
      currentCtx.drawImage(img, x, y, width, height);
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the entire canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reset drawing settings
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    // Use more of the available space
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;
    
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    // Set white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    setContext(ctx);

    // Handle paste events
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
    
    // Handle window resize
    const handleResize = () => {
      const currentCtx = canvasRef.current.getContext('2d');
      if (!currentCtx) return;

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
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

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    setIsDrawing(true);
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing || !context) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
    
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <div className="mb-2 flex items-center gap-2">
          <label className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors">
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
          >
            Clear Whiteboard
          </button>
          <span className="text-sm text-gray-600">
            Supports JPG, PNG, GIF
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-400 rounded cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
    </div>
  );
};

export default Whiteboard;