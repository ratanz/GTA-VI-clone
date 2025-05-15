import React, { useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'remixicon/fonts/remixicon.css'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);

const App = () => {

  // const lenis = new Lenis({
  //   autoRaf: true,
  // });

  // // Listen for the scroll event and log the event data
  // lenis.on('scroll', (e) => {
  //   console.log(e);
  // });


  let [showContent, setShowContent] = useState(false)

  // landing animation 
  useGSAP(() => {

    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.1,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      }
    })
  })

  // sky , character and text animation
  useGSAP(() => {
    if (!showContent) return;

    const main = document.querySelector(".main");

    gsap.to(".main ", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Power4.easeInOut",
    })

    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: "Power4.easeInOut",
    })

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: "Power4.easeInOut",
    })

    gsap.to(".character", {
      scale: 0.7,
      rotate: 0,
      x: "-50%",
      bottom: "-45%",
      duration: 2,
      delay: -.8,
      ease: "Power4.easeInOut",
    })


    gsap.to(".character-mobile", {
      scale: 1.1,
      rotate: 0,
      x: "-50%",
      bottom: "-14%",
      duration: 2,
      delay: -.8,
      ease: "Power4.easeInOut",
    })

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -.8,
      ease: "Power4.easeInOut",
    })

    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".images .text", {
        x: `${xMove * 0.5}%`
      })

      gsap.to(".sky", {
        x: `${xMove * 0.4}%`
      })

      gsap.to(".bg", {
        x: xMove * 1.3,
      })

    });
  }, [showContent])


  useGSAP(() => {

    const leftImg = document.querySelector(".left-img");
    const rightText = document.querySelector(".right-text");

    // Animate left image when it enters viewport
    gsap.fromTo(leftImg,
      {
        opacity: 0,
        x: -200,
        scale: 0.7
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: leftImg,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate right text when it enters viewport
    gsap.fromTo(rightText,
      {
        opacity: 0,
        x: 200,
        scale: 0.7
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scale: 1,
        ease: "easeInOut",
        delay: 0.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: rightText,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [showContent])




  return (
    <>
      <div className="svg fixed flex items-center justify-center top-0 left-0 z-[1] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent &&
        <div className="main w-full scale-[1.9] rotate-[-10deg]">
          <div className="landing relative w-full h-screen overflow-hidden bg-black">

            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10 ">
              <div className="logo flex gap-5">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line md:w-15 w-12 h-2 bg-white "></div>
                  <div className="line md:w-8 w-8 h-2 bg-white "></div>
                  <div className="line md:w-5 w-5 h-2 bg-white "></div>
                </div>
                <h3 className='md:text-4xl text-3xl text-white md:-mt-[8px] -mt-2 leading-none '>Rockstar</h3>
              </div>
            </div>

            <div className="images relative overflow-hidden w-full h-screen">

              <img className='sky absolute top-0 left-0 w-full h-full object-cover scale-[1.5] rotate-[20deg]'
                src="./sky.png"
                alt="" />
              <img className='bg absolute top-0 left-0 w-full h-full object-cover scale-[2] rotate-[-7deg]'
                src="./bg.png"
                alt="" />

              <div className="text text-white flex flex-col gap-3 items-center absolute md:top-18 top-[20%] left-1/2 -translate-x-1/2 scale-[1.9] rotate-[-10deg] ">
                <h1 className='md:text-9xl text-[120px] leading-none md:-ml-50 -ml-10'>grand</h1>
                <h1 className='md:text-9xl text-[120px] leading-none  md:ml-20 ml-20'>theft</h1>
                <h1 className='md:text-9xl text-[120px] leading-none md:-ml-50 -ml-14 -mt-4'>auto</h1>
              </div>md:

              <img className='character hidden lg:block absolute md:bottom-[-200%] left-1/2 -translate-x-1/2 scale-[2.5] rotate-[-20deg]'
                src="./girlbg.png"
                alt="" />

              <img className='character-mobile md:hidden absolute md:bottom-[-200%] left-1/2 -translate-x-1/2 scale-[2.5] rotate-[-20deg]'
                src="./girlbg.png"
                alt="" />

            </div>

            <div className="bottom-bar text-white absolute bottom-0 left-0 w-full py-7 px-10 bg-gradient-to-t from-black to-transparent">

              <div className="flex gap-2 items-center md:opacity-100 opacity-0  ">
                <i className="text-3xl ri-arrow-down-line"></i>
                <h3 className='text-md font-[Neue_Montreal] uppercase'>Scroll down</h3>
              </div>

              <img className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60px]'
                src="./ps5.png"
                alt="" />

            </div>

          </div>

          <div className="page2 w-full md:h-screen h-[150vh] overflow-hidden flex items-center justify-center px-10 bg-black">
            <div className="content w-full flex md:flex-row flex-col text-white md:h-[80%]">
              <div className="relative left-img mx-4 md:w-1/2 w-full h-[300px] md:h-auto mb-8 md:mb-0">
                <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.1]' src="./imag.png" alt="" />
              </div>

              <div className="right-text flex flex-col justify-center md:mt-0 mt-10 md:w-[35%] w-full">
                <h1 className='text-7xl md:text-left text-center'>Still running,</h1>
                <h1 className='text-7xl md:text-left text-center'>Not hunting.</h1>
                <p className='lg:text-xl md:text-lg sm:text-sm mt-10 font-[Neue_Montreal] md:text-left text-center'>Welcome to Vice City, where crime pays and loyalty is everything. Explore the sun-soaked beaches and neon-lit streets in the most immersive GTA VI experience yet. Build your criminal empire and leave your mark on the city's underworld.</p>
                <p className='lg:text-xl md:text-lg sm:text-sm mt-2 font-[Neue_Montreal] md:text-left text-center'>Grand Theft Auto VI promises to redefine open-world gaming with its immersive storyline and breathtaking visuals. Set in the vibrant Vice City, players will experience unprecedented freedom in a meticulously crafted criminal underworld where every decision shapes your destiny.</p>
                <div className="flex md:justify-start justify-center">
                  <button className='bg-yellow-500 w-fit md:px-10 px-5 py-2 md:py-5 md:text-4xl text-2xl text-black rounded-sm md:mt-10 mt-4'>Download Now</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default App
