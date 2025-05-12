import React, { useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const App = () => {

  let [showContent, setShowContent] = useState(false)

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
      delay: -1.8,
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
        <div className="main w-full">
          <div className="landing w-full h-screen overflow-hidden bg-black">

            <div className=" absolute top-0 left-0 z-[10] navbar w-full py-10 px-10 ">
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
              <img className='absolute top-0 left-0 w-full h-full object-cover'
                src="./sky.png"
                alt="" />
              <img className='absolute top-0 left-0 w-full h-full object-cover'
                src="./bg.png"
                alt="" />
              <img className='absolute bottom-[-40%] left-1/2 -translate-x-1/2 scale-[0.8]'
                src="./girlbg.png"
                alt="" />
            </div>

          </div>
        </div>
      }

    </>
  )
}

export default App
