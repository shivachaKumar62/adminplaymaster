
import React from "react";
import { Route, Routes,  } from "react-router-dom";
import Protected from "./Protected";
const DefaultLayout = React.lazy(() => import("../layout/DefaultLayout") )


const ProtectedComp = () => {
  return (
    <div>
      <Routes>
        <Route  path="*" name="Home" element={<Protected Component={DefaultLayout} />} />
      </Routes>
    </div>
  )
}

export default ProtectedComp
