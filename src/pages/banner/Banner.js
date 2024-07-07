// import React, { useMemo } from 'react'
// import { Button } from 'antd'
// import { CiEdit } from 'react-icons/ci'
// import { MdDelete } from 'react-icons/md'
// import {NavLink} from "react-router-dom"
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
// import img from "../../images/img.png"
// import { CSVLink } from 'react-csv'
// import jsPDF from 'jspdf'
// // import 'jspdf-autotable'
// import * as XLSX from 'xlsx'
// import { saveAs } from 'file-saver'

// // Sample data with image URLs
// const data = [
//   {
//     image: img,
//   },
// ]

// const Banner = () => {
//     const handleDownloadPDF = () => {
//       const doc = new jsPDF()
//       doc.text('Banner List', 20, 10)
//       doc.autoTable({
//         head: [['Image']],
//         body: data.map((row) => [row.image]),
//       })
//       doc.save('banner_list.pdf')
//     }

//     // const handleDownloadExcel = () => {
//     //   const worksheet = XLSX.utils.json_to_sheet(data)
//     //   const workbook = XLSX.utils.book_new()
//     //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Banners')
//     //   const excelBuffer = XLSX.write(workbook, {
//     //     bookType: 'xlsx',
//     //     type: 'array',
//     //   })
//     //   const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
//     //   saveAs(blob, 'banner_list.xlsx')
//     // }
//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'image',
//         header: 'Image',
//         size: 150,
//         Cell: ({ cell }) => (
//           <div style={{ display: 'flex' }}>
//             <img
//               src={cell.getValue()}
//               alt="Banner"
//               style={{ width: '100px', height: '100px', objectFit: 'cover' }}
//             />
//           </div>
//         ),
//       },
//       {
//         accessorKey: 'actions',
//         header: 'Actions',
//         size: 150,
//         Cell: ({ row }) => (
//           <div style={{ display: 'flex', gap: '10px' }}>
//             <Button onClick={() => handleEdit(row.original)}>
//               <NavLink to="/createBanner">
//                 <CiEdit className="text-lg text-blue-500" />
//               </NavLink>
//             </Button>
//             <Button onClick={() => handleDelete(row.original)}>
//               <MdDelete className="text-lg text-red-500" />
//             </Button>
//           </div>
//         ),
//       },
//     ],
//     [],
//   )

//   const table = useMaterialReactTable({
//     columns,
//     data,
//   })

//   const handleEdit = (row) => {
//     console.log('Edit:', row)
//   }

//   const handleDelete = (row) => {
//     console.log('Delete:', row)
//   }


//   return (
//     <div>
//       <div className="flex justify-between ">
//         <p className="font-semibold text-[24px] text-gray-500">Banner Lists</p>
//         <p>
//           Total Banner: <span>6</span>
//         </p>
//       </div>
//       <div>
//         <div className="flex justify-between my-[30px]">
//           <NavLink to="/createBanner" state={{ createBanner: 'add' }}>
//             <Button type="primary">Add Banner</Button>
//           </NavLink>
//           <div>
//             <CSVLink data={data} filename="banner_list.csv">
//               <Button type="primary" style={{ marginLeft: '10px' }}>
//                 Download CSV
//               </Button>
//             </CSVLink>
//             <Button type="primary" onClick={handleDownloadPDF} style={{ marginLeft: '10px' }}>
//               Download PDF
//             </Button>
//             {/* <Button type="primary" onClick={handleDownloadExcel} style={{ marginLeft: '10px' }}>
//             Download Excel
//           </Button> */}
//           </div>
//         </div>
//       </div>
//       <MaterialReactTable table={table} />
//     </div>
//   )
// }

// export default Banner





import React, { useMemo,useState,useEffect } from 'react'
import { Button } from 'antd'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import {NavLink} from "react-router-dom"
import { toast } from 'react-toastify'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import img from "../../images/img.png"
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
// import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { deleteRequest, getRequest } from '../../api/Api'

const Banner = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const banners = await getRequest('banners')
        setData(banners?.data)
      } catch (error) {
        toast.error('Failed to fetch banners')
      }
    }

    fetchBanners()
  }, [])

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.text('Banner List', 20, 10)
    doc.autoTable({
      head: [['Image']],
      body: data.map((row) => [row.image]),
    })
    doc.save('banner_list.pdf')
  }

  const handleDelete = async (row) => {
    try {
      await deleteRequest(`banners/${row.id}`)
      setData(data.filter((item) => item.id !== row.id))
      toast.success('Banner deleted successfully')
    } catch (error) {
      toast.error('Failed to delete banner')
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'image',
        header: 'Image',
        size: 150,
        Cell: ({ row }) =>
          
          <div style={{ display: 'flex' }}>
            <img
              src={row?.original?.image}
              alt="Banner"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <NavLink to={`/createBanner/${row.original.id}`}>
              <CiEdit className="text-lg text-blue-500" />
            </NavLink>
            <Button onClick={() => handleDelete(row.original)}>
              <MdDelete className="text-lg text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [data],
  )

  return (
    <div>
      <div className="flex justify-between ">
        <p className="font-semibold text-[24px] text-gray-500">Banner Lists</p>
        <p>
          Total Banner: <span>{data.length}</span>
        </p>
      </div>
      <div>
        <div className="flex justify-between my-[30px]">
          <NavLink to="/createBanner" state={{ createBanner: 'add' }}>
            <Button type="primary">Add Banner</Button>
          </NavLink>
          <div>
            <CSVLink data={data} filename="banner_list.csv">
              <Button type="primary" style={{ marginLeft: '10px' }}>
                Download CSV
              </Button>
            </CSVLink>
            <Button type="primary" onClick={handleDownloadPDF} style={{ marginLeft: '10px' }}>
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      <MaterialReactTable columns={columns} data={data} />
    </div>
  )
}

export default Banner
