import { Routes, Route, Navigate } from 'react-router-dom'

import UploadPage from './pages/uploadpage'
import ReportPage from './pages/reportpage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}