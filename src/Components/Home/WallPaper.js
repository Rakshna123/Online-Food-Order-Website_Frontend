import React, { useEffect, useState } from 'react'
import burgerImage from '../../Assets/foodie.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function WallPaper() {
  const navigate = useNavigate();
  const [location, setLocation] = useState([]);
  // const [locationid,setLocationid] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const [inputtext, setInputtext] = useState('');
  const [suggestion, setSuggestion] = useState([]);


  useEffect(()=>{
  
    axios.get('https://online-food-order-website-backend-1.onrender.com/getAllLocation')
    .then((res)=>{
      setLocation(res.data);
    })

    .catch(err=>err)
    sessionStorage.clear();
    // console.log(location);
  },[])
  
  const handleLocation = (e) =>{
    var locationId = e.target.value;
    sessionStorage.setItem("locationID",Number(locationId));
    axios.get(`https://online-food-order-website-backend-1.onrender.com/locationId/${locationId}`)
    .then((res)=>{
      setRestaurants(res.data);
    })

    .catch(err=>err)
  }
  const handleSuggestion = (e) => {
    let inputText = e.target.value;
    const suggestions = restaurants.filter(e => e.name.toLowerCase().includes(inputText.toLowerCase()));
    setInputtext(inputText);
    setSuggestion(suggestions);
  }
  const selectingRest = (restObj) => {
    navigate(`/Details?restaurant=${restObj._id}`);
}
const showSuggestion = () => {
    if (suggestion.length === 0 && inputtext === undefined) {
        return null;
    }
    if (suggestion.length > 0 && inputtext === '') {
        return null;
    }
    if (suggestion.length === 0 && inputtext) {
        return <ul>
            <li style={{backgroundColor:"black",color:"deeppink"}}>No Serach Result found</li>
        </ul>
    }
    return (
      <ul style={{backgroundColor:"black",cursor:"pointer",color:"deeppink"}}>
          {suggestion.map((e, i) => (<li key={i} onClick={() => selectingRest(e)} >{`${e.name} - ${e.locality} - ${e.city}`}</li>)) }
      </ul>
  )
}
  return (
    <div>
       <img className='bgimg' src={burgerImage}  alt="no img" style={{height:"600px", width:"100%"}}/>
        <div className="container topc">
          <div className="row dropdown justify-content-center drop"  >
            <h1 className="col-12 mb-5 heading" style={{fontWeight:"bolder", marginTop:"60px"}}> <b>Find the best restaurants, cafes and bars </b></h1>
            <div className="col-12 col-lg-4 mb-3 me-5">
          <select
            className="form-control place-me-2 search"
            list="datalistOptions"
            id="exampleDatalist"
            style={{ width: "100%", marginTop: "10px" }}
            onChange={handleLocation}>
           <option value="location_id">Choose city....</option>
              {location.map((loc) => (
                <option value={loc.location_id}>{loc.city},{loc.locality}</option>
              ))}
          </select>
          </div>
        <div className="col-12 col-lg-4 me-5">
          <input className="form-control me-2 search icon" 
                 type="search" 
                 placeholder="Search for Restaurants,bars,etc.," arial-label="Search" 
                 style={{width:"100%",paddingLeft:'20px',fontWeight:"Bolder"}}
                 onChange={handleSuggestion}/>
                 {/* <hr/> */}
                {showSuggestion()}
        </div>
      </div>
     </div>
    <div className="logohome"> e! </div>
</div>
  )
}

