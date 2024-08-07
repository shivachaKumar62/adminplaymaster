import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { postRequest } from '../../../api/Api'
import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'

const Login = () => {
  const [adminLogin, setAdminLogin] = useState({ adminName: '', adminPassword: '' })
  const navigate = useNavigate()
  const cookie = new Cookies()

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdminLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (adminLogin.adminName === '') {
      toast.error('Username is required')
      return
    }

    if (adminLogin.adminPassword === '') {
      toast.error('Password is required')
      return
    }

    try {
      const response = await postRequest(
        'admin/login',
        JSON.stringify({
          email: adminLogin.adminName,
          password: adminLogin.adminPassword,
        }),
      )

      if (response.status === 200) {
        toast.success(response?.data?.message)
        cookie.set('AccessToken', response.data.token)
        // cookie.set('RefreshToken', response.data.token)
        navigate('/dashboard')
      } else {
        toast.error('Something went wrong!!')
      }
    } catch (e) {
      console.error('Login error', e)
      // toast.error('An error occurred during login')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="adminName"
                        value={adminLogin.adminName}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="adminPassword"
                        value={adminLogin.adminPassword}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
