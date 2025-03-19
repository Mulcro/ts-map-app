import {useLoadScript} from "@react-google-maps/api";
import { Library } from '@googlemaps/js-api-loader';
import MapComp from "./components/map.tsx";
import {useEffect,useState} from 'react';
import {socket} from './socket.ts'
;
import LocationProvider from "./context/LocationProvider.tsx";
const libs : Library[] = ["places"];

// TO-DO: Initialize useContext

const Home = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [count,setCount] = useState<number>(1);

    // const [fooEvents, setFooEvents] = useState([]);
    
    // interface dataType {

    // }
    const [data,setData] = useState<Object[]>([]);
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
    // const renderCount = useRef(0);
    // renderCount.current += 1;
    
    // console.log("Renders: " + renderCount.current)

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_Google_Maps_Api_Key,
        libraries: libs
    });

    const checkCache = () => {
      if ('caches' in window) {
        caches.open('testCache')
          .then(cache => {
            console.log(cache)
            //cache.match(arg) returns a single matching promise if arg is present in the cache
            //cache.matchAll() returns an array of promises representing all matching responses
            //Note: For match you're resolving one promise while for match all you need to resolve every promise
            return cache.matchAll();
          })
          .then(response => {
            if (response) {
              const newArr : Object[] = [];
              response.forEach(async (resp) => {
                try{
                  const data = await resp.json();
                  newArr.push(JSON.stringify(data));
                }
                catch(error){
                  console.error("Error parsing cached response:", error);
                }
              })
              console.log(newArr)

              setData(newArr);

            } else {
              console.log("Data not found in cache.");
            }
          })
          .catch(error => console.error("Error accessing cache:", error));
      }
    }

    useEffect(() => {
      checkCache();
    }, [])

    useEffect(() => {
      console.log(data)
      console.log("Data length: ", data.length)
    },[data])

    //My goal is to now cache this data using the service worker
    const fetchData = () => {
      
      fetch(`https://jsonplaceholder.typicode.com/posts/${count}`,{
        method: "GET",
        headers: {
          "Content-Type":"application/json"
        }
      })
      .then(resp => {
        if(resp.ok) return resp.json()
        throw Error;
      })
      .then(data => {
        // console.log(JSON.stringify(data))
        setCount(prev => prev + 1);
        const parsedData = JSON.stringify(data);
        setData(prevData => [...prevData,parsedData]);
      })
      .catch(Err => console.error(Err));
    }

    return (
      <>
      <div className="h-[10vh] w-full bg-white flex flex-row items-center justify-around">
        <button className="bg-blue-300 hover:bg-blue-400 disabled:bg-gray-300 disabled:text-grey-500" onClick={() => fetchData()}>Fetch from API</button>
        <button className="bg-green-400 hover:bg-green-300 disabled:bg-gray-300 disabled:text-grey-500" disabled={data.length <= 0 ? true : false} onClick={() => window.alert(data)}>Show Data</button>
        {data.length > 0 &&
        <>
        {window.alert(data)}
        
        </>
        }
      </div>
      {!isLoaded &&
        <>Loading...</>
      }
      {isLoaded &&
        <LocationProvider>
          <MapComp/>
        </LocationProvider>

      }
      </>
    )
    // if(!isLoaded) return <>Loading</>;
    // else return (
    //   <LocationProvider>
    //     <MapComp/>
    //   </LocationProvider>
    // )
    
}

export default Home;