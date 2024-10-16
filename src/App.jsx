/* eslint-disable*/
import { AiFillYoutube } from "react-icons/ai"; 
import Aos from "aos";
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { BsTwitch } from "react-icons/bs"; 
import { BsDiscord } from "react-icons/bs"; 
import { AiOutlineInstagram } from "react-icons/ai"; 
import { BsGooglePlay } from "react-icons/bs"; 
import { AiFillApple } from "react-icons/ai"; 
import { BsFacebook } from "react-icons/bs"; 
import { FaChessBishop } from "react-icons/fa"; 

import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { AnimatedBackground } from 'animated-backgrounds'
import { Link } from "react-router-dom";

import './App.css'

function App() {
  useEffect(() => {
    Aos.init()
  } , [])


  return (
    <>
        <AnimatedBackground  animationName="particleNetwork" style={{ filter: "brightness(80%) grayscale(100%)"}} />
        <nav className=' bg-black bg-opacity-300  h-20 w-full  text-center px-44 flex justify-between items-center gap-7'>
          <div className="group items-end flex justify-center">
            <FaChessBishop className=" text-white text-4xl group-hover:text-primary transition-all duration-150"/>
            <Link to={"/"} className=" font-san font-extrabold text-3xl pl-5 text-primary group-hover:text-white transition-all duration-150">Cheezy</Link>
          </div>
          <div className=" flex justify-center items-center gap-7">
            <Link >
              <div className=" font-san font-semibold text-2xl pl-5 text-primary  transition-all duration-150 group flex justify-center items-center">
                  <div className=" scale-0 mr-60 opacity-0 rounded-md p-3 fixed bg-white text-black text-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                    Play Against Queen Fish
                  </div>
                  <h1 className="hover:text-white">Play</h1>
              </div>
            </Link>
            <Link >
              <div className=" font-san font-semibold text-2xl pl-5 text-primary  transition-all duration-150 group flex justify-center items-center">
                  <div className=" scale-0 mr-3 hidden opacity-0 rounded-md p-3 bg-white text-black text-sm transition-all duration-200 group-hover:inline-block group-hover:scale-100 group-hover:opacity-100">
                    Learn From the Best
                  </div>
                  <h1 className="hover:text-white">Learn</h1>
              </div>
            </Link>
            <Link className=" font-san font-semibold text-2xl pl-5 text-primary hover:text-white transition-all duration-150">Analyze</Link>
            <Link className=" font-san font-semibold text-2xl pl-5 text-primary hover:text-white transition-all duration-150">News</Link>
          </div>
        </nav>
        {/* queen fish integrated */}
        <div className=" mb-28">
          <div data-aos="fade-right"><img src="QueenFish.png" alt=""/></div>
          <div className=" mx-60 mt-10">
              <h1 className=" text-5xl text-white font-extrabold">Latest Chess Engine Tech</h1>
              <p className=" text-1xl text-gray-200 text-semibold mt-5">
                "QueenFish" is a personal chess engine project developed by Omar Emad in JavaScript.
                As an individual project, it showcases a solid understanding of chess mechanics and coding principles.
                QueenFish provides a strong foundation for move generation and position evaluation, making it a valuable learning tool 
                for chess enthusiasts. While it may not compete with the top engines, it serves as an excellent project that demonstrates 
                Omar’s growing skills in game development and algorithm design.
                QueenFish is a testament to the dedication behind personal coding projects, 
                balancing both challenge and enjoyment for players.
              </p>
          </div>
          <Link><div data-aos="fade-right" className=" bg-white rounded-md py-5 px-44 text-5xl font-extrabold mt-10 w-[80%] mx-auto flex items-center justify-center hover:bg-primary transition-all duration-700" >Play Now</div></Link>
        </div>
        {/* the ancient game of Strategy */}
        <div className=" mt-0">
          <div className="h-[500px] overflow-hidden flex items-center justify-center">
              <img src="../public/3.jpg" alt="" className=" w-[full] mx-auto"/>
          </div>
          <div className=" mx-60 mb-24 mt-10">
            <h1 className=" text-5xl text-white font-extrabold">The Ancient Game of Strategy</h1>
            <p className=" text-1xl text-gray-200 font-semibold mt-5">
              Chess is more than just a game; it’s a battle of wits, patience, and precision. Originating from India over 1,500 years ago, chess has evolved into one of the most intellectually stimulating games in human history. Players must think several steps ahead, anticipating their opponent’s moves while maintaining control over the board.
              This delicate balance between attack and defense is what makes chess a true test of strategic thinking.
            </p>
          </div>
        </div>
        <footer className=" bg-black w-full h-16 fixed bottom-0 flex items-center justify-center">
            <div className=" flex justify-center items-center gap-4">
              <p className=" text-white pr-10">©All Copy Rights Reserved</p>
              <AiFillApple className=" text-white text-2xl hover:text-primary transition-all duration-150"/>
              <BsGooglePlay className=" text-white text-xl hover:text-primary transition-all duration-150"/>
              <div className=" w-[2px] h-10 bg-white"></div>
              <AiOutlineInstagram className=" text-white text-xl hover:text-primary transition-all duration-150"/>
              <BsDiscord className=" text-white text-xl hover:text-primary transition-all duration-150"/>
              <BsTwitch className=" text-white text-xl hover:text-primary transition-all duration-150"/>
              <BsFacebook className=" text-white text-xl hover:text-primary transition-all duration-150"/>
              <AiFillYoutube className=" text-white text-xl hover:text-primary transition-all duration-150"/>
            </div>
        </footer>
    </>
  )
}

export default App
