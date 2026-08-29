import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FormEditorPage from './pages/FormEditorPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/form/:id" element={<FormEditorPage />} />

        <Route path="/signup" element={<SignupPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App