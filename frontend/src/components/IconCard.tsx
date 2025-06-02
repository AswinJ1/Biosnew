import React from 'react'
import { LucideIcon } from 'lucide-react'

interface IconCardProps {
    icon: LucideIcon;
    title: string;
    text: string;
}

const IconCard = ({ icon: Icon, title, text }: IconCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center 
            p-4 sm:p-6 rounded-lg 
            bg-black/40 backdrop-blur-sm border border-green-500/20
            hover:bg-zinc-900/50 hover:border-green-400/50 
            transition-all duration-300 group
            shadow-[0_0_15px_rgba(34,197,94,0.2)]
            hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]
            w-full max-w-[300px] mx-auto">
            <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-3 sm:mb-4 
                group-hover:text-green-400 transition-colors duration-300
                drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <h3 className="text-lg sm:text-xl font-mono font-bold text-green-400 
                mb-2 text-center group-hover:text-green-300
                drop-shadow-[0_0_3px_rgba(34,197,94,0.6)]">{title}</h3>
            <p className="text-green-300/70 text-left font-mono 
                text-xs sm:text-sm leading-snug tracking-normal
                w-full px-2 sm:px-4 hyphens-auto
                [text-align-last:left]">{text}</p>
        </div>
    )
}

export default IconCard