import { useMemo, useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import '../drawercss/index.css'
import { toast } from 'react-toastify'
import { IoCopyOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { MaterialReactTable } from 'material-react-table'
import { getRequest, postRequest, deleteRequest } from '../../api/Api'

const Apikey = () => {
  const [categoryList, setCategoryList] = useState([])
  const [confirmModal, setConfirmModal] = useState({ visible: false, id: null, action: '' })
  const [getRefresh, setGetRefresh] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest('secret/get-key')
        setCategoryList(response?.data)
      } catch (error) {
        toast.error('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [getRefresh])

  const convertKeyObjectToString = (keyObject) => {
    return Object.values(keyObject).join('')
  }

  // Adding an index to each category item
  const indexedCategoryList = useMemo(() => {
    return Object.values(categoryList)?.map((category, index) => ({
      secretKey: convertKeyObjectToString(category),
      index: index + 1,
    }))
  }, [categoryList])

  const handleCopy = (fullKey) => {
    navigator.clipboard.writeText(fullKey)
    toast.success('Key copied to clipboard!')
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'index',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'secretKey',
        header: 'Key',
        size: 150,
        Cell: ({ row }) => (
          <div>
            <span className="bg-gray-200 px-2 py-1">{row.original.secretKey.slice(0, 10)}...</span>
            <Button
              onClick={() => handleCopy(row.original.secretKey)}
              style={{ marginLeft: '10px' }}
            >
              <IoCopyOutline />
            </Button>
          </div>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={() => showConfirmModal(row.original.index, 'delete')}>
              <MdDelete className="text-lg text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  const showConfirmModal = (id, action) => {
    setConfirmModal({ visible: true, id, action })
  }

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`secret/delete-key`)
      toast.success('API Key deleted successfully')
      setGetRefresh((data) => !data)
      setConfirmModal({ visible: false, id: null, action: '' })
    } catch (error) {
      toast.error('Failed to delete API Key')
      setGetRefresh((data) => !data)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await postRequest('secret/generate-key')
      toast.success('API Key added successfully')
      setCategoryList((prev) => [...prev, response.data])
      setGetRefresh((data) => !data)
      setConfirmModal({ visible: false, id: null, action: '' })
    } catch (error) {
      toast.error('Failed to save API Key')
      setGetRefresh((data) => !data)
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold text-[24px] text-gray-500">ApiKey</p>
        <p>
          Total ApiKey: <span>{categoryList?.length}</span>
        </p>
      </div>
      <div>
        <div className="flex justify-start my-[30px]">
          <Button type="primary" onClick={() => showConfirmModal(null, 'add')}>
            GENERATE NEW KEY 
          </Button>
        </div>
      </div>
      <MaterialReactTable columns={columns} data={indexedCategoryList} />
      <Modal
        title={confirmModal.action === 'delete' ? 'Confirm Delete' : 'Add API Key'}
        visible={confirmModal.visible}
        onOk={() => {
          if (confirmModal.action === 'delete') {
            handleDelete(confirmModal.id)
          } else {
            handleSubmit()
          }
        }}
        onCancel={() => setConfirmModal({ visible: false, id: null, action: '' })}
        okText={confirmModal.action === 'delete' ? 'Yes' : 'Add'}
        cancelText="No"
      >
        {confirmModal.action === 'delete' ? (
          <p>Are you sure you want to delete this API Key?</p>
        ) : (
          <p>Do you want to add a new API Key?</p>
        )}
      </Modal>
    </div>
  )
}

export default Apikey
