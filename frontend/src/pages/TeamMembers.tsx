import { useState, useRef, useEffect } from "react";
import TeamMember from "../components/TeamMember";
import { Search, ChevronRight, Terminal } from "lucide-react";
import MatrixRain from "@/components/MatrixRain";
import ThreeDCube from "@/components/ThreeDCube";

// Import member data from files
import alumni from "@/components/data/members/alumni";
import students from "@/components/data/members/students";
import advisors from "@/components/data/members/advisors";
import staff from "@/components/data/members/staff";
import { ScrollArea } from "@/components/ui/scroll-area";

// Format member data for consistent use in the component
const formatMember = (member, type) => {
  let id, name, title, description, image;
  
  switch(type) {
    case 'student':
      id = member.username || `student-${Math.random().toString(36).substring(2, 9)}`;
      name = `${member.firstname} ${member.lastname}`;
      title = `${member.category} Student (${member.team})`;
      description = member.description || 
        `Student at ${member.campus} campus.\nCategory: ${member.category}\nTeam: ${member.team}\nYear: ${member.year}\nGithub: ${member.github || 'N/A'}\nEmail: ${member.email || 'N/A'}`;
      break;
    case 'staff':
      id = `staff-${member.firstname.toLowerCase()}-${member.lastname.toLowerCase()}`;
      name = `${member.firstname} ${member.lastname}`;
      title = `${member.category} Staff (${member.team})`;
      description = member.description || 
        `Staff member at ${member.campus} campus.\nCategory: ${member.category}\nTeam: ${member.team}\nSpecialization: Security research and education`;
      break;
    case 'advisor':
      id = `advisor-${member.firstname.toLowerCase()}-${member.lastname.toLowerCase()}`;
      name = `${member.firstname} ${member.lastname}`;
      title = `Security Advisor (${member.affiliation})`;
      description = member.description || 
        `Industry advisor from ${member.affiliation}.\nRole: Providing industry perspectives\nExpertise: Security best practices\nAffiliation: ${member.affiliation}`;
      break;
    case 'alumni':
      id = member.username || `alumni-${Math.random().toString(36).substring(2, 9)}`;
      name = `${member.firstname} ${member.lastname}`;
      title = `Alumni - ${member.category} (${member.batch})`;
      description = member.description || 
        `Alumni from ${member.campus} campus.\nBatch: ${member.batch}\nCategory: ${member.category}\nTeam: ${member.team}\nYear: ${member.year}`;
      break;
  }

  // Use image if provided, otherwise use placeholder
  image = member.image || "/placeholder.svg";
  
  return {
    id,
    name,
    title,
    description,
    image,
    originalData: member,
    type
  };
};

// Process all member data
const processedStudents = students.map(student => formatMember(student, 'student'));
const processedStaff = staff.map(staffMember => formatMember(staffMember, 'staff'));
const processedAdvisors = advisors.map(advisor => formatMember(advisor, 'advisor'));
const processedAlumni = alumni.map(alumnus => formatMember(alumnus, 'alumni'));

// Campus list from student and staff data
const campusSet = new Set([
  ...students.map(s => s.campus),
  ...staff.map(s => s.campus),
    ...advisors.map(ad => ad.campus),
  ...alumni.filter(a => a.campus).map(a => a.campus)
]);
const campuses = Array.from(campusSet);

// Categories for sidebar
const categories = [
  { name: "All Members", key: "all-members" },
  { name: "Team Advisors", key: "advisors" },
  { name: "Staff Mentors", key: "mentors" },
  { name: "Student Members", key: "students" },
  { name: "Alumni", key: "alumni" },
];

// Teams from data
const teamsSet = new Set([
  ...students.map(s => s.team),
  ...staff.map(s => s.team),
  ...alumni.filter(a => a.team).map(a => a.team)
]);
const teams = [
  { name: "All Teams", key: "all-teams" },
  ...Array.from(teamsSet).map(team => ({ 
    name: team, 
    key: team.toLowerCase() 
  }))
];

