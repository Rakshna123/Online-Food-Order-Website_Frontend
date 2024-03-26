
// import { useNavigate } from 'react-router-dom'
import SearchItems from './SearchItems'
import React from 'react'
export default function QuickSearch() {
  // const navigate=useNavigate();
  // const [mealtype, setMealtype] = useState([]);
  return (
    <div>
      <div className='container mt-5'>
        <div className='row'>
          <h1 className="col-12 my-1 mainHeading" style={{fontWeight: "bold"}}>Order Now, Enjoy Anytime!</h1>
            <h3 className="col-12 pb-4 padd"> Savor the Flavor: Order, Eat, Repeat!</h3>
        <SearchItems/>
      </div>
    </div>
  </div>
      )
}