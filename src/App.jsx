
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './assets/Pages/Home/Home';
import Layout from "./assets/Pages/Layout/Layout";
import ScienceFiction from "./assets/Pages/ScienceFiction/ScienceFiction";
import Programming from "./assets/Pages/Programming/Programming";
import BookDetails from './assets/Pages/BookDetails/BookDetails';
import Engineering from "./assets/Pages/Engineering/Engineering";

function App() {

 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>}></Route>
      <Route path="/ScienceFiction" element={<ScienceFiction/>}></Route>
      <Route path="/Programming" element={<Programming/>}></Route>
      <Route path="/Engineering" element={<Engineering/>}></Route>
      <Route path="/book/:id" element={<BookDetails/>}></Route>
      </Route>
   
    </Routes>
    </BrowserRouter>
  )
}

export default App
