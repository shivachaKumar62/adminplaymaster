import { Button } from 'antd'
import React, { useState, useEffect } from 'react'
import BackButton from '../../customcomponent/BackButton'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRequest, patchRequest, postRequest } from '../../api/Api'


const CreateBanner = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { createBanner } = location.state || {}
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (id) {
      const fetchBanner = async () => {
        try {
          const banner = await getRequest(`banners/${id}`)
          setImage(banner?.data?.image)
        } catch (error) {
          toast.error('Failed to fetch banner')
        }
      }

      fetchBanner()
    }
  }, [id])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) {
      toast.error('Image is required')
      return
    }

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response =
        createBanner === 'add'
          ? await postRequest('banners', formData)
          : await patchRequest(`banners/${id}`, formData)

      if (response.status === 201 || response.status === 200) {
        toast.success(response?.data?.message)
        navigate('/banner') // Redirect to banner list
      } else {
        toast.error('Something went wrong!!')
      }
    } catch (e) {
      console.error('Login error', e)
      toast.error('An error occurred while creating the banner')
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-[24px] text-gray-500">Banners</p>
        <BackButton />
      </div>
      <div className="bg-white py-10 px-4">
        <p className="font-bold text-2xl text-black">
          Banner {createBanner === 'add' ? 'Create' : 'Update'}
        </p>
        <p className="text-base text-gray-500 font-semibold">Image</p>
        <input onChange={handleFileChange} type="file" className="w-full border-2 py-2" />
        <div className="my-4">
          <Button onClick={handleSubmit}>{createBanner === 'add' ? 'Create' : 'Update'}</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateBanner
