
import React from 'react';
import { 
  Shield, Code, Users, Zap, Globe, GraduationCap, 
  Cpu, Network, Workflow, Bug, Award, BookOpen
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const whatWeDo = [
  {
    title: "Cybersecurity Training ",
    content: "Hands-on mentorship to build real-world ethical hacking skills."
  },
  {
    title: "CTF Competitions",
    content: "Competing globally in Capture The Flag contests with top rankings."
  },
  {
    title: "Security Research",
    content: "Original research in hardware, reverse engineering, and application security."
  },
  {
    title: "Technical Development",
    content: "Building secure infrastructure and custom internal tools."
  }
  // {
  //   title: "Community Outreach",
  //   content: "Hosting workshops, talks, and InCTF to spread cybersecurity awareness."
  // },
  // {
  //   title: "International Collaborations",
  //   content: "We collaborate with international researchers on cybersecurity projects, expanding our knowledge and global impact."
  // },
  // {
  //   title: "Penetration Testing",
  //   content: "We conduct penetration testing, participate in bug-bounty programs, and submit CVEs to help secure digital infrastructure."
  // },
  // {
  //   title: "Security Consultancy",
  //   content: "We provide cybersecurity consultancy services to organizations, helping them secure their systems and data."
  // }
];
const playSound = () => {
  const sound = new Audio("/sounds/clickaccordion.mp3");
  sound.play().catch(error => console.error("Audio playback error:", error));
};



interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="glass-card p-6 hover-lift"
      style={{ animationDelay: `${delay * 0}s` }}
    >
      <div className="h-12 w-12 rounded-lg bg-cyber-blue/10 text-cyber-blue flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

const specialties = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "CTF Team",
    description: "Participates in global CTFs with expertise in Web Security, Reverse Engineering, Binary Exploitation, Cryptography and more."
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Hardware Security",
    description: "Specializes in embedded systems, firmware analysis, wireless security, automotive security, and side channel analysis."
  },
  {
    icon: <Bug className="h-6 w-6" />,
    title: "Penetration Testing",
    description: "Researches network vulnerabilities, cloud security, and web system exploits, participating in bug bounty programs."
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Open Source",
    description: "Contributes to open-source security tools and collaborates on international cybersecurity research projects."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Mentorship",
    description: "Senior students train and mentor juniors in a family-like environment, passing down experience and skills."
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Training Programs",
    description: "Organizes workshops, training programs and events to build cybersecurity skills and awareness."
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        

        <div className="max-w-3xl mx-auto animate-fade-up">
          <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 rounded-full">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="typing-animation blink text-lg">What we do ?</span>
          </div>
          </div>

          <div className="glass-card border-white/20 p-1 md:p-2">
            <Accordion type="single" collapsible className="w-full">
              {whatWeDo.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                  <AccordionTrigger className="text-white py-4 px-2 hover:no-underline hover:bg-white/5 transition-colors" onClick={playSound}>
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 px-2">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
