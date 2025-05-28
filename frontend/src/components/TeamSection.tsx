
import React from 'react';
import { Shield, Code, Cpu } from 'lucide-react';
import { title } from 'process';

interface TeamCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ title, description, icon, index }) => {
  return (
    <div 
      className="glass-card p-6 animate-fade-up hover-lift"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="h-10 w-10 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const teams = [
  {
    title: "bi0s CTF",
    description: "The bi0s CTF team participates in various global CTFs throughout the year, and organizes various CTFs including the InCTFs. It has members specializing in Web Security, Reverse Engineering, Binary Exploitation, Cryptography, Forensics, Android etc.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "bi0s Hardware",
    description: "The bi0s Hardware specializes in hardware cyber security. Members of this team have expertise in Embedded Systems, Firmware Analysis, Wireless Security, Automotive Security, ICS/SCADA Security, Side Channel Analysis etc.",
    icon: <Cpu className="h-5 w-5" />
  },
  {
    title: "bi0s Pentest",
    description: "The bi0s Pentest team actively research on how to detect and exploit flaws in various networks, cloud appliances and web-based systems. With the main focus on penetration testing and boot2root type CTFs, we actively participate in bug-bounty programs for a real-time bug-hunting experience.",
    icon: <Code className="h-5 w-5" />
  },
  {
    title: "bi0s Open Source",
    description: "The bi0s Open Source team is dedicated to contributing to open-source security tools and collaborating on international cybersecurity research projects. The team has a strong focus on developing and maintaining open-source tools that benefit the cybersecurity community.",
    icon: <Code className="h-5 w-5" />
  },
  {
    title: "bi0s Web",
    description: "The bi0s Web team specializes in web application security. The team focuses on identifying vulnerabilities in web applications and developing secure coding practices.",
    icon: <Code className="h-5 w-5" />
  }
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-blue bg-cyber-blue/10 rounded-full">
            Our Teams
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Specialized Focus Areas</h2>
          <p className="text-foreground/70">
            We have specialized teams focusing on various areas in cybersecurity, each with its own unique expertise and focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <TeamCard
              key={index}
              title={team.title}
              description={team.description}
              icon={team.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
