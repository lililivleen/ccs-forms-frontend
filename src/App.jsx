import { BrowserRouter, Routes, Route } from 'react-router-dom'

import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import FormEditorPage from './pages/FormEditorPage'
import SignupPage from './pages/SignupPage'
import FormPreviewPage from './pages/FormPreviewPage'
import FormResponsesPage from './pages/FormResponsesPage'
import FormSettingsPage from './pages/FormSettingsPage'
import FormFillPage from './pages/FormFillPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<WelcomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/forms/:id/edit" element={<FormEditorPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/forms/:id/preview" element={<FormPreviewPage />} />

        <Route path="/forms/:id/responses" element={<FormResponsesPage />} />

        <Route path="/forms/:id/settings" element={<FormSettingsPage />} />

        <Route path="*" element={<WelcomePage />} />

        <Route path="/form/:id" element={<FormFillPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App