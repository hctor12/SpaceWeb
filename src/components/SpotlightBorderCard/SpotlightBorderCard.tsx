import React, { useRef, useState } from 'react';

interface SpotlightBorderCardProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightBorderCard = ({ children, className = '' }: SpotlightBorderCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className='relative'>
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`rounded-xl p-6 transition-all duration-300 ${className}`}
      >
        {children}
      </div>
      <div
        ref={divRef}
        style={{
          border: '1px solid #4C9EE8',
          opacity,
          WebkitMaskImage: `radial-gradient(30% 60px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-10 rounded-xl transition-opacity duration-500'
      />
    </div>
  );
};

export default SpotlightBorderCard; 