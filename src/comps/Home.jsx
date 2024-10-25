/* eslint-disable */
import { Link } from 'react-router-dom';
import React from 'react';

function Home() {
    return (
    <>
                <div className="  md:mb-28">
          <div data-aos="fade-right"><img src="QueenFish.png" alt=""/></div>
          <div className=" mx-10 md:mx-60 mt-10">
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
          <div  data-aos="fade-right" data-aos-delay="100">
              <Link to={"/Play/true"}><div className=" bg-white rounded-md py-5 px-44 text-5xl font-extrabold mt-10 w-[80%] mx-auto flex items-center justify-center hover:bg-primary transition-all duration-700" >Play Now</div></Link>
          </div>
        </div>
        {/* the ancient game of Strategy */}
        <div className=" -mt-20 md:mt-0">
          <div className="h-[500px] overflow-hidden flex items-center justify-center">
              <img src="../public/3.jpg" alt="" className=" w-[full] mx-auto"/>
          </div>
          <div className=" mx-10 md:mx-60 mb-24 mt-10">
            <h1 className=" text-5xl text-white font-extrabold">The Ancient Game of Strategy</h1>
            <p className=" text-1xl text-gray-200 font-semibold mt-5">
              Chess is more than just a game; it’s a battle of wits, patience, and precision. Originating from India over 1,500 years ago, chess has evolved into one of the most intellectually stimulating games in human history. Players must think several steps ahead, anticipating their opponent’s moves while maintaining control over the board.
              This delicate balance between attack and defense is what makes chess a true test of strategic thinking.
            </p>
            <div  data-aos="flip-right" data-aos-delay="100">
              <Link to={""}><div className=" bg-white rounded-md py-5 px-44 text-4xl font-extrabold mt-10 w-[100%] mx-auto flex items-center justify-center hover:bg-primary transition-all duration-150" >Check Out Latest Courses</div></Link>
            </div>
          </div>
        </div>
    </>
    );
}

export default Home;