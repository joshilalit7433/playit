import { useState } from 'react'
import Close from './Close'
import Menu from './Menu'
import { Link } from 'react-scroll';


export default function Navbar() {

    const links=[
        {
            id:1,
            name:"Home"

        },

        {
             id:2,
            name:"Turfs"

        },

        {
             id:3,
            name:"Contact"
        }


    ]

    const[btn,setbtn]=useState(false)
 
    const togglebtn=()=>{
      setbtn(!btn);
    }


  return (
    <>
    <nav >
        <div className=' flex justify-center lg:flex lg:justify-start lg:mt-[10px] lg:ml-[10px] mt-[20px] pb-[-80px] '>
            <p className='text-[30px] lg:text-3xl'>
                Let's Goo....
            </p>

        </div>

        <div className='lg:flex  lg:justify-center lg:gap-x-8 lg:text-[22px] cursor-pointer lg:mt-[-27px] hidden'>
            {
                links.map((val,id)=>{
                    return(
                        <ul key={id}  >
                        <li>{val.name}</li>
                        </ul>
                    )

                })
            }

        </div>

        <div className='lg:flex lg:justify-end lg:mr-[30px] lg:mt-[-32px] hidden '>
            <button className='border border-black lg:h-[35px] lg:w-[65px] lg:text-[20px] rounded-md ' >Login</button>
        </div>

        <div onClick={togglebtn} className="flex justify-end  pr-[30px] lg:hidden mt-[-35px] pb-[-80px] " >
      <button className="h-[25px] w-[25px]  "   >{btn ? <Close/> :  <Menu/> }</button>
      </div>



      {btn && (
  <div >
<div  >
  <ul className={`  ${btn? <Menu/>:<Close/>} text-2xl pt-[20px] text-black  w-screen bg-white opacity-95  flex flex-col align-center items-center   h-screen  `}>
  <li  className="hover:text-[#576CBC] lg:px-4  my-[15px]">
          <Link onClick={togglebtn} to='main' smooth={true} duration={500} >
           HOME
          </Link>
        </li>


        <li  className="hover:text-[#576CBC] lg:px-4  my-[15px]">
          <Link onClick={togglebtn} to='education' smooth={true} duration={500}>
            TURFS
          </Link>
        </li>

        <li  className="hover:text-[#576CBC] lg:px-4  my-[15px]">
          <Link onClick={togglebtn} to='skills' smooth={true} duration={500} >
          CONTACT
          </Link>
        </li>

        <div >
            <button className='border border-black h-[40px] w-[70px] rounded-md ' >Login</button>
        </div>

      

        
  </ul>
  </div>
    </div>
  
)}



    </nav>
    </>
  )
}
