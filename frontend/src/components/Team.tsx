import React from 'react'
import { cardItems } from './data/TeamData'
import IconCard from './IconCard'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Team = () => {

    useGSAP(() => {
        // Text animation remains same
        gsap.from(".iconstext", {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: ".iconstext",
                start: "top 80%",
                end: "top 20%",
                scrub: 0.5
            }
        });

        // Mobile animation (screen width < 768px)
        const mm = gsap.matchMedia();
        const tl = gsap.timeline();
        
        mm.add("(max-width: 767px)", () => {
            gsap.from(".icon-card", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".icons-section",
                    start: "top 70%",
                    end: "center center",
                    scrub: 1,
                    // markers: true, // Uncomment to debug
                }
            });
        });

        // Desktop animation (screen width >= 768px)
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".icons-section",
                    start: "top 60%",
                    end: "center center",
                    scrub: 0.5,
                }
            });

            // Keep your existing desktop animations
            tl.fromTo(".icon-card:nth-child(1)",
                {x: 30, y: 20},
                {x: -30, y: 0},
                0
            )
            tl.fromTo(".icon-card:nth-child(2)",
                {y: 40},
                {y: -20},
                0
            )
            tl.fromTo(".icon-card:nth-child(3)",
                {x: -30, y: 20},
                {x: 30, y: 0},
                0
            )
            tl.fromTo(".icon-card:nth-child(4)",
                {x: 30, y: -20},
                {x: -30, y: 0},
                0
            )
            tl.fromTo(".icon-card:nth-child(5)",
                {y: -40},
                {y: 20},
                0
            )
            tl.fromTo(".icon-card:nth-child(6)",
                {x: -30, y: -20},
                {x: 30, y: 0},
                0
            )
        });
    }, [])

  return (
    <section className='icons-section w-screen min-h-screen z-36 mb-20'>
        <div className='w-full h-full flex items-center justify-center flex-col'>
              <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium text-cyber-green bg-cyber-green/10 rounded-full">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse"></span>
            <span className="typing-animation blink">who we are ?</span>
          </div>
            <h1 className='iconstext pb-10 font-bold text-white text-4xl md:text-5xl'>Our Team</h1>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-16 md:gap-y-36 w-full max-w-7xl mx-auto place-items-center px-4'>
                {cardItems.map((item) => (
                    <div className='icon-card w-48 h-48 md:w-64 md:h-64 ' key={item.title}>
                        <IconCard
                            icon = {item.icon}
                            title = {item.title}
                            text = {item.text}
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Team