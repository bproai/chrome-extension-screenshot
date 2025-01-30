import React, { useEffect, useRef, useState } from 'react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

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
          const url = URL.createObjectURL(blob);
          const img = new Image();
          
          img.onload = () => {
            // Get the current context since it might have changed
            const currentCtx = canvasRef.current.getContext('2d');
            if (!currentCtx) return;

            // Calculate dimensions to fit the image while maintaining aspect ratio
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

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="bg-white rounded-lg shadow-lg p-2">
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