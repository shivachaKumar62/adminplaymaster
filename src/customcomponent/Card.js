import React from 'react'
import { FiShoppingBag } from 'react-icons/fi'

const Card = ({ textColor, text,count }) => {
  return (
    <div>
      <div className={`border-l-4  rounded-md border-${textColor}  shadow-md bg-white`}>
        <div className="flex justify-between items-center px-4 h-[100px]">
          <div className="flex flex-col">
            <span className={`text-sm font-semibold text-${textColor} `}>{text}</span>
            <span className="font-bold">{count}</span>
          </div>
          <div>
            <span><FiShoppingBag className='text-2xl' /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
