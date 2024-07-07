


// import { useMemo, useState, useEffect } from 'react'
// import { Button, Drawer } from 'antd'
// import '../drawercss/index.css'
// import { toast } from 'react-toastify'
// import { CiEdit } from 'react-icons/ci'
// import { MdDelete } from 'react-icons/md'
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
// import { getRequest, postRequest, patchRequest, deleteRequest } from '../../api/Api'

// const Category = () => {
//   const [open, setOpen] = useState(false)
//   const [isEditMode, setIsEditMode] = useState(false)
//   const [initialValue, setInitialValue] = useState({
//     categoryName: '',
//     id: null,
//   })
//   const [categoryList, setCategoryList] = useState([])

//   const showDrawer = () => {
//     setOpen(true)
//   }

//   const onClose = () => {
//     setOpen(false)
//     setIsEditMode(false)
//     setInitialValue({ categoryName: '', id: null })
//   }

//   const handleChange = (event) => {
//     const { name, value } = event.target
//     setInitialValue((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }))
//   }

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getRequest('category')
//         setCategoryList(response?.data)
//       } catch (error) {
//         toast.error('Failed to fetch categories')
//       }
//     }
//     fetchCategories()
//   }, [])

//   // Adding an index to each category item
//   const indexedCategoryList = useMemo(() => {
//     return categoryList.map((category, index) => ({
//       ...category,
//       index: index + 1,
//     }))
//   }, [categoryList]) 


//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'index',
//         header: 'ID',
//         size: 150,
//       },
//       {
//         accessorKey: 'name',
//         header: 'Name',
//         size: 150,
//       },
//       {
//         accessorKey: 'createdAt',
//         header: 'Created Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'updatedAt',
//         header: 'Modified Date',
//         size: 200,
//       },
//       {
//         accessorKey: 'actions',
//         header: 'Actions',
//         size: 150,
//         Cell: ({ row }) => (
//           <div style={{ display: 'flex', gap: '10px' }}>
//             <Button onClick={() => handleEdit(row.original)}>
//               <CiEdit className="text-lg text-blue-500" />
//             </Button>
//             <Button onClick={() => handleDelete(row.original._id)}>
//               <MdDelete className="text-lg text-red-500" />
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     [],
//   )

//   const handleEdit = (category) => {
//     setIsEditMode(true)
//     setInitialValue({ categoryName: category.name, id: category._id })
//     setOpen(true)
//   }

  
//   const handleDelete = async (id) => {
//     try {
//       await deleteRequest(`category/${id}`)
//       toast.success('Category deleted successfully')
//       setCategoryList((prev) => prev.filter((category) => category._id !== id))
//     } catch (error) {
//       toast.error('Failed to delete category')
//     }
//   }

//   const table = useMaterialReactTable({
//     columns,
//     data: indexedCategoryList,
//   })

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const { categoryName, id } = initialValue
//     if (categoryName === '') {
//       toast.error('Name is required')
//       return
//     }
//     try {
//       if (isEditMode) {
//        await patchRequest(`category/${id}`, { name: categoryName })
//        toast.success('Category updated successfully')
//        setCategoryList((prev) =>
//          prev.map((category) =>
//            category._id === id ? { ...category, name: categoryName } : category,
//          ),
//        )
//       } else {
//         const response = await postRequest('category/create', { name: categoryName })
//         toast.success('Category added successfully')
//         setCategoryList((prev) => [...prev, response.data])
//       }
//       onClose()
//       setInitialValue({ categoryName: '', id: null })
//       setIsEditMode(false)
//     } catch (error) {
//       toast.error('Failed to save category')
//     }
//   }

//   return (
//     <div>
//       <div className="flex justify-between">
//         <p className="font-semibold text-[24px] text-gray-500">Category</p>
//         <p>
//           Total Category: <span>{categoryList?.length}</span>
//         </p>
//       </div>
//       <div>
//         <div className="flex justify-start my-[30px]">
//           <Button type="primary" onClick={showDrawer}>
//             Add Category
//           </Button>
//         </div>
//         <Drawer title={isEditMode ? 'Edit Category' : 'Add Category'} onClose={onClose} open={open}>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <div className="flex flex-col mb-4 mt-1">
//                 <label className="block text-sm text-gray-900 font-semibold mb-2">Name</label>
//                 <input
//                   className="border-2 bg-[white] border-gray-300 rounded-md px-3 py-2 w-full"
//                   type="text"
//                   value={initialValue.categoryName}
//                   name="categoryName"
//                   onChange={handleChange}
//                 />
//                 {initialValue.categoryName === '' && (
//                   <span className="block text-sm text-red-500 pt-1">This Field is Required !</span>
//                 )}
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-center w-full text-white py-2 rounded-md"
//             >
//               {isEditMode ? 'Update' : 'Submit'}
//             </button>
//           </form>
//         </Drawer>
//       </div>
//       <MaterialReactTable columns={columns} data={indexedCategoryList} />
//     </div>
//   )
// }

// export default Category



import { useMemo, useState, useEffect } from 'react'
import { Button, Drawer, Modal } from 'antd'
import '../drawercss/index.css'
import { toast } from 'react-toastify'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { getRequest, postRequest, patchRequest, deleteRequest } from '../../api/Api'

const Category = () => {
  const [open, setOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [initialValue, setInitialValue] = useState({
    categoryName: '',
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
    setInitialValue({ categoryName: '', id: null })
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
        const response = await getRequest('category')
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
        accessorKey: 'createdAt',
        header: 'Created Date',
        size: 150,
      },
      {
        accessorKey: 'updatedAt',
        header: 'Modified Date',
        size: 200,
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
    setInitialValue({ categoryName: category.name, id: category._id })
    setOpen(true)
  }

  const showConfirmModal = (id) => {
    setConfirmModal({ visible: true, id })
  }

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`category/${id}`)
      toast.success('Category deleted successfully')
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
    const { categoryName, id } = initialValue
    if (categoryName === '') {
      toast.error('Name is required')
      return
    }
    try {
      if (isEditMode) {
        await patchRequest(`category/${id}`, { name: categoryName })
        toast.success('Category updated successfully')
        setCategoryList((prev) =>
          prev.map((category) =>
            category._id === id ? { ...category, name: categoryName } : category,
          ),
        )
      } else {
        const response = await postRequest('category/create', { name: categoryName })
        toast.success('Category added successfully')
        setCategoryList((prev) => [...prev, response.data])
      }
      onClose()
      setInitialValue({ categoryName: '', id: null })
      setIsEditMode(false)
    } catch (error) {
      toast.error('Failed to save category')
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-[24px] text-gray-500">Category</p>
        <p>
          Total Category: <span>{categoryList?.length}</span>
        </p>
      </div>
      <div>
        <div className="flex justify-start my-[30px]">
          <Button type="primary" onClick={showDrawer}>
            Add Category
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
                  value={initialValue.categoryName}
                  name="categoryName"
                  onChange={handleChange}
                />
                {initialValue.categoryName === '' && (
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

export default Category
