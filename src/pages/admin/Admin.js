import { useMemo, useState, useEffect } from 'react'
import { Button, Drawer, Modal } from 'antd'
import '../drawercss/index.css'
import { FaRegEye } from 'react-icons/fa6'
import { IoEyeOffOutline } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import {toast} from "react-toastify"
import validator from 'validator'
// import axios from 'axios'
import { postRequest, getRequest, deleteRequest } from '../../api/Api'
import Cookies from 'universal-cookie'
import { getTokenFromCookie } from '../../cookie/getTokenFromCookie'


const Admin = () => {
  const cookie = new Cookies()
  const [open, setOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [initialValue, setInitialValue] = useState({
    adminName: '',
    adminEmail: '',
    adminContact: '',
    adminAddress: '',
    adminPassword: '',
    adminConfirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState({
    password: null,
    confirmPassword: null,
  })
  const [allAdminData,setAllAdminData] = useState([])
  const [errors, setErrors] = useState({})
  const [rowCount, setRowCount] = useState(0)
  const [deleteId,setDeleteId] = useState()

  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email address',
      }))
    }
  }

  const validatePassword = (password) => {
    if (
      validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          'Password must have at least 6 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)',
      }))
    }
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const handleChange = (event) => {
    const { name, value } = event.target

    setInitialValue((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (name === 'adminEmail') {
      validateEmail(value)
    }
    if (name === 'adminPassword') {
      validatePassword(value)
    }
  }
  useEffect(() => {
    if (
      initialValue?.adminEmail !== '' &&
      initialValue?.adminEmail !== undefined &&
      initialValue?.adminPassword !== '' &&
      initialValue?.adminPassword !== undefined
    )
      validateEmail(initialValue?.adminEmail)
    validatePassword(initialValue?.adminPassword)
  }, [initialValue?.adminEmail, initialValue?.adminPassword])
  const hideAndShowPassword = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: prevState[fieldName] === null ? fieldName : null,
    }))
  }
