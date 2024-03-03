import Image from "next/image";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
//@ts-ignore
import WheelComponent from "react-wheel-of-prizes";

const inter = Inter({ subsets: ["latin"] });

const segColors = [
  "#EE4040",
  "#F0CF50",
  "#815CD1",
  "#3DA5E0",
  "#34A24F",
  "#F9AA1F",
  "#EC3F3F",
  "#FF9000",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [geolocation, setGeolocation] = useState<GeolocationCoordinates | null>(
    null
  );
  const [location, setLocation] = useState<any>();
  const [locale, setLocale] = useState<any>();
  const [winningRestaurant, setWinningRestaurant] = useState<any>();
  const [restaurants, setRestaurants] = useState<any[]>();
  const [restaurantLocations, setRestaurantLocations] = useState<any>();
  const [city, setCity] = useState<any>("");

  const position = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        alert("Latitude: " + position.coords.latitude);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.error(err)
    );
  };

  useEffect(() => {
    position();
  }, []);

  useEffect(() => {
    if (location) {
      console.log(location);
      getCoordinatesToAddress(location.latitude, location.longitude);
    }
  }, [location]);

  const onFinished = (winner: any) => {
    console.log(winner);
    let winn = restaurantLocations.find((r: any) => r.name === winner);

    setWinningRestaurant(winn);
    console.log(winn);
  };

  const getCoordinatesToAddress = async (
    latitude: number,
    longitude: number
  ) => {
    const options = {
      method: "GET",
      url: "https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi",
      params: {
        lat: latitude,
        lng: longitude,
      },
      headers: {
        "X-RapidAPI-Key": "090cd72862msh625177d2792eaf9p15b7b1jsndadbf6a4b3c6",
        "X-RapidAPI-Host": "address-from-to-latitude-longitude.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);

    const options = {
      method: "GET",
      url: "https://the-fork-the-spoon.p.rapidapi.com/locations/v2/auto-complete",
      params: { text: city },
      headers: {
        "X-RapidAPI-Key": "090cd72862msh625177d2792eaf9p15b7b1jsndadbf6a4b3c6",
        "X-RapidAPI-Host": "the-fork-the-spoon.p.rapidapi.com",
      },
    };
    await axios
      .request(options)
      .then(async (res) => {
        let geoId = res.data.data.geolocation[0].id.id;
        let geoText = res.data.data.geolocation[0].name.text;
        console.log(geoId, geoText);
        setCity(res.data.data.geolocation[0].name.text);

        if (geoId) {
          const options = {
            method: "GET",
            url: "https://the-fork-the-spoon.p.rapidapi.com/locations/v2/list",
            params: {
              google_place_id: geoId,
              geo_ref: "false",
              geo_type: "locality",
            },
            headers: {
              "X-RapidAPI-Key":
                "51b69c5bbemshb17cd3a995ba2d8p17ce34jsn8f18cd88291a",
              "X-RapidAPI-Host": "the-fork-the-spoon.p.rapidapi.com",
            },
          };

          axios
            .request(options)
            .then((location) => {
              let cityId = location.data.id_city;
              const roptions = {
                method: "GET",
                url: "https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/list",
                params: {
                  queryPlaceValueCityId: cityId,
                  pageSize: "8",
                  pageNumber: "1",
                  queryPlaceValueCoordinatesLatitude: "51.5072178",
                  queryPlaceValueCoordinatesLongitude: "-0.1275862",
                },
                headers: {
                  "X-RapidAPI-Key":
                    "51b69c5bbemshb17cd3a995ba2d8p17ce34jsn8f18cd88291a",
                  "X-RapidAPI-Host": "the-fork-the-spoon.p.rapidapi.com",
                },
              };
              axios
                .request(roptions)
                .then((restaurants) => {
                  console.log(restaurants.data);
                  setRestaurantLocations(restaurants.data.data);
                  setRestaurants(restaurants.data.data.map((r: any) => r.name));
                  setIsLoading(false);
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full">
      {/* {!location && ( */}
      <h1 className="lg:text-[6em] text-4xl text-center font-bold my-10">
        DineByChance
      </h1>
      <div className="w-full max-w-xl mx-auto mb-20">
        Type in your city
        <div className="flex gap-2 justify-between my-2">
          <Input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            className="w-full"
            placeholder="Your city"
            required
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading || !(city.length > 0)}
          >
            Search
          </Button>
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
      {/* )} */}
      <div className="overflow-x-hidden pl-1 flex justify-center items-center">
        <div className="w-1/2">
          {restaurants && (
            <WheelComponent
              segments={restaurants}
              segColors={segColors}
              onFinished={(winner: any) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              className="p-0"
              isOnlyOnce={true}
              upDuration={100}
              downDuration={1000}
              fontFamily="Arial"
            />
          )}
        </div>
        <div className="w-1/2">
          {winningRestaurant && (
            <div className="mb-10">
              <p className="text-xl">
                {winningRestaurant.address.street},{" "}
                {winningRestaurant.address.postalCode},{" "}
                {winningRestaurant.address.locality}
              </p>
              <h1 className="text-2xl">
                <a
                  className="text-blue-500 hover:text-blue-700"
                  target="_blank"
                  href={`https://www.google.com/maps/place/${winningRestaurant.geo.latitude},${winningRestaurant.geo.longitude}`}
                >
                  Find on Google Maps
                </a>
              </h1>
              <img src={winningRestaurant.mainPhotoSrc} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
