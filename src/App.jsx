import { Routes, Route } from 'react-router-dom'

import ListingPage from './pages/ListingPage/ListingPage.jsx'
import DetailPage from './pages/DetailPage/DetailPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ListingPage/>} />
      <Route path="/product/:id" element={<DetailPage />} />
    </Routes>
  )
}
