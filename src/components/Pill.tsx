interface User{
  firstName:string;
  lastName:string;
  image:string;
  email:string;
  id:number;
}

interface Props{
    name:string;
    image:string;
    id:number;
    dummyUser:User[];
    setDummyUser:React.Dispatch<React.SetStateAction<User[]>>
}




const Pill = ({name,image,dummyUser,setDummyUser,id}:Props) => {

  const handleRemoveUser=(id:number):void=>{
     setDummyUser((prev)=>{
        return prev.filter((data)=>{
             return data.id!==id;
        })
     })
     console.log(dummyUser);
  }

  return (
    <div className='flex flex-row bg-gray-700 w-fit px-2 rounded-full gap-x-2 text-white'>
         <img className='h-[20px] w-[20px]' src={image} alt=""/>
         <p>{name}</p>
         <span onClick={()=>handleRemoveUser(id)} className='cursor-pointer'>X</span>  
    </div>
  )
}

export default Pill


