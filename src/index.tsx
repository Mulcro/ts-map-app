import {useLoadScript} from "@react-google-maps/api";
import { Library } from '@googlemaps/js-api-loader';
import MapComp from "./components/map.tsx";
import {useRef,useEffect,useState} from 'react';
import {socket} from './socket.ts'
;
import LocationProvider from "./context/LocationProvider.tsx";
const libs : Library[] = ["places"];

// TO-DO: Initialize useContext

const Home = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    // const [fooEvents, setFooEvents] = useState([]);
    
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
          console.log("Connected", isConnected);
        }
    
        function onDisconnect() {
          setIsConnected(false);
          console.log("Disconnected")
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          // socket.off('foo', onFooEvent);
        };
    },[])
    
    // Create a ref to hold the render count.
    const renderCount = useRef(0);
    renderCount.current += 1;
    
    console.log("Renders: " + renderCount.current)

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_Google_Maps_Api_Key,
        libraries: libs
    });

    if(!isLoaded) return <>Loading</>;
    else return (
      <LocationProvider>
        <MapComp/>
      </LocationProvider>
    )
    
}

export default Home;