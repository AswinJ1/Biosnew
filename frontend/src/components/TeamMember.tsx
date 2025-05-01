import React from "react";
import { cn } from "@/lib/utils";
import GlitchImage from "./GlitchImage";

interface TeamMemberProps {
  member: {
    id: number;
    name: string;
    title: string;
    image: string;
    description?: string;
  };
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const TeamMember = ({ 
  member, 
  isSelected, 
  onMouseEnter, 
  onMouseLeave,
  onClick 
}: TeamMemberProps) => {
  return (
    <div 
      className={cn(
        "cursor-pointer transition-all duration-300 py-3 px-4 relative",
        isSelected ? 
          "bg-[#00ff0022] text-[#00ff00] border-l-2 border-[#00ff00] transform scale-[1.02]" : 
          "text-[#00ff00]/70 hover:bg-[#00ff0011]"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex items-center">
        <span className={cn(
          "text-sm mr-2 font-mono transition-transform duration-300",
          isSelected && "transform scale-110"
        )}>›</span>
        <span className="font-medium text-lg font-mono">{member.name}</span>
      </div>
      <div className="font-mono text-xs text-[#00ff00]/60 pl-5">
        {member.title}
      </div>
      
      {/* Conditionally show the glitch image */}
      {member.image && (
        <GlitchImage 
          src={member.image || "/placeholder.svg"}
          alt={`${member.name}'s profile`}
          isVisible={isSelected}
        />
      )}
    </div>
  );
};

export default TeamMember;