const getAllAdmindata = async () => {
  try {
    const token = getTokenFromCookie()
    if (!token) {
      toast.error('Authentication token not found!')
      return
    }
    const response = await getRequest('admin', '', cookie.get('AccessToken'))

    if (response.status === 200) {
      toast.success(response?.data?.message)
      setAllAdminData(response?.data)
      setRowCount(response?.data?.length)
    } else {
      toast.error('Something went wrong!!')
    }
  } catch (e) {
    console.error('Login error', e)
  }
}
useEffect(() => {
  getAllAdmindata()
}, [])
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={() => handleEdit(row.original)}>
              <CiEdit className="text-lg text-blue-500" />
            </Button>
            <Button onClick={() => handleDelete(row.original)}>
              <MdDelete className="text-lg text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleOk = async() => {
  
    try {
    const token = getTokenFromCookie()
    if (!token) {
      toast.error('Authentication token not found!')
      return
    }
    const response = await getRequest(`admin/:${deleteId?._id}`, '', token)

    if (response.status === 200) {
      toast.success(response?.data?.message)
       setIsModalOpen(false)
    } else {
      toast.error('Something went wrong!!')
    }
  } catch (e) {
    console.error('Login error', e)
  }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleDelete = (id) => {
setDeleteId(id)
setIsModalOpen(true)

  }

  const handleEdit = (id) => {
   
    setIsEditMode((data) => !data)
    setOpen(true)
  }
 const table = useMaterialReactTable({
   columns,
   data: allAdminData, // use the fetched data here
   manualPagination: true,
   rowCount,
 })



 // Assuming initialValue is defined somewhere above this function

 const handleSubmit =  async(e) => {
   e.preventDefault()
   setIsEditMode((data) => !data)

   const {
     adminName,
     adminEmail,
     adminContact,
     adminAddress,
     adminPassword,
     adminConfirmPassword,
   } = initialValue

   if (adminName === '') {
     toast.error('Name is required')
     return
   }

   if (adminEmail === '') {
     toast.error('Email is required')
     return
   }

   if (adminContact === '') {
     toast.error('Contact is required')
     return
   }

   if (adminAddress === '') {
     toast.error('Address is required')
     return
   }

   if (adminPassword === '') {
     toast.error('Password is required')
     return
   }

   if (adminPassword !== adminConfirmPassword) {
     toast.error('Passwords do not match')
     return
   }
try {

      const response = await postRequest(
        'admin/register',
        JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          address: adminAddress,
          phone: adminContact,
          name: adminName,
        }),
      )

      if (response.status === 201) {
        toast.success(response?.data?.message)
        // cookie.set('AccessToken', response.data.token)
        // cookie.set('RefreshToken', response.data.token)
       
      } else {
        toast.error('Something went wrong!!')
      }
    } catch (e) {
      console.error('Login error', e)
      // toast.error('An error occurred during login')
    }
 }

  return (
    <div>
      <Modal title="Delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        Are you sure want to delete {deleteId?.name}
      </Modal>
      <div className="flex justify-between ">
        <p className="font-semibold text-[24px] text-gray-500">Admin Management</p>
        <p>
          Total Admin: <span>{rowCount}</span>
        </p>
      </div>
      <div>
        <div className="flex justify-start my-[30px]">
          <Button type="primary" onClick={showDrawer}>
            Add Admin
          </Button>
        </div>
        <Drawer title={isEditMode ? 'Edit Admin' : `Add Admin`} onClose={onClose} open={open}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 mt-1">
              <label className="block text-sm text-gray-900 font-semibold mb-2">Name</label>
              <input
                className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                type="text"
                value={initialValue.adminName}
                name="adminName"
                onChange={handleChange}
              />
              {initialValue.adminName === '' && (
                <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
              )}
            </div>

            <div className="flex flex-col mb-4 mt-1">
              <label className="block text-sm text-gray-900 font-semibold mb-2">Email</label>
              <input
                className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                type="email"
                value={initialValue.adminEmail}
                name="adminEmail"
                onChange={handleChange}
              />
              {initialValue.adminEmail === '' ? (
                <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
              ) : (
                <span className={`block text-sm  ${errors == '' ? '' : 'text-red-600 pt-1'}`}>
                  {errors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4 mt-1">
              <label className="block text-sm text-gray-900 font-semibold mb-2">Contact</label>
              <input
                className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                type="tel"
                value={initialValue.adminContact}
                name="adminContact"
                onChange={handleChange}
              />
              {initialValue.adminContact === '' && (
                <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
              )}
            </div>
            <div className="flex flex-col mb-4 mt-1">
              <label className="block text-sm text-gray-900 font-semibold mb-2">Address</label>
              <input
                className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                type="text"
                value={initialValue.adminAddress}
                name="adminAddress"
                onChange={handleChange}
              />
              {initialValue.adminAddress === '' && (
                <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
              )}
            </div>
            <div className="flex flex-col mb-4 mt-1">
              <label className="block text-sm text-gray-900 font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                  type={showPassword?.password === 'password' ? 'text' : 'password'}
                  value={initialValue.adminPassword}
                  name="adminPassword"
                  onChange={handleChange}
                />
                <span
                  onClick={() => hideAndShowPassword('password')}
                  className="absolute  right-4 bottom-3 cursor-pointer"
                >
                  {showPassword?.password === 'password' ? <FaRegEye /> : <IoEyeOffOutline />}
                </span>
              </div>
              {initialValue.adminPassword === '' ? (
                <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
              ) : (
                <span className={`block text-sm  ${errors == '' ? '' : 'text-red-600 pt-1'}`}>
                  {errors.password}
                </span>
              )}
            </div>
            <div className="flex flex-col mb-4 mt-1">
              <label className="block text-sm text-gray-900 font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                  type={showPassword?.confirmPassword === 'confirmPassword' ? 'text' : 'password'}
                  value={initialValue.adminConfirmPassword}
                  name="adminConfirmPassword"
                  onChange={handleChange}
                />
                <span
                  onClick={() => hideAndShowPassword('confirmPassword')}
                  className="absolute  right-4 bottom-3 cursor-pointer"
                >
                  {showPassword?.password === 'confirmPassword' ? (
                    <FaRegEye />
                  ) : (
                    <IoEyeOffOutline />
                  )}
                </span>
              </div>
              {initialValue.adminConfirmPassword !== initialValue.adminPassword ? (
                <span className="block text-sm text-red-500 pt-1">password should be match !</span>
              ) : (
                initialValue.adminConfirmPassword === '' && (
                  <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
                )
              )}
            </div>

            <button
              // onClick={() => handleSubmit()}
              type="submit"
              className="bg-blue-500  text-center w-full text-white py-2 rounded-md"
            >
              {isEditMode ? 'Update' : `Submit`}
            </button>
          </form>
        </Drawer>
      </div>
      <MaterialReactTable table={table} />
    </div>
  )
}

export default Admin
