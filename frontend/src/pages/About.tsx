import React from 'react';
import { Shield, Users, Lightbulb, GraduationCap, Zap, Award, Code, Cpu, Trophy } from 'lucide-react';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import MatrixRain from '@/components/MatrixRain';
import ThreeDCube from '@/components/ThreeDCube';
import Testimonials from '@/components/Testimonials';
import WhoWeAre from '@/components/WhoWeAre';
import {  Globe } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Team from '@/components/AreaFocus';
import AreaFocus from '@/components/AreaFocus';


gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string | string[];
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="cyber-card p-1"
    >
      <Card className="bg-transparent border-none overflow-hidden relative group">
        <CardContent className="p-6 z-10 relative">
          {/* Simplified icon without animation */}
          <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4">
            {icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-4 text-cyber-blue">
            {title}
          </h3>

          {/* Rest of the content */}
          {Array.isArray(description) ? (
            <ul className="space-y-4">
              {description.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-foreground/70 flex items-start gap-2"
                >
                  <span className="text-cyber-blue mt-1">›</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-foreground/70">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Update the "What Makes Us Different" section
const differenceItems = [
  {
    icon: <Users className="h-5 w-5" />,
    title: "Student-Driven Excellence",
    desc: "Operated entirely by students with expert mentorship"
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Global Recognition",
    desc: "Consistent top rankings in international CTFs"
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Research-First Approach",
    desc: "In-depth research across multiple cybersecurity domains"
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Community-Oriented",
    desc: "Active in outreach, education, and open collaboration"
  }
].map((item, index) => (
  <motion.div 
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-4 rounded-lg bg-cyber-blue/5 hover:bg-cyber-blue/10 
      transition-colors duration-300 flex items-start gap-3"
    data-animate="difference-item"
  >
    <div className="text-cyber-blue">
      {item.icon}
    </div>
    <div>
      <h4 className="text-sm font-semibold text-cyber-blue mb-2">{item.title}</h4>
      <p className="text-sm text-foreground/70">{item.desc}</p>
    </div>
  </motion.div>
));

const About: React.FC = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".vision-card",
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate Vision card first
    tl.from(".vision-card", {
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: "power2.out"
    });

    // Then animate Mission card
    tl.from(".mission-card", {
      opacity: 0,
      x: 50,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

    // Then animate Difference card
    tl.from(".difference-card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3");

    // Finally animate difference items
    tl.from("[data-animate='difference-item']", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Recognition section animations with better trigger settings
    const recognitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".recognition-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none", // Changed to prevent reverting
        once: true // Ensures animation plays only once
      }
    });

    recognitionTl
      .from(".recognition-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
      })
      .from(".recognition-card", {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.4");

  }, []);

  return (
    <motion.main className="min-h-screen cyber-noise pt-32" >
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
      
     
      
     
      {/* <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-transparent dark:from-cyber-dark/50 -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 mb-6 text-xs font-medium text-cyber-blue bg-cyber-blue/10 rounded-full">
              <span className="inline-block w-2 h-2 mr-2 rounded-full bg-cyber-blue animate-pulse"></span>
              Established in 2007
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Team bi0s</h1>
            
            <p className="text-lg text-foreground/80 mb-8">
              Team bi0s is a cyber-security enthusiast club and research group from Amrita Vishwa Vidyapeetham (University), India.
            </p>
          </div>
        </div>
      </section> */}
      
      {/* History section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <div className="glass-card p-8 border-white/20 hover:border-cyber-blue/30 transition-all duration-300 hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center">
                  <Shield className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Our History</h2>
              </div>
              
              <p className="text-foreground/80 mb-4">
              Team bi0s is India’s first and most accomplished student-run cybersecurity research group.
              </p>
              
              <p className="text-foreground/80 mb-4">
                It was among the first CTF teams from India, and ever-since has been spearheading CTFs in the country - from starting InCTF, India's First CTF and consistently ranking No.1 in CTFTime since it was established.
              </p>
              
              <p className="text-foreground/80">
                Over the years, the team has evolved into a cyber-security research group, with specialized teams in 10+ cyber-security focus areas.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* How we function section */}
      {/* <section className="py-16 bg-cyber-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-blue bg-cyber-blue/10 rounded-full">
                <span className="inline-block w-2 h-2 mr-2 rounded-full bg-cyber-blue animate-pulse"></span>
                Our Approach
              </div>
              <h2 className="text-3xl font-bold mb-4">How We Function</h2>
              <p className="text-foreground/70">
                Our unique mentorship model and team structure
              </p>
            </div>
            
            <div className="glass-card p-8 animate-fade-up border-white/20 hover:border-cyber-blue/30 transition-all duration-300 hover-lift">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">The bi0s Family</h3>
              </div>
              
              <p className="text-foreground/80 mb-6">
                The team functions as a family, and uses a mentor mentee model wherein senior students train and pass on experience & skills they gained to their junior mentees.
              </p>
              
              <p className="text-foreground/80">
                This happens through out their years at the community, and is facilitated through various activities the club organizes & events and contests it participates as a team.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      
      {/* What we do section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-blue bg-cyber-blue/10 rounded-full">
                <span className="inline-block w-2 h-2 mr-2 rounded-full bg-cyber-blue animate-pulse"></span>
                Our Activities
              </div>
              <h2 className="text-3xl font-bold mb-4">What We Do</h2>
              <p className="text-foreground/70">
                Our activities and areas of focus
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20" style={{animationDelay: '0.1s'}}>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="h-10 w-10 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Research & Learning</h3>
                <p className="text-foreground/70">Learning & researching on various Cyber Security fields</p>
              </div>
              
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20" style={{animationDelay: '0.2s'}}>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="h-10 w-10 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">CTF Competitions</h3>
                <p className="text-foreground/70">Participating & organizing CTFs across the world</p>
              </div>
              
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20" style={{animationDelay: '0.3s'}}>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="h-10 w-10 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Training Programs</h3>
                <p className="text-foreground/70">Organizing workshops & training programmes</p>
              </div>
              
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20" style={{animationDelay: '0.4s'}}>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="h-10 w-10 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4 group-hover:animate-pulse">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Open Source Contributions</h3>
                <p className="text-foreground/70">Contributing to open-source security tools</p>
              </div>
            </div>
            
            <div className="mt-6 animate-fade-up" style={{animationDelay: '0.5s'}}>
              <div className="glass-card p-6 border-white/20 hover:border-cyber-blue/30 transition-all duration-300 hover-lift">
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-cyber-blue flex-shrink-0 mt-0.5 rounded-full bg-cyber-blue/10 flex items-center justify-center text-xs">•</div>
                    <span>Designing and testing hardware security modules</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-cyber-blue flex-shrink-0 mt-0.5 rounded-full bg-cyber-blue/10 flex items-center justify-center text-xs">•</div>
                    <span>Collaborating in international cyber-security research projects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-cyber-blue flex-shrink-0 mt-0.5 rounded-full bg-cyber-blue/10 flex items-center justify-center text-xs">•</div>
                    <span>Penetration testing, bug-bounty hunting & submitting CVEs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-cyber-blue flex-shrink-0 mt-0.5 rounded-full bg-cyber-blue/10 flex items-center justify-center text-xs">•</div>
                    <span>Providing Cyber Security Consultancy Services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Teams section */}
      {/* <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-up">
              <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-blue bg-cyber-blue/10 rounded-full">
                <span className="inline-block w-2 h-2 mr-2 rounded-full bg-cyber-blue animate-pulse"></span>
                Team Structure
              </div>
              <h2 className="text-3xl font-bold mb-4">Our Teams</h2>
              <p className="text-foreground/70">
                We have specialized teams focusing on various areas in cyber-security
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center group-hover:animate-pulse">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">bi0s CTF</h3>
                </div>
                <p className="text-foreground/70">
                  The bi0s CTF team participates in various global CTFs throughout the year, and organizes various CTFs including the InCTFs. It has members specializing in Web Security, Reverse Engineering, Binary Exploitation, Cryptography, Forensics, Android etc.
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20" style={{animationDelay: '0.1s'}}>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center group-hover:animate-pulse">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">bi0s Hardware</h3>
                </div>
                <p className="text-foreground/70">
                  The bi0s Hardware specializes in hardware cyber security. Members of this team have expertise in Embedded Systems, Firmware Analysis, Wireless Security, Automotive Security, ICS/SCADA Security, Side Channel Analysis etc.
                </p>
              </div>
              
              <div className="glass-card p-6 animate-fade-up group hover:border-cyber-blue/30 transition-all duration-300 hover-lift relative overflow-hidden border border-white/20" style={{animationDelay: '0.2s'}}>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center group-hover:animate-pulse">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">bi0s Pentest</h3>
                </div>
                <p className="text-foreground/70">
                  The bi0s Pentest team actively research on how to detect and exploit flaws in various networks, cloud appliances and web-based systems. With the main focus on penetration testing and boot2root type CTFs, we actively participate in bug-bounty programs for a real-time bug-hunting experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      
     
      <WhoWeAre/>
         <div className="mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Vision Card - Takes full width in first row */}
            <div className="vision-card md:col-span-2">
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Our Vision"
                description="To build a generation of ethical hackers and cybersecurity professionals who solve real-world problems and defend the digital future."
                delay={0}
              />
            </div>

            {/* Mission Card - Takes 1/3 width */}
            <div className="mission-card row-span-2">
              <FeatureCard
                icon={<Code className="h-6 w-6" />}
                title="Our Mission"
                description={[
                  "Train and mentor students in advanced cybersecurity skills",
                  "Conduct original research in offensive and defensive security",
                  "Compete and excel in global cybersecurity competitions",
                  "Share knowledge with the wider community"
                ]}
                delay={1}
              />
            </div>

            {/* What Makes Us Different Card - Takes 2/3 width below Vision */}
            <div className="difference-card md:col-span-2" data-animate="difference-card">
              <Card className="glass-card border-white/20 bg-black/40 backdrop-blur-sm overflow-hidden 
                hover:border-cyber-blue/40 transition-all duration-500 hover-lift relative group h-full">
                <CardContent className="p-6 z-10 relative">
                  <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4 group-hover:animate-pulse">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">What Makes Us Different</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Student-Driven Excellence",
                        desc: "Operated entirely by students with expert mentorship"
                      },
                      {
                        title: "Global Recognition",
                        desc: "Consistent top rankings in international CTFs"
                      },
                      {
                        title: "Research-First Approach",
                        desc: "In-depth research across multiple cybersecurity domains"
                      },
                      {
                        title: "Community-Oriented",
                        desc: "Active in outreach, education, and open collaboration"
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-cyber-blue/5 hover:bg-cyber-blue/10 transition-colors duration-300"
                        data-animate="difference-item"
                      >
                        <h4 className="text-sm font-semibold text-cyber-blue mb-2">{item.title}</h4>
                        <p className="text-sm text-foreground/70">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <AreaFocus/>


<section className="recognition-section py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-blue bg-cyber-blue/10 rounded-full">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-blue animate-pulse"></span>
          <span>our achievements</span>
        </div>
        <h2 className="text-3xl font-bold mb-4">Recognition & Impact</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Trophy className="h-6 w-6" />,
            title: "Global Rankings",
            desc: "Ranked consistently among top global CTF teams",
            delay: 0
          },
          {
            icon: <Users className="h-6 w-6" />,
            title: "Alumni Success",
            desc: "Alumni working at Google, Synack, Zscaler, Citrix, NCC Group, and more",
            delay: 0.2
          },
          {
            icon: <Award className="h-6 w-6" />,
            title: "Flagship Events",
            desc: "Hosted flagship events like InCTF, India's first CTF for high school and college students",
            delay: 0.4
          }
        ].map((item, index) => (
          <div 
            key={index}
            className="glass-card p-6 border-white/20 hover:border-cyber-blue/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-cyber-blue">{item.title}</h3>
                <p className="text-foreground/70">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
     
        
      <Testimonials/>

      <Footer />
    </motion.main>
  );
};

export default About;
