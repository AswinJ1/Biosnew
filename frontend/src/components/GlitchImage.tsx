import React, { useEffect, useState, useRef } from 'react';
import { cn } from "@/lib/utils";

const GlitchImage = (props) => {
  const { src, alt, isVisible } = props;
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const glitchTimer = useRef(null);
  const intensityTimer = useRef(null);
  
  // Manage glitch effect lifecycle
  useEffect(() => {
    if (isVisible) {
      // Random glitch activation
      glitchTimer.current = setInterval(() => {
        setGlitchActive(prev => !prev);
        
        // Add random image displacement
        if (Math.random() > 0.7) {
          setOffsetX(Math.random() * 4 - 2);
          setOffsetY(Math.random() * 4 - 2);
        } else {
          setOffsetX(0);
          setOffsetY(0);
        }
      }, 150 + Math.random() * 250);
      
      // Vary glitch intensity
      intensityTimer.current = setInterval(() => {
        setGlitchIntensity(Math.random());
      }, 750);
      
      return () => {
        clearInterval(glitchTimer.current);
        clearInterval(intensityTimer.current);
      };
    } else {
      setGlitchActive(false);
      setGlitchIntensity(0);
      setOffsetX(0);
      setOffsetY(0);
    }
  }, [isVisible]);

  return (
    <div className={cn(
      "absolute right-4 top-1/2 transform -translate-y-1/2 z-20 transition-all duration-300",
      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
    )}>
      <div className={cn(
        "relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 overflow-hidden",
        "shadow-[0_0_15px_rgba(0,255,0,0.5)]",
        glitchActive && "animate-pulse"
      )}>
        {/* Base image */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translate(${offsetX}px, ${offsetY}px)`,
            transition: glitchActive ? 'none' : 'transform 0.3s ease'
          }}
        >
          <img 
            src={src} 
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* RGB channel splits */}
        {glitchActive && (
          <>
            {/* Red channel */}
            <div 
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{ 
                transform: `translate(${offsetX - 1.5}px, ${offsetY + 1}px)`,
                filter: 'brightness(1.2) contrast(1.3)'
              }}
            >
              <img 
                src={src} 
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'url(#redFilter)' }}
              />
            </div>
            
            {/* Blue channel */}
            <div 
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{ 
                transform: `translate(${offsetX + 1.5}px, ${offsetY - 1}px)`,
                filter: 'brightness(1.2) contrast(1.3)'
              }}
            >
              <img 
                src={src} 
                alt=""
                className="w-full h-full object-cover"
                style={{ filter: 'url(#blueFilter)' }}
              />
            </div>
          </>
        )}
        
        {/* Glitch overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b from-transparent to-[#00ff00]/20",
          glitchActive && "animate-pulse"
        )}></div>
        
        {/* Scan lines */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]"></div> */}
        
        {/* Green overlay */}
        {/* <div className={cn(
          "absolute inset-0 bg-[#00ff00] mix-blend-screen",
          glitchActive ? `opacity-${Math.round(glitchIntensity * 50)}` : "opacity-30"
        )}></div> */}
        
        {/* Noise texture */}
        {glitchActive && (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1IiBkPSJNMCAwaDMwMHYzMDBIMHoiLz48L3N2Zz4=')] bg-repeat opacity-20 mix-blend-overlay"></div>
        )}
      </div>
      
      {/* SVG filters for RGB split effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="redFilter">
          <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
        </filter>
        <filter id="blueFilter">
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 1 0"/>
        </filter>
      </svg>
    </div>
  );
};

export default GlitchImage;