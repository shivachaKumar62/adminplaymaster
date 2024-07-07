import React from 'react'


const Dashboard = React.lazy(() => import('./views/pages/Dashboard'))
const Admin = React.lazy(() => import('./pages/admin/Admin'))
const Banner = React.lazy(() => import('./pages/banner/Banner'))
const createBanner = React.lazy(() => import('./pages/banner/CreateBanner'))
const category = React.lazy(() => import('./pages/category/Category'))
const website = React.lazy(() => import('./pages/website/Website'))
const websiteAdd = React.lazy(() => import('./pages/website/CategoryForm'))
const websiteUpdate = React.lazy(() => import('./pages/website/CategoryForm'))
const signupBonus = React.lazy(() => import('./pages/bonus/Bonus'))
const apiSetting = React.lazy(() => import('./pages/apisetting/Apikey'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/admin', name: 'Admin', element: Admin },
  { path: '/banner', name: 'Banner', element: Banner },
  { path: '/createBanner', name: 'createBanner', element: createBanner },
  { path: '/category', name: 'Category', element: category },
  { path: '/website', name: 'website', element: website },
  { path: '/add', name: 'website', element: websiteAdd },
  { path: '/edit/:id', name: 'website', element: websiteUpdate },
  { path: '/api_setting', name: 'Api Setting', element: apiSetting },
  
]

export default routes
