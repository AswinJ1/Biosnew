
import React, { useState, useEffect, useRef } from 'react';

interface CommandOutput {
    text?: string;  // ✅ Now `text` is optional
    element?: React.ReactNode;
  }
  

interface TerminalCommandProps {
  initialCommands?: Array<{command: string, output: CommandOutput[]}>;
  onCommandExecuted?: (command: string, output: CommandOutput[]) => void;
}

const TerminalCommand: React.FC<TerminalCommandProps> = ({ 
  initialCommands = [], 
  onCommandExecuted 
}) => {
  const [commandHistory, setCommandHistory] = useState<Array<{command: string, output: CommandOutput[]}>>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandIndex, setCommandIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Commands database
  const commands = {
    help: {
      description: "Display available commands",
      execute: () => {
        return [
          { text: "Available commands:" },
          { text: "  help         - Show this help message" },
          { text: "  clear        - Clear the terminal" },
          { text: "  whoami       - Display user information" },
          { text: "  ls           - List directory contents" },
          { text: "  cat <file>   - Display file contents" },
          { text: "  contact      - Show contact information" },
          { text: "  achievements - Display team achievements" },
          { text: "  history      - Show your recent CTF history" },
          { text: "  about        - About team bi0s" }
        ];
      }
    },
    clear: {
      description: "Clear the terminal",
      execute: () => {
        setCommandHistory([]);
        return [];
      }
    },
    whoami: {
      description: "Display user information",
      execute: () => {
        return [
          { text: "team_bi0s@amrita:~# cybersecurity_experts" },
          { text: "India's leading CTF team and cybersecurity research group" },
          { text: "Founded in 2007 at Amrita Vishwa Vidyapeetham" }
        ];
      }
    },
    ls: {
      description: "List directory contents",
      execute: () => {
        return [
          { text: "about.txt    contact.txt    achievements.txt" },
          { text: "mission.txt  team.txt       history.txt" }
        ];
      }
    },
    cat: {
      description: "Display file contents",
      execute: (args: string[]) => {
        const fileName = args[0];
        if (!fileName) {
          return [{ text: "Error: Please specify a file name" }];
        }
        
        switch (fileName) {
          case "mission.txt":
            return [
              { text: "-- MISSION STATEMENT --" },
              { text: "Securing Tomorrow's Cyberspace" },
              { text: "" },
              { text: "We are a team of passionate college students and cybersecurity enthusiasts dedicated to learning, researching, and innovating in the field of information security." }
            ];
          case "about.txt":
            return [
              { text: "-- ABOUT team bi0s --" },
              { text: "team bi0s is a community of college students focusing on cybersecurity research." },
              { text: "Founded in 2007 at Amrita University, the team has grown to be India's #1 CTF team." },
              { text: "We specialize in vulnerability research, exploitation, and defense strategies." }
            ];
          case "contact.txt":
            return [
              { text: "-- CONTACT INFORMATION --" },
              { text: "Email: contact@teambi0s.com" },
              { text: "Website: https://bi0s.in" },
              { text: "Twitter: @teambi0s" },
              { text: "GitHub: https://github.com/teambi0s" }
            ];
          case "achievements.txt":
            return [
              { text: "-- ACHIEVEMENTS --" },
              { text: "• #1 CTF team in India" },
              { text: "• 30+ CVEs reported" },
              { text: "• Represented India in DEFCON CTF finals" },
              { text: "• Qualified for multiple international CTF finals" },
              { text: "• 100+ alumni working in top cybersecurity positions globally" }
            ];
          case "team.txt":
            return [
              { text: "-- TEAM STRUCTURE --" },
              { text: "• Binary Exploitation" },
              { text: "• Web Security" },
              { text: "• Cryptography" },
              { text: "• Reverse Engineering" },
              { text: "• Forensics" },
              { text: "• Hardware Security" },
              { text: "• Machine Learning Security" }
            ];
          case "history.txt":
            return [
              { text: "-- RECENT CTF HISTORY --" },
              { text: "• Google CTF - Top 10" },
              { text: "• DEFCON CTF - Qualified for finals" },
              { text: "• PlaidCTF - Top 20" },
              { text: "• HITCON CTF - Top 15" },
              { text: "• Hack.lu CTF - Top 5" }
            ];
          default:
            return [{ text: `Error: File '${fileName}' not found` }];
        }
      }
    },
    contact: {
      description: "Show contact information",
      execute: () => {
        return [
          { text: "-- CONTACT INFORMATION --" },
          { text: "Email: contact@teambi0s.com" },
          { text: "Website: https://bi0s.in" },
          { text: "Twitter: @teambi0s" },
          { text: "GitHub: https://github.com/teambi0s" }
        ];
      }
    },
    achievements: {
      description: "Display team achievements",
      execute: () => {
        return [
          { text: "-- ACHIEVEMENTS --" },
          { text: "• #1 CTF team in India" },
          { text: "• 30+ CVEs reported" },
          { text: "• Represented India in DEFCON CTF finals" },
          { text: "• Qualified for multiple international CTF finals" },
          { text: "• 100+ alumni working in top cybersecurity positions globally" }
        ];
      }
    },
    history: {
      description: "Show your recent CTF history",
      execute: () => {
        return [
          { text: "-- RECENT CTF HISTORY --" },
          { text: "• Google CTF - Top 10" },
          { text: "• DEFCON CTF - Qualified for finals" },
          { text: "• PlaidCTF - Top 20" },
          { text: "• HITCON CTF - Top 15" },
          { text: "• Hack.lu CTF - Top 5" }
        ];
      }
    },
    about: {
      description: "About team bi0s",
      execute: () => {
        return [
          { text: "-- ABOUT team bi0s --" },
          { text: "team bi0s is a community of college students focusing on cybersecurity research." },
          { text: "Founded in 2007 at Amrita University, the team has grown to be India's #1 CTF team." },
          { text: "We specialize in vulnerability research, exploitation, and defense strategies." }
        ];
      }
    }
  };

  useEffect(() => {
    // Set initial commands if provided
    if (initialCommands.length > 0) {
      setCommandHistory(initialCommands);
    }
  }, [initialCommands]);

  useEffect(() => {
    // Scroll to bottom when command history updates
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commandHistory]);

  const executeCommand = (commandStr: string) => {
    const trimmedCommand = commandStr.trim();
    if (!trimmedCommand) return;

    const [cmd, ...args] = trimmedCommand.split(' ');
    let output: CommandOutput[] = [];

    // Check if command exists
    if (cmd in commands) {
      // @ts-ignore - Dynamic access
      output = commands[cmd].execute(args);
    } else {
      output = [{ text: `Command not found: ${cmd}. Type 'help' for available commands.` }];
    }

    // For clear command, we don't add to history
    if (cmd !== 'clear') {
      setCommandHistory(prev => [...prev, { command: trimmedCommand, output }]);
    }

    if (onCommandExecuted) {
      onCommandExecuted(trimmedCommand, output);
    }

    setInputValue("");
    setCommandIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevCmdIndex = Math.min(commandIndex + 1, commandHistory.length - 1);
      if (prevCmdIndex >= 0 && commandHistory.length > 0) {
        setCommandIndex(prevCmdIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - prevCmdIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextCmdIndex = Math.max(commandIndex - 1, -1);
      setCommandIndex(nextCmdIndex);
      if (nextCmdIndex >= 0) {
        setInputValue(commandHistory[commandHistory.length - 1 - nextCmdIndex].command);
      } else {
        setInputValue("");
      }
    } else if (e.key === 'Enter') {
      executeCommand(inputValue);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-content" onClick={focusInput}>
      <div className="terminal-history">
        {commandHistory.map((item, index) => (
          <div key={index} className="terminal-section">
            <div className="terminal-prompt">
              <span className="terminal-prompt-symbol">$</span>
              <span className="terminal-command">{item.command}</span>
            </div>
            {item.output.map((line, lineIndex) => (
              <div key={lineIndex} className="terminal-output">
                {line.element || line.text}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="terminal-prompt">
        <span className="terminal-prompt-symbol">$</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type a command (try 'help')"
          autoFocus
        />
      </div>
      
      <div ref={bottomRef} />
    </div>
  );
};

export default TerminalCommand;