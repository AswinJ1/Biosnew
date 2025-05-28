
import React from 'react';
import { Briefcase, Award, GraduationCap, ExternalLink } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { motion } from "framer-motion";

const Perks: React.FC = () => {
  // Company logos with names and simulated logos using text
  const companies = [
    { name: 'Google', icon: "/google.png" },
    { name: 'Amazon', icon: '/amazon.jpg' },
    { name: 'VMWare', icon: '/vmware.png' },
    { name: 'FireEye', icon: '/fireeye.png' },
    { name: 'Okta', icon: '/okta.png' },
    { name: 'Synack', icon: '/synack.webp' }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 rounded-full">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="typing-animation blink text-lg">Our Alumni Work At</span>
          </div>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Our alumni are shaping the future of cybersecurity across the globe. From tech giants to cutting-edge security firms, their success reflects the quality of training and experience at bi0s.
          <br/><br />
            {/* <span className="text-cyber-blue font-semibold">NASSCOM predicts over a million job vacancies in cybersecurity</span> - 
            one of the hottest fields in computer science today. */}
          </p>
           <span className="text-cyber-blue font-semibold"> You’ll find bi0s alumni at:</span>
         
        </div>

        <div className="mt-16 overflow-hidden">
          
          <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
            <CarouselContent className="animate-marquee">
              {Array.from({ length: 3 }).flatMap((_, i) => 
                companies.map((company, index) => (
                  <CarouselItem key={`${i}-${index}`} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                    <div className="glass-card flex items-center justify-center h-16 md:h-20 transition-all duration-300 hover:border-cyber-blue/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group overflow-hidden relative border border-white/20 bg-black/40">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={company.icon} alt={company.name} className="h-full w-full object-contain" />
                      </div>

                        <span className="text-lg font-bold">{company.name}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Perks;
