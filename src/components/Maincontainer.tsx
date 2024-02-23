import React,{useState,useEffect, useRef} from 'react'
import Pill from './Pill'
import { API_URL } from '../constants'
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../utils/themeSlice';


interface User{
    firstName:string;
    lastName:string;
    image:string;
    email:string;
    id:number;
}

const Maincontainer:React.FC = () => {

 const inputRef=useRef<HTMLInputElement>(null);  

 const [suggestions,setSuggestions]=useState<User[]>([]);
 const [searchParam,setSearchParam]=useState<string>("");
 const [dummyUser,setDummyUser]=useState<User[]>([]);


  const fetchUser=async():Promise<void>=>{
        if(searchParam===""){
           setSuggestions([]);
           return; 
        }
        try {
            const data=await fetch(`${API_URL}${searchParam}`);
            const json=await data.json(); 
            setSuggestions(json.users)   
            console.log(json.users);

        } catch (error) {
            console.log("Error has occured"); 
        }  
  }
  
  useEffect(()=>{
     
     const timer=setTimeout(()=>{
       fetchUser();
     },500)

     return ()=>{clearTimeout(timer)};

     inputRef.current?.focus();
  },[searchParam])

  const handleAddClick=(data:User)=>{
     setDummyUser([...dummyUser,data]);
     console.log(dummyUser);
  }

 

  const dispatch=useDispatch();
  const handleThemeClick=()=>{
     dispatch(toggleTheme());
  }






 return (
    <div className={`flex relative h-[100vh] w-[100%] transition-all dura bg-slate-800`}>


        
         {
          1? <FaMoon onClick={handleThemeClick} className='text-white text-[25px] absolute right-4 top-4 cursor-pointer '/>
          :<FaSun onClick={handleThemeClick} className='text-yellow-500 text-[25px] absolute right-4 top-4 cursor-pointer'/>
         }

        <div className={`flex flex-col relative h-[60%] w-[80%] border rounded-md mx-auto my-auto bg-gray-600`}>
            
            <div className='relative'>
             <div className={`relative w-[80%] mx-auto my-2 rounded-full py-2 px-6 flex flex-wrap gap-x-2 gap-y-2 bg-slate-800`}>
                
           
             {
                dummyUser.map((data,index)=>{
                    return(
                       <div key={index}>
                        <Pill 
                         name={data?.firstName}
                         dummyUser={dummyUser}
                         setDummyUser={setDummyUser}
                         image={data?.image}
                         id={data.id}
                       />
                       </div>
                    )
                   })
             }
                 

             <input 
                ref={inputRef}
                type="text"
                className={`focus:outline-none  w-[100%] bg-slate-800  text-white placeholder:text-white`}
                onChange={(e)=>{setSearchParam(e.target.value)}}
                value={searchParam}
                placeholder='Search User'
                // onKeyDown={handleKeyDowwn}
               />
             </div>
              <ul className={`scrollbar flex flex-col gap-y-2 w-[80%] mx-auto  rounded-lg px-4 py-3 max-h-[230px] overflow-auto bg-gray-800 ${suggestions.length===0 ? "hidden":"flex"}`}>
                 {
                    suggestions.map((data)=>{
                        return(
                            
                             <li key={data.email} onClick={()=>handleAddClick(data)}  className={`flex gap-x-4 py-1 cursor-pointer rounded-md transition-all duration-500 hover:bg-slate-400 text-white`}>
                               <img className='w-[30px] h-[30px] rounded-full' src={data?.image} alt="user_image" />
                               <span>{data?.firstName}</span>
                             </li>
                       
                        )
                    })
                 }
              </ul>
            </div>

        </div>
    </div>
  )
}

export default Maincontainer
