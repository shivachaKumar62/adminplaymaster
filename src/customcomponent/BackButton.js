import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './backbutton.css'
const BackButton = () => {
  let navigate = useNavigate()
  return (
    <>
      <div className="d-flex justify-content-end ">
        <div className="share" onClick={() => navigate(-1)}>
          <span>Back</span>
          <a>
            <FaArrowLeft className="text-gray-400 text-xl" />
          </a>
        </div>
      </div>
    </>
  )
}

export default BackButton
