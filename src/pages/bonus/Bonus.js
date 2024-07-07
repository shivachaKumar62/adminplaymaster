import { useMemo, useState, useEffect } from 'react'
import { Button, Drawer, Modal } from 'antd'
import '../drawercss/index.css'
import { toast } from 'react-toastify'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getRequest, postRequest, patchRequest, deleteRequest } from '../../api/Api'

const Bonus = () => {
  const [open, setOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [initialValue, setInitialValue] = useState({
    bonusName: '',
    bonusPoints:"",
    id: null,
  })
  const [categoryList, setCategoryList] = useState([])
  const [confirmModal, setConfirmModal] = useState({ visible: false, id: null })

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    setIsEditMode(false)
    setInitialValue({ bonusName: '', id: null })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setInitialValue((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest('bonus')
        setCategoryList(response?.data)
      } catch (error) {
        toast.error('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [])

  // Adding an index to each category item
  const indexedCategoryList = useMemo(() => {
    return categoryList.map((category, index) => ({
      ...category,
      index: index + 1,
    }))
  }, [categoryList])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'points',
        header: 'Points',
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
            <Button onClick={() => showConfirmModal(row.original._id)}>
              <MdDelete className="text-lg text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const handleEdit = (category) => {
    setIsEditMode(true)
    setInitialValue({ bonusName: category.name, id: category._id, bonusPoints:category.points })
    setOpen(true)
  }

  const showConfirmModal = (id) => {
    setConfirmModal({ visible: true, id })
  }

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`bonus/${id}`)
      toast.success('Bonus deleted successfully')
      setCategoryList((prev) => prev.filter((category) => category._id !== id))
      setConfirmModal({ visible: false, id: null })
    } catch (error) {
      toast.error('Failed to delete category')
    }
  }

  const table = useMaterialReactTable({
    columns,
    data: indexedCategoryList,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { bonusName,bonusPoints, id } = initialValue
    if (bonusName === '') {
      toast.error('Name is required')
      return
    }
    if (bonusPoints === '') {
      toast.error('Points is required')
      return
    }
    try {
      if (isEditMode) {
        await patchRequest(`bonus/${id}`, { name: bonusName, points: bonusPoints })
        toast.success('Bonus updated successfully')
        setCategoryList((prev) =>
          prev.map((category) =>
            category._id === id ? { ...category, name: bonusName, points: bonusPoints } : category,
          ),
        )
      } else {
        const response = await postRequest('bonus', { name: bonusName,points:bonusPoints })
        toast.success('Bonus added successfully')
        setCategoryList((prev) => [...prev, response.data])
      }
      onClose()
      setInitialValue({ bonusName: '', id: null, bonusPoints:"" })
      setIsEditMode(false)
    } catch (error) {
      toast.error('Failed to save category')
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-[24px] text-gray-500">Bonus</p>
        <p>
          Total Bonus: <span>{categoryList?.length}</span>
        </p>
      </div>
      <div>
        <div className="flex justify-start my-[30px]">
          <Button type="primary" onClick={showDrawer}>
            Add Bonus
          </Button>
        </div>
        <Drawer title={isEditMode ? 'Edit Category' : 'Add Category'} onClose={onClose} open={open}>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col mb-4 mt-1">
                <label className="block text-sm text-gray-900 font-semibold mb-2">Name</label>
                <input
                  className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                  type="text"
                  value={initialValue.bonusName}
                  name="bonusName"
                  onChange={handleChange}
                />
                {initialValue.bonusName === '' && (
                  <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
                )}
              </div>
              <div className="flex flex-col mb-4 mt-1">
                <label className="block text-sm text-gray-900 font-semibold mb-2">Bonus Points</label>
                <input
                  className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
                  type="number"
                  value={initialValue.bonusPoints}
                  name="bonusPoints"
                  onChange={handleChange}
                />
                {initialValue.bonusPoints === '' && (
                  <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-center w-full text-white py-2 rounded-md"
            >
              {isEditMode ? 'Update' : 'Submit'}
            </button>
          </form>
        </Drawer>
      </div>
      <MaterialReactTable columns={columns} data={indexedCategoryList} />
      <Modal
        title="Confirm Delete"
        visible={confirmModal.visible}
        onOk={() => handleDelete(confirmModal.id)}
        onCancel={() => setConfirmModal({ visible: false, id: null })}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </div>
  )
}

export default Bonus
