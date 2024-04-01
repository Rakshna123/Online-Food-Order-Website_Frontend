import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import breakfast from '../../Assets/breakfast.jpeg';
// import lunch from '../../Assets/lunch.jpeg';
// import snacks from '../../Assets/snacks.webp';
// import dinner from '../../Assets/dinner.jpeg';
// import desert from '../../Assets/desert.jpeg';
// import beverages from '../../Assets/beverages.jpeg';

export default function SearchItems() {
  const [mealtype, setMealtype] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
     axios.get(`https://online-food-order-website-backend-1.onrender.com/getAllMealTypes`)
     .then((res) => setMealtype(res.data))
     .catch((err) => err);
}, [])

const navigateFilter = (mealtypeid) =>{
const locId= sessionStorage.getItem("locationID");
if(locId){
  navigate(`/Filter?mealtype=${mealtypeid}&location=${locId}`)
}else{
  navigate(`/Filter?mealtype=${mealtypeid}`)
}
 
} 
return (
  <div>
      {mealtype.map((e,i)=>{
        return <div key={i} onClick={()=>navigateFilter(e.meal_type)} className='maindiv d-inline-flex bd-highlight col-4 col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                 <img src={e.image} alt="" style={{width:"150px",height: "170px"}}/>
                   <div className="col-6 col-md-3 col-lg-2 shadow-lg bg-body rounded p-2 desp">
                      <h3> {`${e.name}`} </h3>
                         <h5 className="s">{`${e.content}`} </h5>
                   </div>
                </div>
      })}
 </div>
//   <div className="container">
    
//     <div className="row">
//       <div className=" mb-5 maindiv">
//         <div className="col-sm-6 col-md-3 col-lg-4 d-inline-flex bd-highlight img"> 
//           <img src={breakfast} alt="" style={{width:"150px",height: "170px"}}/>
//             <div className="col-sm-6 col-md-3 col-lg-4 shadow-lg mb-5 bg-body rounded p-2 desp">
//               <h3> Breakfast</h3>
//                <h5 className="s"> Start your day with exclusive breakfast options</h5>
//          </div>
//        </div>
//     </div>
//     <div className="mb-5 maindiv"> 
//       <div className="col-6 col-md-3 col-lg-2 d-inline-flex bd-highlight img">  <img src={lunch} alt="" style={{width:"150px",height: "170px"}}/>
//         <div className="col-6 col-md-3 col-lg-2 shadow-lg bg-body rounded p-2 desp">
//           <h3>Lunch</h3>
//             <h5 className="s"> Enjoy your day with exclusive meal options </h5>
//          </div>  
//        </div>
//      </div>
//      <div className="mb-5 maindiv"> 
//         <div className="col-6 col-md-3 col-lg-2 d-inline-flex bd-highlight img"> <img src={snacks} alt="" style={{width: "150px",height: "170px"}}/>
//            <div className="col-6 col-md-3 col-lg-22 shadow-lg mb-5 bg-body rounded p-2 desp">
//               <h3>Snacks</h3>
//                 <h5 className="s"> Enjoy the good taste, Marvel at the crunch </h5>
//             </div>
//          </div>
//       </div>    
//       <div className="mb-5 maindiv"> 
//         <div className="col-6 col-md-3 col-lg-2 d-inline-flex bd-highlight img"><img src={dinner} alt=""style={{width: "150px",height: "170px"}}/>
//           <div className="col-6 col-md-3 col-lg-2 shadow-lg mb-5 bg-body rounded p-2 desp">
//             <h3>Dinner</h3>
//               <h5 className="s"> Dinner is not just a meal, it's an experience </h5>
//          </div>
//         </div>    
//        </div>
//        <div className="mb-5 maindiv"> 
//           <div className="col-6 col-md-3 col-lg-2 d-inline-flex bd-highlight img"> <img src={desert} alt="" style={{width: "150px",height: "170px"}}/>
//             <div className="col-6 col-md-3 col-lg-2 shadow-lg mb-5 bg-body rounded p-2 desp">
//               <h3>Dessert</h3>
//                 <h5 className="s"> Discover! sweet in everything </h5>
//             </div>
//            </div>
//        </div>  
//        <div className="mb-5 maindiv"> 
//           <div className="col-6 col-md-3 col-lg-2 d-inline-flex bd-highlight img"> <img src={beverages} alt="" style={{width: "150px",height: "170px"}}/>
//             <div className="col-6 col-md-3 col-lg-2 shadow-lg mb-5 bg-body rounded p-2 desp">
//               <h3>Beverages</h3>
//                 <h5 className="s"> Chill vibes only </h5>
//             </div>
//            </div>
//         </div>
//     </div>
// </div>
  )
}
