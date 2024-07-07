import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'
import { postRequest, patchRequest, getRequest } from '../../api/Api'
import {  useNavigate, useParams } from 'react-router-dom'
import BackButton from '../../customcomponent/BackButton'

const CategoryForm = () => {
  const [content, setContent] = useState('')
  const [page_name,setPageName] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const response = await getRequest(`page/${id}`)
          console.log(response, 'hhh')
          setContent(response.data?.content)
          setPageName(response.data.page_name)
        } catch (error) {
          toast.error('Failed to fetch category')
        }
      }
      fetchCategory()
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        await patchRequest(`page/${id}`, { content:content,page_name:page_name })
        toast.success('Website updated successfully')
        navigate(-1)
      } else {
        await postRequest('page', { content: content, page_name: page_name })
        toast.success('Website added successfully')
        navigate(-1)
      }
      
    } catch (error) {
      toast.error('Failed to save category')
    }
  }

  return (
    <div>
      <BackButton />
      <div className="my-[20px]">
        <h2>{id ? 'Edit Website' : 'Add Website'}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className='my-10 flex flex-col gap-2'>
            <label>Page Name</label>
            <input
              type="text"
              placeholder="Add page name"
              value={page_name}
              onChange={(e) => setPageName(e.target.value)}
              className='w-full px-3 py-2 rounded-md'
            />
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            className="px-4"
            onChange={(event, editor) => setContent(editor.getData())}
            style={{ minHeight: '400px'  }}
          />
        </div>
        <Button type="primary" htmlType="submit" className='my-4'>
          {id ? 'Update' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}

export default CategoryForm
