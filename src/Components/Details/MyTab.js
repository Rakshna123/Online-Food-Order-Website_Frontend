import React, { useEffect,useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from 'axios';
import queryString from 'query-string'; 
export default function () {
  const [restaurant, setRestaurant] = useState([]);
  const parsed = queryString.parse(window.location.search);
  const id = parsed.restaurant;
  console.log(id);
  useEffect(() => {
    axios.get(`https://online-food-order-website-backend-1.onrender.com/restById/${id}`)
      .then((res) => {
        setRestaurant(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
      console.log('ID:', id);
  }, [id]);
  return (
    <div>
      <h1 style={{fontSize:"45px"}}><b>{`${restaurant.name}`}</b></h1>
      <Tabs>
        <TabList>
          <Tab style={{color:"maroon", fontSize:"20px"}} ><b>Overview</b></Tab>
          <Tab  style={{color:"maroon", fontSize:"20px"}}><b>Contacts</b></Tab>
        </TabList>
        <TabPanel>
          <h1 className="head"> About this place </h1>
          <br/>
          <h2 className="subheading" style={{color:"deeppink"}}>{`Rating : ${restaurant.rating_text}`}</h2>
          <p className="content">{`City: ${restaurant.city}`}</p>
        </TabPanel>
        <TabPanel>
          <h1 className="head">Contact us</h1>
          <br/>
          <h2 className="subheading"><b>Phone number</b></h2>
          <p className="content">{`${restaurant.contact_number}`}</p>
          <h2 className="subheading"><b>{` ${restaurant.name}`}</b></h2>
          <p className="content" >{`Locality: ${restaurant.locality}`}</p>
        </TabPanel>
      </Tabs>
    </div>
  )
}

