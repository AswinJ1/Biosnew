
import React from 'react';
import { Shield, Globe, Code } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <Card 
      className="glass-card border-white/20 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-cyber-blue/40 transition-all duration-500 hover-lift relative group"
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      <CardContent className="p-6 z-10 relative">
        <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4 group-hover:animate-pulse">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  );
};

const WhoWeAre: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 rounded-full">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="typing-animation blink">who we are ?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Identity</h2>
          <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
            Team bi0s is a cyber-security enthusiast club and research group from Amrita Vishwa Vidyapeetham, India. 
            Since 2007, we've evolved from India's first CTF team into a comprehensive security research group 
            with specialized teams across numerous cyber-security domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up">
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Pioneering CTF"
            description="India's first CTF team, consistently ranked #1 in CTFTime rankings nationwide"
            delay={0}
          />
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="Security Research"
            description="Specialized teams focused on cutting-edge research across multiple domains"
            delay={1}
          />
          <FeatureCard
            icon={<Globe className="h-6 w-6" />}
            title="Global Impact"
            description="Creating an international footprint through workshops, training and competitions"
            delay={2}
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
