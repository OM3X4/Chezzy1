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
import Home from "./comps/Home";
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, useParams } from "react-router-dom"
import { Routes , Route } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds'
import { Link } from "react-router-dom";
import Play from "./comps/Play";



function App() {
  
  const [screenWidth , setScreenWidth] = useState(window.innerWidth)
  useEffect(() => {
    Aos.init()
  } , [])
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs only on mount and unmount
  const backgroundStyle = { filter: `brightness(${screenWidth < 500 ? "0%" : "45%"}) grayscale(100%)`}
  

  return (
    <>
        <AnimatedBackground  animationName="particleNetwork"  style={backgroundStyle} />
        <nav className=' bg-black bg-opacity-300  h-16 w-full  text-center px-3 md:px-44 flex justify-between items-center gap-7'>
          <div className="group items-end flex justify-center">
            <FaChessBishop className=" text-white text-2xl md:text-4xl group-hover:text-primary transition-all duration-150"/>
            <Link to={"/"} className=" font-san font-extrabold text-xl pl-2 md:text-4xl text-primary group-hover:text-white transition-all duration-150">Cheezy</Link>
          </div>
          <div className=" flex justify-center items-center gap-7">
            <Link to={"/play/true"}>
              <div className=" font-san font-semibold text-md md:text-3xl md:pl-5 pl-1 text-primary  transition-all duration-150 group flex justify-center items-center">
                  <h1 className="hover:text-white">PlayAI</h1>
              </div>
            </Link>
            <Link to={"/play/false"}className=" font-san font-semibold text-md md:text-3xl md:pl-5 text-primary hover:text-white transition-all duration-150">Play 1V1</Link>
          </div>
        </nav>
        {/* <Home /> */}
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/play/:isAI" element={<Play p1={{name: "OmarEmad" , rate: 1263 , image: "../public/Main full.png"}} p2={{name:"QueenFish" , rate:1600 , image:"https://www.chess.com/bundles/web/images/noavatar_l.84a92436@2x.gif"}} deadB={["PB" , "PB" , "NB" , "PB"].sort()} deadW={["P" , "P" , "N" ,"P" , "P" , "P" , "N" ,"P"  ,"P" , "P" , "N" ,"P"].sort()} white={true} isPVP={true}/>}/>
        </Routes>
        {/* <Play p1={{name: "OmarEmad" , rate: 1263 , image: "../public/Main full.png"}} p2={{name:"QueenFish" , rate:1600 , image:"https://www.chess.com/bundles/web/images/noavatar_l.84a92436@2x.gif"}} deadB={["PB" , "PB" , "NB" , "PB"].sort()} deadW={["P" , "P" , "N" ,"P" , "P" , "P" , "N" ,"P"  ,"P" , "P" , "N" ,"P"].sort()} white={true} isPVP={true}/> */}

        <footer className=" bg-black w-full h-16 flex items-center justify-center">
            <div className=" flex justify-center items-center gap-4">
              <p className=" text-white pr-10">©All Copy Rights Reserved</p>
              <AiFillApple className=" text-white text-2xl hover:text-primary transition-all duration-150 cursor-pointer"/>
              <BsGooglePlay className=" text-white text-xl hover:text-primary transition-all duration-150 cursor-pointer"/>
              <div className=" w-[2px] h-10 bg-white"></div>
              <AiOutlineInstagram className=" text-white text-xl hover:text-primary transition-all duration-150 cursor-pointer"/>
              <BsDiscord className=" text-white text-xl hover:text-primary transition-all duration-150 cursor-pointer"/>
              <BsTwitch className=" text-white text-xl hover:text-primary transition-all duration-150 cursor-pointer"/>
              <BsFacebook className=" text-white text-xl hover:text-primary transition-all duration-150 cursor-pointer"/>
              <AiFillYoutube className=" text-white text-xl hover:text-primary transition-all duration-150 cursor-pointer"/>
            </div>
        </footer>
    </>
  )
}

export default App
