import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Login, Register } from './pages/Auth'
import { BmiCalculator, CyclingDashboard, RunningDashboard, SwimmingDashboard, Tips } from './pages/Main'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={< Login />} />
          <Route path='/register' element={< Register />} />
          <Route path='/running' element={<  RunningDashboard />} />
          <Route path='/cycling' element={< CyclingDashboard />} />
          <Route path='/swimming' element={< SwimmingDashboard />} />
          <Route path='/bmi-calculator' element={< BmiCalculator />} />
          <Route path='/healthy-tips' element={< Tips />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
