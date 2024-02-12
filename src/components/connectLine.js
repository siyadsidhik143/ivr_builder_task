import React, { useEffect, useRef } from 'react';

const LineConnector = ({ x1, y1, x2, y2 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const offsetX = rect.left + window.scrollX;
    const offsetY = rect.top + window.scrollY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(x1 - offsetX, y1 - offsetY);
    ctx.lineTo(x2 - offsetX, y2 - offsetY);
    ctx.stroke();
  }, [x1, y1, x2, y2]);

  return <canvas ref={canvasRef} 
    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} 
    width={window.innerWidth} 
    height={window.innerHeight} 
  />;
};

export default LineConnector;
