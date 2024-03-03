import { useState, useEffect } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import axios from 'axios';

const Layout = ({ children }: PropsWithChildren) => {
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(position.coords);
      });
    }
  }, []);

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

        <button onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              setGeolocation(position.coords);
            });
          } else {
            setGeolocation(null);
          }

          const API_KEY = '090cd72862msh625177d2792eaf9p15b7b1jsndadbf6a4b3c6'; // Replace with your actual API key
          const API_URL = 'https://apishub.com/api/address-from-to-latitude-longitude';

          async function getCoordinatesToAddress(geolocation.latitude, geolocation.longitude) {
            try {
              const response = await axios.get(API_URL, {
                params: {
                  lat: Latitude,
                  lon: Longitude,
                  apiKey: API_KEY,
                },
              });

              const address = response.data.address;
              console.log('Converted address:', address);
              return address;
            } catch (error) {
              console.error('Error converting coordinates to address:', error.message);
            }
          }

          // Example usage:
          getCoordinatesToAddress({Latitude}, {Longitude}); // Replace with the found coordinates

          const axios = require('axios');

          const options = {
            method: 'GET',
            url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/auto-complete',
            params: {text: {response}},
            headers: {
              'X-RapidAPI-Key': '090cd72862msh625177d2792eaf9p15b7b1jsndadbf6a4b3c6',
              'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
            }
          };

          try {
            const response = await axios.request(options);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }

        }}>Try It</button>

        <div id="demo"></div>

        {children}
      </main>
    </div>
  );
};

export default Layout;
 