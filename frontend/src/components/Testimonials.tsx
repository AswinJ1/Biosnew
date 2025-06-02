
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Quote, MessageCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '@/utils/useSound';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const testimonials = [
  {
    quote: "Freshers from Amrita are better than experienced people I have hired from outside. 8 out of 12 people in the security team are Amrita alumni.",
    author: "Senior Manager",
    role: "Product Security, VMware",
    image: "/no.png"
  },
  {
    quote: "I can vouch for their superior technical skills, dedication and enthusiasm. The training they receive is excellent.",
    author: "InfoSec Investigator",
    role: "Cisco",
    image: "/no.png"
  },
  {
    quote: "I am very happy with their performance, especially level of understanding in cyber security.",
    author: "Divyanshu Verma",
    role: "Sr. Manager, Intel R&D, Bengaluru",
    image: "/divyanshu.jpeg"
  },
  {
    quote: "The candidates from Amrita demonstrate exceptional problem-solving abilities and a deep understanding of security concepts.",
    author: "Technical Lead",
    role: "Major Tech Company",
    image: "/no.png"
  }
];

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, author, role, image }) => {
  return (
    <div className="glass-card border-white/10 bg-black/30 backdrop-blur-xl p-8 h-full relative overflow-hidden hover:border-cyber-green/40 transition-all duration-500 hover-lift group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <Quote className="absolute top-6 right-6 text-cyber-green/10 h-20 w-20 rotate-180" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-cyber-green text-cyber-green" />
          ))}
        </div>
        
        <p className="text-foreground/90 mb-8 text-lg italic leading-relaxed group-hover:text-white transition-colors">"{quote}"</p>
        
        <div className="mt-auto flex items-center">
          {image && (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-cyber-green/20 mr-4 border border-cyber-green/40">
              <div className="w-full h-full bg-gradient-to-br from-black/20 to-black/80">
              <img src={image} alt={author} className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <div>
            <p className="font-semibold text-lg group-hover:text-cyber-green transition-colors">{author}</p>
            <p className="text-foreground/70 text-sm">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
 
  
  const headerY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const sounds = {
    click: new Audio('/sounds/mouse_click.mp3'),
    hover: new Audio('/sounds/mouse_over.mp3'),
  };
  
  const playSound = (type: 'click' | 'hover') => {
    if (sounds[type]) {
      sounds[type].currentTime = 0; // Reset sound to start
      sounds[type].play().catch(error => console.error("Audio playback error:", error));
    }
  };
  
  
  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-green/2 cyber-grid z-0"></div>
      
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 rounded-full">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="typing-animation blink">Testimonials_</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">What Recruiters Say</h2>
          <p className="text-foreground/70">
            Industry professionals recognize the quality and expertise of our team members.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto perspective-container">
          <Carousel 
            className="w-full"
            onMouseEnter={() => playSound('hover')}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      role={testimonial.role}
                      image={testimonial.image}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious 
              onClick={() => playSound('click')}
              className="left-2 bg-black/50 border border-cyber-green/30 hover:bg-black/80 hover:border-cyber-green/50 text-cyber-green"
            />
            <CarouselNext 
              onClick={() => playSound('click')}
              className="right-2 bg-black/50 border border-cyber-green/30 hover:bg-black/80 hover:border-cyber-green/50 text-cyber-green"
            />
          </Carousel>
        </div>

        <div className="flex justify-center mt-10">
          <MessageCircle className="h-6 w-6 text-cyber-green/40 animate-pulse" />
        </div>
      </motion.div>
      
      {/* Parallax Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 h-24 w-24 rounded-full bg-cyber-green/5 blur-xl"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 h-32 w-32 rounded-full bg-white/5 blur-xl"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 h-16 w-16 rounded-full bg-cyber-green/5 blur-lg"
          animate={{ 
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default Testimonials;
