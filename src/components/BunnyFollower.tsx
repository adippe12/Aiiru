import React, { useState, useEffect, useRef } from 'react';

const URLS = {
  IDLE: 'https://raw.githubusercontent.com/adippe12/aiiruData/refs/heads/main/BunnyIdle.gif',
  RUN: 'https://raw.githubusercontent.com/adippe12/aiiruData/refs/heads/main/BunnyRun.gif',
  SLEEP: 'https://raw.githubusercontent.com/adippe12/aiiruData/refs/heads/main/BunnySleep.gif'
};

const SPEED = 0.04; 
const STOP_THRESHOLD = 5.0;
const SLEEP_DELAY = 5000;

// Offsets to position the bunny relative to the cursor
// Negative X moves Left, Negative Y moves Up
const OFFSET_X = -5; 
const OFFSET_Y = -15;

export default function BunnyFollower() {
  const [bunnyPos, setBunnyPos] = useState({ x: -100, y: -100 });
  const [facingRight, setFacingRight] = useState(true);
  const [currentImage, setCurrentImage] = useState(URLS.IDLE);
  
  const mouseRef = useRef({ x: typeof window !== 'undefined' ? 0 : 0, y: typeof window !== 'undefined' ? window.innerHeight : 0 });
  const bunnyRef = useRef({ x: typeof window !== 'undefined' ? 0 : 0, y: typeof window !== 'undefined' ? window.innerHeight : 0 });
  const lastMoveTimeRef = useRef(Date.now());
  const isMovingRef = useRef(false);
  const isSleepingRef = useRef(false);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Preload images
    Object.values(URLS).forEach(url => {
      const img = new Image();
      img.src = url;
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTimeRef.current = Date.now();
      isSleepingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Calculate the target position with the offset applied
      const targetX = mouseRef.current.x + OFFSET_X;
      const targetY = mouseRef.current.y + OFFSET_Y;

      // Calculate distance between current bunny pos and TARGET pos
      const dx = targetX - bunnyRef.current.x;
      const dy = targetY - bunnyRef.current.y;
      
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > STOP_THRESHOLD) {
        isMovingRef.current = true;
        
        bunnyRef.current.x += dx * SPEED;
        bunnyRef.current.y += dy * SPEED;

        if (Math.abs(dx) > 1) {
          setFacingRight(dx > 0);
        }
      } else {
        isMovingRef.current = false;
        if (Date.now() - lastMoveTimeRef.current > SLEEP_DELAY) {
          isSleepingRef.current = true;
        }
      }

      setBunnyPos({ x: bunnyRef.current.x, y: bunnyRef.current.y });

      if (isMovingRef.current) {
        setCurrentImage(URLS.RUN);
      } else if (isSleepingRef.current) {
        setCurrentImage(URLS.SLEEP);
      } else {
        setCurrentImage(URLS.IDLE);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (bunnyPos.x === -100 && bunnyPos.y === -100) return null;

  return (
    <img
      src={currentImage}
      alt="Bunny Cursor"
      className="fixed z-[9999] pointer-events-none w-16 h-auto"
      style={{
        // The -32 centers the image on the calculated coordinates.
        // The coordinates themselves are now offset from the mouse.
        left: bunnyPos.x - 32 + 'px',
        top: bunnyPos.y - 32 + 'px',
        transform: `scaleX(${facingRight ? 1 : -1})`,
        imageRendering: 'pixelated',
        transformOrigin: 'center center',
        willChange: 'left, top, transform'
      }}
    />
  );
}