const TeamMembers = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  
  const playClickSound = () => {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.5; // Set volume to 50%
    audio.play();
  };

  // Get all members based on current filters
  const getAllMembers = () => {
    let members = [];
    
    // Apply category filter
    if (selectedCategory === "Team Advisors" || selectedCategory === null) {
      members = [...members, ...processedAdvisors];
    }
    
    if (selectedCategory === "Staff Mentors" || selectedCategory === null) {
      members = [...members, ...processedStaff];
    }
    
    if (selectedCategory === "Student Members" || selectedCategory === null) {
      members = [...members, ...processedStudents];
    }
    
    if (selectedCategory === "Alumni" || selectedCategory === null) {
      members = [...members, ...processedAlumni];
    }
    
    // Apply campus filter
    if (selectedCampus && selectedCampus !== "All Campuses") {
      members = members.filter(member => 
        member.originalData.campus === selectedCampus
      );
    }
    
    // Apply team filter
    if (selectedTeam && selectedTeam !== "All Teams") {
      members = members.filter(member => 
        member.originalData.team === selectedTeam
      );
    }
    
    return members;
  };
  
  // Search functionality
  const searchMembers = (members, query) => {
    if (!query.trim()) return members;
    
    const lowercaseQuery = query.toLowerCase();
    return members.filter(member => 
      member.name.toLowerCase().includes(lowercaseQuery) || 
      member.title.toLowerCase().includes(lowercaseQuery) ||
      (member.description && member.description.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Get current member being displayed
  const currentMember = selectedMember
    ? getAllMembers().find(m => m.id === selectedMember)
    : hoveredMember 
      ? getAllMembers().find(m => m.id === hoveredMember)
      : null;

  // Reset typing effect when member changes
  useEffect(() => {
    if (currentMember && currentMember.description) {
      // Reset typing when member changes
      setDisplayedText("");
      setTypingIndex(0);
      setTypingComplete(false);
    } else {
      setDisplayedText("");
      setTypingIndex(0);
      setTypingComplete(true);
    }
  }, [currentMember]);

  // Handle typing effect
  useEffect(() => {
    if (currentMember && currentMember.description) {
      const textToType = currentMember.description;
      
      if (typingIndex < textToType.length) {
        const typingTimer = setTimeout(() => {
          setDisplayedText(prev => prev + textToType[typingIndex]);
          setTypingIndex(typingIndex + 1);
        }, 0); // Typing speed (adjust as needed - higher number = slower)
        
        return () => clearTimeout(typingTimer);
      } else {
        setTypingComplete(true);
      }
    }
  }, [currentMember, typingIndex]);

  // Auto-scroll terminal as text is typed
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedText]);

  // Handle campus selection
  const handleCampusClick = (campus: string) => {
    playClickSound();
    
    if (campus === "All Campuses") {
      setSelectedCampus(null); // Set to null to show all members
    } else {
      setSelectedCampus(campus === selectedCampus ? null : campus);
    }
    
    setHoveredMember(null);
    setSelectedMember(null); // Reset selected member when changing campus
    setDisplayedText("");
    setTypingIndex(0);
  };

  // Handle team selection
  const handleTeamClick = (team: string) => {
    playClickSound();
    
    // Handle "All Teams" click - show all team members
    if (team === "All Teams") {
      setSelectedTeam(null);
    } else {
      setSelectedTeam(team === selectedTeam ? null : team);
    }
    
    setHoveredMember(null);
    setSelectedMember(null);
    setDisplayedText("");
    setTypingIndex(0);
  };

  // Handle member click
  const handleMemberClick = (memberId: string) => {
    playClickSound();
    setSelectedMember(memberId === selectedMember ? null : memberId);
    // Reset typing when clicking on a member
    setDisplayedText("");
    setTypingIndex(0);
    setTypingComplete(false);
  };

  // Handle category click
  const handleCategoryClick = (category: string) => {
    playClickSound();
    
    if (category === "All Members") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category === selectedCategory ? null : category);
    }
    
    setHoveredMember(null);
    setSelectedMember(null);
    setDisplayedText("");
    setTypingIndex(0);
  };

  // Get current members to display
  const currentMembers = searchMembers(getAllMembers(), searchQuery);

  return (
    <div className="mt-20 mb-16">
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
      
      <div className="">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-[280px,1fr,1fr] gap-4">
            {/* Left sidebar */}
            <div className="bg-[black] rounded border border-[#00ff0033] p-4">
              {/* Search bar */}
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Search here" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-[#00ff0033] text-[#00ff00] pb-2 focus:outline-none focus:border-[#00ff00]" 
                />
                <Search size={16} className="absolute right-1 top-1 text-[#00ff0066]" />
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                {categories.map(category => (
                  <div 
                    key={category.key}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`flex items-center py-2 cursor-pointer hover:text-[#00ff00] ${selectedCategory === category.name ? "text-[#00ff00]" : ""}`}
                  >
                    {(category.name === "All Members" || category.name === selectedCategory) && 
                      <ChevronRight size={16} className="mr-1" />
                    }
                    {category.name}
                  </div>
                ))}
              </div>

              {/* Teams section */}
              <div className="mb-6">
                <div className="font-bold text-sm mb-2">By Team</div>
                {teams.map(team => (
                  <div 
                    key={team.key}
                    onClick={() => handleTeamClick(team.name)}
                    className={`flex items-center py-2 cursor-pointer hover:text-[#00ff00] ${selectedTeam === team.name ? "text-[#00ff00]" : ""}`}
                  >
                    {(team.name === "All Teams" || team.name === selectedTeam) && 
                      <ChevronRight size={16} className="mr-1" />
                    }
                    {team.name}
                  </div>
                ))}
              </div>

              {/* Campus section */}
              <div className="mb-6">
                <div className="font-bold text-sm mb-2">By Campus</div>
                {["All Campuses", ...campuses].map(campus => (
                  <div 
                    key={campus}
                    onClick={() => handleCampusClick(campus)}
                    className={`flex items-center py-2 cursor-pointer hover:text-[#00ff00] ${selectedCampus === campus ? "text-[#00ff00]" : ""}`}
                  >
                    {(campus === "All Campuses" || campus === selectedCampus) && 
                      <ChevronRight size={16} className="mr-1" />
                    }
                    {campus}
                  </div>
                ))}
              </div>
            </div>

            {/* Middle section - Team Members */}
            <div className="bg-[black] rounded border border-[#00ff0033] flex flex-col">
              <div className="p-4 border-b border-[#00ff0033]">
              <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 ">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
                <p className="text-xl text-green-600 font-bold typing-animation ">
                  {selectedCampus ? `${selectedCampus} Members` : 
                   selectedCategory ? `${selectedCategory}` :
                   selectedTeam ? `${selectedTeam} Members` : "All Members"}
                  {searchQuery && ` - Search results for "${searchQuery}"`}
                </p>
                </div>
              </div>
              <ScrollArea className="h-[60vh]">
                <div className="divide-y divide-[#00ff0033]">
                  {currentMembers.length > 0 ? (
                    currentMembers.map((member) => (
                      <TeamMember
                        key={member.id}
                        member={member}
                        isSelected={member.id === hoveredMember || member.id === selectedMember}
                        onMouseEnter={() => setHoveredMember(member.id)}
                        onMouseLeave={() => member.id === selectedMember ? null : setHoveredMember(null)}
                        onClick={() => handleMemberClick(member.id)}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-center text-[#00ff00]/70">
                      No results found {searchQuery && `for "${searchQuery}"`}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Right section - Terminal */}
            <div className="bg-black rounded border border-[#00ff0033] flex flex-col">
              <div className="p-3 border-b border-[#00ff0033] flex items-center">
                            
                <h3 className="text-sm text-white">{currentMember ? `team_bi0s.exe@${currentMember.name.toLowerCase().replace(" ", "-")}` : "team_bi0s.exe"}</h3>
              </div>
              <div 
                ref={terminalRef}
                className="p-4 flex-1 overflow-y-auto bg-black font-mono text-sm"
              >
                {currentMember ? (
                  <>
                    <div className="text-[white]"><span className="text-green-600">$</span>  User profile data</div>
                    <div className="text-[white]/80 whitespace-pre-line pl-2 pt-2">
                      {displayedText}
                      {!typingComplete && <span className="animate-pulse">_</span>}
                    </div>
                  </>
                ) : (
                  <div className="text-[white]/60">
                    <span className="text-green-600">$</span> No user selected<br/>
                    <span className="text-green-600">$</span> Hover over or click on a team member to view details<span className="animate-pulse">_</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default TeamMembers;
