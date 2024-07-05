import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import './App.css'
import FirstComp from './Components/FirstComp'
import SecondComp from './Components/SecondComp'
import ThirdComponent from './Components/ThirdComponent'

function App() {
  return (
    <>
      <BrowserRouter basename="/GrowMO/" >
          <Routes>
            <Route path="/" element={<FirstComp/>} />
            <Route path="/second-page" element={<SecondComp/>} />
            <Route path="/Third-page" element={<ThirdComponent/>} />
          </Routes>
        </BrowserRouter>    
    </>
  )
}

export default App
