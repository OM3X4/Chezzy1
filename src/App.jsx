import { AiFillYoutube } from "react-icons/ai"; 
import { BsTwitch } from "react-icons/bs"; 
import { BsDiscord } from "react-icons/bs"; 
import { AiOutlineInstagram } from "react-icons/ai"; 
import { BsGooglePlay } from "react-icons/bs"; 
import { AiFillApple } from "react-icons/ai"; 
import { BsFacebook } from "react-icons/bs"; 
import { FaChessBishop } from "react-icons/fa"; 
/* eslint-disable*/

import { useState } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { AnimatedBackground } from 'animated-backgrounds'
import { Link } from "react-router-dom";

import './App.css'

function App() {

  return (
    <>
        <AnimatedBackground  animationName="particleNetwork" style={{ filter: "brightness(60%) grayscale(100%)"}} />
        <nav className=' bg-white bg-opacity-20  h-16 w-full px-60 text-center flex justify-center items-center gap-7'>
          <div className="group items-end flex justify-center">
            <FaChessBishop className=" text-white text-4xl group-hover:text-primary transition-all duration-150"/>
            <Link to={"/"} className=" font-san font-extrabold text-3xl pl-5 text-primary group-hover:text-white transition-all duration-150">Cheezy</Link>
          </div>
          <Link className=" font-san font-extrabold text-3xl pl-5 text-primary hover:text-white transition-all duration-150">Play</Link>
          <Link className=" font-san font-extrabold text-3xl pl-5 text-primary hover:text-white transition-all duration-150">Learn</Link>
          <Link className=" font-san font-extrabold text-3xl pl-5 text-primary hover:text-white transition-all duration-150">Analyze</Link>
          <Link className=" font-san font-extrabold text-3xl pl-5 text-primary hover:text-white transition-all duration-150">News</Link>
        </nav>
        <footer className=" bg-black w-full h-16 fixed bottom-0">
            <div className=" flex justify-center items-center gap-2">
              <p className=" text-white">©All Copy Rights Reserved</p>
              <AiFillApple className=" text-white"/>
              <BsGooglePlay className=" text-white"/>
              <div></div>
              <AiOutlineInstagram className=" text-white"/>
              <BsDiscord className=" text-white"/>
              <BsTwitch className=" text-white"/>
              <BsFacebook className=" text-white"/>
              <AiFillYoutube className=" text-white"/>
            </div>
        </footer>
    </>
  )
}

export default App
