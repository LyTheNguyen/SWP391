import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [catPosition, setCatPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ dx: 3, dy: 3 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (isDragging) return;

      setCatPosition((prev) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        let newX = prev.x + velocity.dx;
        let newY = prev.y + velocity.dy;
        let newDx = velocity.dx;
        let newDy = velocity.dy;

        if (newX <= 0 || newX >= screenWidth - 100) {
          newDx = -newDx;
        }
        if (newY <= 0 || newY >= screenHeight - 100) {
          newDy = -newDy;
        }

        setVelocity({ dx: newDx, dy: newDy });

        return {
          x: Math.min(Math.max(newX, 0), screenWidth - 100),
          y: Math.min(Math.max(newY, 0), screenHeight - 100),
        };
      });
    }, 16);

    return () => clearInterval(moveInterval);
  }, [velocity, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const newX = Math.min(Math.max(e.clientX - 50, 0), screenWidth - 100);
    const newY = Math.min(Math.max(e.clientY - 50, 0), screenHeight - 100);

    setCatPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const newX = Math.min(Math.max(e.clientX - 50, 0), screenWidth - 100);
    const newY = Math.min(Math.max(e.clientY - 50, 0), screenHeight - 100);

    setCatPosition({ x: newX, y: newY });
  };

  return (
    <div
      className="container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Hình động */}
      <div className="plasma"></div>

      {/* Nội dung chính */}
      <h1 className="title">Hello World!</h1>
      <h2 className="time">⏰ {time.toLocaleTimeString()}</h2>
      <button className="button">
        <a href="https://chatgpt.com" className="button-link">
          Click here to ChatGPT
        </a>
      </button>

      {/* Con mèo */}
      <div
        className={`cat ${isDragging ? 'dragging' : ''}`}
        style={{
          left: `${catPosition.x}px`,
          top: `${catPosition.y}px`,
          transform: isDragging
            ? `scale(1.2)`
            : `rotate(${Math.atan2(velocity.dy, velocity.dx)}rad)`,
        }}
      ></div>
    </div>
  );
}

export default App;
