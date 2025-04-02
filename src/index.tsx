import { useLoadScript } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import MapComp from "./components/map.tsx";
import { useEffect, useState } from "react";
import { socket } from "./socket.ts";
import LocationProvider from "./context/LocationProvider.tsx";
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from "./components/sidebar.tsx";

const libs: Library[] = ["places"];

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  //network Error
  const networkError = () => toast("You're offline", {
    className: "z-[9999]"
  });


  useEffect(() => {
    if(!navigator.onLine)
      networkError

    function onConnect() {
      setIsConnected(true);
      console.log("Connected", isConnected);
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("Disconnected");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_Google_Maps_Api_Key,
    libraries: libs,
  });

  return (
    <div className="bg-gray-200 flex flex-col">
      <Sidebar>
        <ToastContainer
          position="top-center"
          className={"rounded-xl"}
        />
          
        {/* Have to store in <> </> to prevent children type error */}
        <>{
          !isLoaded && <>Loading...</>}
          {isLoaded && (
            <LocationProvider>
              <MapComp />
            </LocationProvider>
          )}
        </>
      </Sidebar>
    </div>
  );
};

export default Home;
