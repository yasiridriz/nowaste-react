import { useState, useEffect } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import axios from 'axios';

const Layout = ({ children }: PropsWithChildren) => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(null);
  const [locale, setLocale] = useState<string>("");

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setGeolocation(position.coords);
  //     });
  //   }
  // }, []);

  const getCoordinatesToAddress = async (latitude : number, longitude : number) => {
    const axios = require('axios');
    const options = {
      method: 'GET',
      url: 'https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi',
      params: {
        lat: latitude,
        lng: longitude,
      },
      headers: {
        'X-RapidAPI-Key': '090cd72862msh625177d2792eaf9p15b7b1jsndadbf6a4b3c6',
        'X-RapidAPI-Host': 'address-from-to-latitude-longitude.p.rapidapi.com'
      }
     };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
      
    };

  const handleTryIt = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setGeolocation(position.coords);
        const address = await getCoordinatesToAddress(position.coords.latitude, position.coords.longitude);
        const addres = address.Results[0].address;
        const latt = address.Results[0].latitude;
        const longg = address.Results[0].longitude;
        const city = address.Results[0].subregion;
        setLocale(addres);
  
        console.log('Address:', address);
        console.log(addres);
        const axios = require('axios');

        const options = {
          method: 'GET',
          url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/auto-complete',
          params: {
            text: city,
            latitude: latt,
            longitude: longg,
          },
          headers: {
            'X-RapidAPI-Key': '090cd72862msh625177d2792eaf9p15b7b1jsndadbf6a4b3c6',
            'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(options);
          console.log(response.data);
          const restaurants  = response.data.autocomplete;
          restaurants.forEach(item => {
            if (item.name && item.name.text) {
              console.log(item.name.text);
            }
          });
        } catch (error) {
          console.error(error);
        }
      
      });
    } else {
      setGeolocation(null);
    }
  };

  return (
    <div>
      <div className="fixed top-0 my-2 flex justify-center items-center gap-3 w-full font-bold">
        <Link href={"/"}>No waste</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/about"}>Who are we?</Link>
      </div>
      

      <main className="px-[15vw] pt-20">
        <h1>HTML Geolocation</h1>

        {geolocation ? (
          <p>
            Latitude: {geolocation.latitude}, Longitude:{" "}
            {geolocation.longitude}
          </p>
        ) : (
          <p>Click the button to get your coordinates.</p>
        )}
        <p> You address is : {locale} </p>

        <button onClick={handleTryIt}>Try It</button>

        <div id="demo"></div>

        {children}
      </main>
    </div>
  );
};

export default Layout;

