import React from 'react'

export default function Sports() {
  const images=[
    { 
      name:"CRICKET",
      src:"./images/cricket.jpg"
    },
    {
      name:"FOOTBALL",
      src:"./images/football.jpg"},
    {
      name:"BADMINTON",
      src:"./images/badminton.jpg"
    }
  ]


  return (
    <>
    <div className=' lg:mt-[20px] lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-10 lg:ml-[200px] '>

      {
        images.map((item,key)=>{
          return(
            <div>
            <img src={item.src} className='lg:rounded-full lg:h-[160px] lg:w-[160px]'></img>
            <p className='lg:pl-[40px] lg:text-[20px]'>{item.name}</p>
            </div>
          )
        })
      }

        

       

    </div>
    </>
  )
}
