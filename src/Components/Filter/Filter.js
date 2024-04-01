import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from "react-router-dom";
// import breakfast from '../../Assets/breakfast.jpeg'
import axios from 'axios';
import queryString from 'query-string'
export default function Filter() {
    const navigate = useNavigate();
    const location = useLocation().search
    const [locationData, setLocationData] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [sort, setSort] = useState(1);
    const [cuisineid, setCuisineid] = useState([]);
    const [lowCost, setLowCost] = useState(undefined);
    const [highCost, setHighCost] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1)
    const restaurantsPerPage = 2

    const qs = queryString.parse(window.location.search);
    const mealtype_id = qs.mealtype;
    
    const location_id = Number(sessionStorage.getItem('locationID'));

    const fetchLocation = () => {
        axios.get('https://online-food-order-website-backend-1.onrender.com/getAllLocation')
            .then((res) => 
                setLocationData(res.data))
            .catch((err) => console.log(err))
        }

    useEffect(()=>{

        fetchLocation();

        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: location_id,
            cuisine_id: cuisineid,
            sort: sort,
            lowCost: lowCost,
            highCost: highCost
        }

        axios.get(`https://online-food-order-website-backend-1.onrender.com/mealTypeId/${mealtype_id}`)
        .then((res)=>{
            setRestaurantData(res.data);
        })
        .catch(err=>err)
        console.log(restaurantData);

        axios.post("https://online-food-order-website-backend-1.onrender.com/filteroptions",filteredObj)
        .then((res)=>{
            setRestaurantData(res.data);
        })
        .catch(err=>err)

        sessionStorage.clear();

    },[location_id,mealtype_id,sort, cuisineid, lowCost, highCost,location])

      const searchHandle = (e) => {
        var locationId = Number(e.target.value);

        const filteredObj = {
            mealtype_id: Number(mealtype_id),
            location_id: locationId,
            sort: sort,
            lowCost:lowCost,
            highCost: highCost
        }

        axios.post("https://online-food-order-website-backend-1.onrender.com/filteroptions",filteredObj)
            .then(res => setRestaurantData(res.data))
            .catch(err => console.log(err))
        }

        const filters = () => {
            const filteredObj = {
                mealtype_id: Number(mealtype_id),
                location_id: location_id,
                cuisine_id: cuisineid,
                sort: sort,
                lowCost: lowCost,
                highCost: highCost
            }

        axios.post("https://online-food-order-website-backend-1.onrender.com/filteroptions", filteredObj)
            .then(res => setRestaurantData(res.data))
            .catch(err => console.log(err))
        }

        const handleCuisine = (id) => {
            const index = cuisineid.indexOf(id)
            if (index === -1) {
                cuisineid.push(id)
                setCuisineid(cuisineid)
            } else {
                cuisineid.splice(index, 1)
                setCuisineid(cuisineid)
            }
            setTimeout(() => {
                filters();
            }, 500);
    
        }
    
        const searchSort = (e) => {
            const sort = e.target.value
            setSort(sort)
            setTimeout(() => {
                filters();
            }, 0);
        }
    
        const handleCost = (lowCost, highCost) => {
            setLowCost(lowCost)
            setHighCost(highCost)
            setTimeout(() => {
                filters();
            }, 0);
    
        }

      const handleDetail = (e) =>{
        navigate(`/Details?restaurant=${e._id}`);
      } 

      const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const indexOfLastRestaurant = currentPage * restaurantsPerPage;
    const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
    const length = Math.ceil(restaurantData.length / restaurantsPerPage);
    const currentRestaurants = restaurantData.length > 0 ? restaurantData.slice(indexOfFirstRestaurant, indexOfLastRestaurant) : 0;

  return (
    <div>
       <center>
       <h1 className="start"> <b>Breakfast Places in Tamil Nadu</b></h1>
       </center>
      <div className="parent container bx">
        <div className="sidebar box-shadow">
            <div className="drop">
                <h2> <b>Filters </b></h2>
                <label>Select location</label>
                <br/>
                {/* <input type="text" list="location" placeholder="Select Location"></input> */}
                <select id="city" onChange={searchHandle}>
                <option>--select city--</option>
                {locationData.map((element) => {
                            return <option key={element._id} value={element.location_id}>{`${element.city}- ${element.locality}`}</option>
                        })}
                </select>
            </div>
            <div className="cb1">
                <h2> <b>Cuisine</b> </h2>
                <input type="checkbox" onChange={() => handleCuisine(1)}/> North Indian
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(2)}/> South Indian
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(3)}/> Chinese
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(4)}/> Fast food
                <br/>
                <input type="checkbox" onChange={() => handleCuisine(5)}/> Italian
            </div>
            <div className="rd1">
                <h2> <b>Cost for two </b></h2>
                <input type="radio" name="price" onChange={() => handleCost(0, 500)}/> Less than &#8377; 500
                <br/>
                <input type="radio" name="price"  onChange={() => handleCost(500, 1000)} />&#8377;500 to &#8377;1000
                <br/>
                <input type="radio" name="price" onChange={() => handleCost(1000, 1500)}/>&#8377;1000 to&#8377;1500
                <br/>
                <input type="radio" name="price" onChange={() => handleCost(1000, 1500)}/> &#8377;1500 to &#8377;2000
                <br/>
                <input type="radio" name="price" onChange={() => handleCost(2000, 50000)}/>&#8377;2000+
            </div>
            <div className="rd1">
                <h2> <b>Sort</b> </h2>
                <input type="radio" name="Sort"  value={1} onClick={searchSort}/> Price low to high
                <br/>
                <input type="radio" name="Sort" value={-1} onClick={searchSort}/> Price high to low
            </div>
        </div>
        <div className="food container gt">
        {currentRestaurants.length > 0 ?currentRestaurants.map((item,i)=>{
                    return <div className="one row row-cols-1 g-4 my-3">
                    <div className="div1" onClick={()=>{handleDetail(item)}}>
                           <div className="img">
                              <img src={item.image} alt="no img" style={{height:"140px"}} className="br"/>
                           </div>
                        <div className="contents">
                            <h1 className="h1 heads" style={{color:"purple"}}><b> {item.name} </b> </h1>
                            <h2 className="h2 sub" style={{color:"darkgreen"}}>{item.city}  </h2>
                            <h4 className="h4 add" style={{color:"tomato"}}> {item.locality} </h4>
                        </div>
                    </div>
                    <div className="tabdiv">
                    <hr style={{color:"darkviolet"}}/>
                        <div className="tab">
                            <table>
                            <tr>
                                <td style={{color:"maroon"}}>  <b>Cusine: </b></td>
                                <td style={{color:"darkblue"}}> {`  ${item.cuisine.map(e => e.name + " ")}`} </td>
                            </tr>
                            <tr>
                                <td style={{color:"maroon"}}> <b>Cost for two:</b> </td>
                                <td style={{color:"darkblue"}}>  &#8377; {item.min_price} </td>
                            </tr> 
                          
                           </table>
                        </div>
                    </div> 
                    
                    </div> 
                }): <center><h1 style={{ color: "red" }}>No Result Found...</h1></center>
               }
            {restaurantData.length > 0 ? 
           <div className="num">
                 {/* <div>Prev</div> */}
                 {Array.from({ length }).map((_, index) => (
                                <p key={index}
                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''} btn border-primary btn-light page`}
                                    onClick={() => handlePage(index + 1)}
                                >
                                    <span className="page-link">{index + 1}</span>
                                </p>
                            ))}
                 {/* <div className="six">Next</div> */}
            </div> : null}
        </div>
    </div>
</div>
    // </div>
  
  )
}
