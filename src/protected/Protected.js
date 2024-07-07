import React, { useNavigate } from "react-router-dom"

const Protected = ({ Component }) => {
  const navigate = useNavigate()
 
  let login = JSON.parse(localStorage.getItem('auth_token'))
  useEffect(() => {
    alert('ok')
    if (!localStorage.getItem('auth_token')) {
      navigate('/login')
    }
  }, [localStorage.getItem('auth_token'), navigate])

  return localStorage.getItem('auth_token') && <Component /> 
}
export default Protected
