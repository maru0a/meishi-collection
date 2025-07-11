import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Top } from './components/Top'
import { ProfileCard } from './components/ProfileCard'
import { RegisterCard } from './components/RegisterCard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/card/:id" element={<ProfileCard />} />
        <Route path="/card/register" element={<RegisterCard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
