import React, { useEffect, useMemo, useState } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { Button } from 'antd'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { getRequest, deleteRequest } from '../../api/Api'
import {  useNavigate } from 'react-router-dom'


const Website = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const response = await getRequest('page')
      setCategories(response?.data)
    } catch (error) {
      toast.error('Failed to fetch Website')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleEdit = (category) => {
    navigate(`/edit/${category._id}`)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Website?')) {
      try {
        await deleteRequest(`page/${id}`)
        toast.success('Website deleted successfully')
        setCategories(categories.filter((category) => category?._id !== id))
      } catch (error) {
        toast.error('Failed to delete Website')
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'page_name',
        header: 'Page Name',
        size: 500,
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
            <Button onClick={() => handleDelete(row.original._id)}>
              <MdDelete className="text-lg text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [categories],
  )

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-[24px] text-gray-500">Website</p>
        <p>
          Total Category: <span>{categories?.length}</span>
        </p>
      </div>
      <div>
        <div className="flex justify-start my-[30px]">
          <Button type="primary" onClick={() => navigate('/add')}>
            Add Website
          </Button>
        </div>
      </div>
      
      <MaterialReactTable columns={columns} data={categories} />
    </div>
  )
}

export default Website
