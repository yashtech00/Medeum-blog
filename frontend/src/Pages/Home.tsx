import React from "react";  
import { Link } from "react-router";  
import { useBlogs } from "../hooks";
import { Spinner } from "../components/Spinner";

const Home = () => {  

    const {loading}=useBlogs()

    // if(loading){
    //     return <div className="flex flex-col ">
    //         <div>
    //         <Spinner/>
    //         </div>
    //     </div>
    // }

  return (  
    <div>  
      <HomeNab />  
      <div className="flex w-screen justify-between items-center p-10">  
        <div className="flex flex-col ">  
            
          <h1 className="text-6xl pb-4 font-semibold">Publish your passions, your way</h1>  
          <p className="text-3xl">Create a unique and beautiful blog easily.</p>  
          <div className="">  
            <Link to={'/signup'}>
            <button className="mt-10 bg-black text-white text-center rounded-xl px-14 py-2">Get Started</button> 
            </Link> 
          </div>  
        </div>  
        <div>  
          <img  
            src="https://cdni.iconscout.com/illustration/premium/thumb/blog-writing-illustration-download-in-svg-png-gif-file-formats--article-creative-copywriting-content-management-or-journalist-pack-business-illustrations-3723237.png?f=webp"  
            alt="Blog Illustration"  
            className=""  
          />  
        </div>  
      </div>  
    </div>  
  );  
};  

function HomeNab() {  
  return (  
    <div className="flex justify-between px-10 border-b py-4">  
      <Link  
        to={"/Home"}  
        className="flex flex-col justify-center cursor-pointer text-4xl font-bold"  
      >  
        Medeum  
      </Link>  
      <div>  
        <Link to={"/signup"}>  
          <button className="mr-4 text-white bg-black focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">  
            Signup  
          </button>  
        </Link>  
      </div>  
    </div>  
  );  
}  

export default Home;