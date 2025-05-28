
import React, { useEffect, useRef, useState } from 'react';
import { Terminal, ShieldCheck, Cpu, CircuitBoard, Lock, Trophy, Code, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; delay: number }> = ({ 
  icon, title, value, delay 
}) => {
  return (
    <Card className="glass-card border-white/20 bg-black/40 backdrop-blur-sm overflow-hidden group hover:border-white/40 transition-all duration-300"
      style={{ animationDelay: `${delay * 0.1}s` }}>
      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
        <div className="mb-2 text-cyber-blue/80 group-hover:text-cyber-blue transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-1 tracking-wider">{value}</h3>
        <p className="text-xs text-white/60 uppercase tracking-wider">{title}</p>
      </CardContent>
    </Card>
  );
};

const Hero: React.FC = () => {
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const fullText = "We are Team bi0s, a student-driven cybersecurity research group from Amrita Vishwa Vidyapeetham. We train the next generation of ethical hackers through hands-on learning, real-world challenges, and global competitions.";
  
  useEffect(() => {
    setDisplayText(""); // Reset before animation starts
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1)); // Ensure correct slicing
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  
    return () => clearInterval(interval);
  }, []);
  
  

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!floatingIconsRef.current) return;

      const icons = floatingIconsRef.current.querySelectorAll('.floating-icon');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      icons.forEach((icon, index) => {
        const depth = 1 - (index * 0.1);
        const moveX = mouseX * 40 * depth;
        const moveY = mouseY * 40 * depth;
        
        (icon as HTMLElement).style.transform = `translate(${moveX - 20}px, ${moveY - 20}px) scale(${0.8 + depth * 0.2})`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Background elements */}
      {/* <div ref={floatingIconsRef} className="absolute inset-0 overflow-hidden -z-10">
        <div className="floating-icon absolute top-[20%] right-[15%] text-white/5 animate-float">
          <ShieldCheck size={240} />
        </div>
        <div className="floating-icon absolute bottom-[30%] left-[15%] text-white/5 animate-float" style={{animationDelay: '-2s'}}>
          <Cpu size={200} />
        </div>
        <div className="floating-icon absolute top-[60%] right-[25%] text-white/5 animate-float" style={{animationDelay: '-4s'}}>
          < size={160} />
        </div>
        <div className="floating-icon absolute top-[10%] left-[25%] text-white/5 animate-float" style={{animationDelay: '-1s'}}>
          <CircuitBoard size={180} />
        </div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="terminal-window w-full min-h-[350px] mb-8">
            <div className="terminal-header">
              <div className="flex items-center space-x-2">
                <Terminal size={16} className="text-white mr-2" />
                <span className="text-xs text-white/70 font-mono">team_bi0s.exe</span>
              </div>
            </div>
            <div className="terminal-body">
              <p className="text-green-500 mb-2">$ <span className="text-white">whoami</span></p>
              <p className="text-white mb-4">team_bi0s@amrita:~# cybersecurity_experts</p>
              
              <p className="text-green-500 mb-2">$ <span className="text-white">cat mission.txt</span></p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Securing <span className="text-white animate-pulse">Tomorrow's</span> Cyberspace
              </h1>
              
              <p className="text-green-500 mb-2">$ <span className="text-white">./describe.sh</span></p>
              <p className="text-white/90 mb-8 font-mono text-sm md:text-base">
                {displayText}<span className="blink">_</span>
              </p>
              
              <p className="text-green-500 mb-4">$ <span className="text-white">./execute options</span></p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center h-10 px-4 py-2 border border-white/50 bg-white/5 hover:bg-white/10 text-white transition-all duration-300"
                >
                  &gt; learn_more.sh
                </Link>
                
                <a 
                  href="https://ctftime.org/team/662" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center h-10 px-4 py-2 border border-white/30 text-white/80 bg-transparent hover:bg-white/5 transition-all duration-300"
                >
                  &gt; view_achievements.sh
                </a>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 mt-8 animate-fade-up">
            <StatCard 
              icon={<Trophy size={28} />} 
              title="in India" 
              value="#1" 
              delay={0} 
            />
            <StatCard 
              icon={<Code size={28} />} 
              title="CVEs" 
              value="30+" 
              delay={1} 
            />
            <StatCard 
              icon={<Globe size={28} />} 
              title="Countries" 
              value="10+" 
              delay={2} 
            />
            <StatCard 
              icon={<Users size={28} />} 
              title="Alumni" 
              value="100+" 
              delay={3} 
            />
          </div>
          
          <div className="text-center mt-10">
            <div className="inline-flex items-center px-3 py-1 text-xs font-mono text-white bg-white/10 border border-white/20">
              <span className="inline-block w-2 h-2 mr-2 bg-white animate-pulse"></span>
              SINCE 2007 • INDIA'S PREMIER CYBERSECURITY TEAM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
