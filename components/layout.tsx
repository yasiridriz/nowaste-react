import { useState, useEffect } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";

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
        }}>Try It</button>
        <div id="demo"></div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
