
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import WhoWeAre from '@/components/WhoWeAre';
import Perks from '@/components/Perks';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/MatrixRain';
import ThreeDCube from '@/components/ThreeDCube';

const Index: React.FC = () => {
  useEffect(() => {
    // This effect creates the scan line animation
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    document.body.appendChild(scanLine);

    return () => {
      document.body.removeChild(scanLine);
    };
  }, []);

  return (
    <motion.main 
      className="min-h-screen cyber-noise relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements */}
      <div className="cyber-grid absolute inset-0 pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 pointer-events-none z-0">
        <MatrixRain />
      </div>
      
      {/* Decorative 3D elements */}
      <div className="hidden lg:block absolute top-[15%] right-[5%] z-0 opacity-70">
        <ThreeDCube />
      </div>
      <div className="hidden lg:block absolute bottom-[20%] left-[5%] z-0 opacity-70">
        <ThreeDCube />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <WhoWeAre />
        <Features />
        <Perks />
        <Testimonials />
        <Footer />
      </div>
      
      {/* Cyberpunk grid lines */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,102,0.1),transparent)]"></div>
    </motion.main>
  );
};

export default Index;
