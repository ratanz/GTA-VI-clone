import React, { useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'remixicon/fonts/remixicon.css'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger);

const App = () => {

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
      scale: 0.8,
      rotate: 0,
      x: "-50%",
      bottom: "-42%",
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
                  <div className="line w-15 h-2 bg-white "></div>
                  <div className="line w-8 h-2 bg-white "></div>
                  <div className="line w-5 h-2 bg-white "></div>
                </div>
                <h3 className='text-4xl text-white -mt-[8px] leading-none '>Rockstar</h3>
              </div>
            </div>

            <div className="images relative overflow-hidden w-full h-screen">

              <img className='sky absolute top-0 left-0 w-full h-full object-cover scale-[1.5] rotate-[20deg]'
                src="./sky.png"
                alt="" />
              <img className='bg absolute top-0 left-0 w-full h-full object-cover scale-[2] rotate-[-7deg]'
                src="./bg.png"
                alt="" />

              <div className="text text-white flex flex-col gap-3 items-center absolute top-20 left-1/2 -translate-x-1/2 scale-[1.9] rotate-[-10deg] ">
                <h1 className='text-9xl -ml-50'>grand</h1>
                <h1 className='text-9xl  ml-20'>theft</h1>
                <h1 className='text-9xl -ml-50 -mt-4'>auto</h1>
              </div>

              <img className='character absolute bottom-[-200%] left-1/2 -translate-x-1/2 scale-[2.5] rotate-[-20deg]'
                src="./girlbg.png"
                alt="" />

            </div>

            <div className="bottom-bar text-white absolute bottom-0 left-0 w-full py-7 px-10 bg-gradient-to-t from-black to-transparent">

              <div className="flex gap-2 items-center ">
                <i className="text-3xl ri-arrow-down-line"></i>
                <h3 className='text-md font-[Neue_Montreal] uppercase'>Scroll down</h3>
              </div>

              <img className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60px]'
                src="./ps5.png"
                alt="" />

            </div>

          </div>

          <div className="page2 w-full h-screen overflow-hidden flex items-center justify-center px-10 bg-black">
            <div className="content w-full flex text-white h-[80%] ">
              <div className=" relative left-img mx-10 w-1/2 h-full  ">
                <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.1]' src="./imag.png" alt="" />
              </div>
              <div className="right-text flex flex-col justify-center itece w-[35%]">
                <h1 className='text-7xl '>Still running,</h1>
                <h1 className='text-7xl '>Not hunting.</h1>
                <p className='text-xl mt-10 font-[Neue_Montreal]  '>Welcome to Vice City, where crime pays and loyalty is everything. Explore the sun-soaked beaches and neon-lit streets in the most immersive GTA VI experience yet. Build your criminal empire and leave your mark on the city's underworld.</p>
                <p className='text-xl mt-2 font-[Neue_Montreal]'>Grand Theft Auto VI promises to redefine open-world gaming with its immersive storyline and breathtaking visuals. Set in the vibrant Vice City, players will experience unprecedented freedom in a meticulously crafted criminal underworld where every decision shapes your destiny.</p>
                <button className=' bg-yellow-500 w-fit px-10 py-5 text-4xl text-black rounded-sm mt-10'>Download Now</button>
              </div>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default App
