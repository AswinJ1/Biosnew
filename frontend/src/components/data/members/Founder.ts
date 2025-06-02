import { l, t } from "node_modules/framer-motion/dist/types.d-CtuPurYT";

interface Founder {
  username: string;
  firstname: string;
  lastname: string;
  image: string;
  description: string;
  twitter: string;
  linkedin: string;
  email: string;
  campus: {
    Amritapuri: boolean;
    Bengaluru: boolean;
    Coimbatore: boolean;
    Kochi: boolean;
  };
}

const founders: Founder[] = [
    {
        username: 'vipinpavithran',
        firstname: 'Vipin',
        lastname: 'Pavithran',
        image: '/founder.jpeg', // Update with actual image path
        description: "Vipin Pavithran is a cyber-security veteran and the founder of team bi0s, and takes deep passion in mentoring students at Amrita Vishwa Vidyapeetham. Prior to coming to Amritapuri, he has worked for over 10 years in the software industry in the USA & UK. Being passionate about helping students to develop their talent and to make them reach their potential, he founded the internationally recognised student clubs - amFOSS, Team bi0s and Team Shakti, and today mentors over 300 engineering students directly through these clubs. team bi0s was amongst India's first CTF team when it was formed in 2007, and it was this team that founded the InCTF in 2010, which was the first-ever CTF contest to be organized in India.",
        twitter: "https://twitter.com/vipinpavithran",
        linkedin: "https://www.linkedin.com/in/vipin-pavithran/",
        email: "vipinp@am.amrita.edu",
        campus: {
            Amritapuri: true,
            Bengaluru: true,
            Coimbatore: true,
            Kochi: true
        }
    }
];

export default founders;