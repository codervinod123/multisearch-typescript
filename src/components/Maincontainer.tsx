import React,{useState,useEffect, useRef} from 'react'
import Pill from './Pill'
import { API_URL } from '../constants'

interface User{
    firstName:string;
    image:string;
    email:string;
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
        } catch (error) {
            console.log("Error has occured"); 
        }  
  }
  
  useEffect(()=>{
     fetchUser();
     console.log(suggestions);
     inputRef.current?.focus();
  },[searchParam])

  const handleAddClick=(data:User)=>{
     setDummyUser([...dummyUser,data]);
     console.log(dummyUser);
  }

  return (
    <div className={`flex relative h-[100vh] w-[100%] transition-all dura bg-slate-800`}>
        <div className={`flex flex-col relative h-[60%] w-[80%] border rounded-md mx-auto my-auto bg-gray-600`}>
            
            <div className='relative'>
             <div className={`relative w-[80%] mx-auto my-2 rounded-full py-2 px-6 flex flex-wrap gap-x-2 gap-y-2 bg-slate-800`}>
                
           
             {
                dummyUser.map((data,index)=>{
                    return(
                       <div key={index}>
                        <Pill 
                         name={data?.firstName}
                        //  onClick={()=>handleRemove(data)}
                         email={data?.email}
                        //  image={data?.email}
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
