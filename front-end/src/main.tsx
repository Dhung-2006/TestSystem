import { StrictMode } from 'react'
import { BrowserRouter, Routes , Route} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./sass/Integration_module.scss";
import RegisterFrame from './Frames/RegisterFrame.tsx'
import LoginFrame from './Frames/LoginFrame.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <LoginFrame /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginFrame />} />
        <Route path='registerFrame' element={<RegisterFrame />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
