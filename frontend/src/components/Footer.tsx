
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-blue/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-cyber-blue font-semibold mb-4">
              <Shield className="h-6 w-6" />
              <span className="text-xl font-display">Team bi0s</span>
            </div>
            <p className="text-foreground/70 mb-4">
              India's Premier CTF Team and Cybersecurity Research Group from Amrita Vishwa Vidyapeetham.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/teambi0s" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/teambi0s" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/teambi0s" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:team@bi0s.in" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="https://ctftime.org/team/662" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-cyber-blue transition-colors">
                  CTF Team
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Teams</h3>
            <ul className="space-y-2">
              <li className="text-foreground/70 hover:text-cyber-blue transition-colors">bi0s CTF</li>
              <li className="text-foreground/70 hover:text-cyber-blue transition-colors">bi0s Hardware</li>
              <li className="text-foreground/70 hover:text-cyber-blue transition-colors">bi0s Pentest</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-foreground/70 mb-2">
              Amrita Vishwa Vidyapeetham <br />
              Amritapuri, Kerala, India
            </p>
            <a href="mailto:team@bi0s.in" className="text-cyber-blue hover:underline">
              team@bi0s.in
            </a>
          </div>
        </div>
        
        <div className="border-t border-foreground/10 pt-8">
          <p className="text-center text-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Team bi0s. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
