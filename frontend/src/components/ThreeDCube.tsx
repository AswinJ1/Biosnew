
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ThreeDCubeProps {
  className?: string;
}

const ThreeDCube: React.FC<ThreeDCubeProps> = ({ className }) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    
    let rotationX = 0;
    let rotationY = 0;
    let animationId: number;
    
    const animate = () => {
      rotationX += 0.2;
      rotationY += 0.3;
      
      if (cube) {
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className={`perspective-container ${className || ''}`}>
      <div 
        ref={cubeRef}
        className="relative w-40 h-40 transform-style-3d transition-transform duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div className="absolute inset-0 border-2 border-primary/50 bg-black/30 backdrop-blur-sm"
          style={{ transform: 'translateZ(20px)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-mono text-xs">team_bi0s</span>
          </div>
        </div>
        
        {/* Back face */}
        <div className="absolute inset-0 border-2 border-primary/50 bg-black/30 backdrop-blur-sm"
          style={{ transform: 'translateZ(-20px) rotateY(180deg)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-mono text-xs">team_bi0s</span>
          </div>
        </div>
        
        {/* Left face */}
        <div className="absolute inset-0 border-2 border-primary/50 bg-black/30 backdrop-blur-sm"
          style={{ transform: 'translateX(-20px) rotateY(-90deg)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-mono text-xs">team_bi0s</span>
          </div>
        </div>
        
        {/* Right face */}
        <div className="absolute inset-0 border-2 border-primary/50 bg-black/30 backdrop-blur-sm"
          style={{ transform: 'translateX(20px) rotateY(90deg)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-mono text-xs">team_bi0s</span>
          </div>
        </div>
        
        {/* Top face */}
        <div className="absolute inset-0 border-2 border-primary/50 bg-black/30 backdrop-blur-sm"
          style={{ transform: 'translateY(-20px) rotateX(90deg)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-mono text-xs">team_bi0s</span>
          </div>
        </div>
        
        {/* Bottom face */}
        <div className="absolute inset-0 border-2 border-primary/50 bg-black/30 backdrop-blur-sm"
          style={{ transform: 'translateY(20px) rotateX(-90deg)' }}>
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-primary font-mono text-xs">team_bi0s</span>
          </div>
        </div>
        
        {/* Glowing edges */}
        <div className="absolute inset-0 opacity-20 animate-glow-pulse"
          style={{ 
            transform: 'scale(1.05)',
            background: 'transparent',
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.7), inset 0 0 15px rgba(0, 255, 255, 0.7)',
            transformStyle: 'preserve-3d'
          }}>
        </div>
      </div>
    </div>
  );
};

export default ThreeDCube;
