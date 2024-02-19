
import {BrowserRouter, Routes , Route } from "react-router-dom"

import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { Root } from "./pages/Root"
import { Send } from "./pages/Send"



function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
        {/* add update router as well */}
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
