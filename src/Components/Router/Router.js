import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../Home/Home';
import Filter from '../Filter/Filter';
import Details from '../Details/Details';
import '../../Style/Carousel.css'
import '../../Style/Tabs.css'
import '../../Style/Home.css'
import '../../Style/Filter.css'
import '../../Style/Carousel.css'
import '../../Style/Header.css'
import Header from '../Home/Header'
export default function Router() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Filter" element={<Filter/>}/>
        <Route path="/Details" element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}


