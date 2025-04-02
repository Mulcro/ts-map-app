import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useContext,
  useEffect,
} from "react";
import {
  GoogleMap,
  Marker,
  // DirectionsRenderer,
  // Circle,
  MarkerClusterer,
  // Data,
} from "@react-google-maps/api";
// import Places from "./places.tsx";
import LocationContext from "../context/LocationContext.tsx";
type LatLngLiteral = google.maps.LatLngLiteral;
// type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type MapRefType = google.maps.Map;
import {HeapItem } from "../types/global";

// TO-DO: Update location state and store in context for global access

const MapComp = () => {
  const drivers = useContext(LocationContext);
  const [driversShortList, setDriverShortList] = useState<HeapItem[]>();
  const [driverInViewIndx, setDriverInViewIndx] = useState< number | undefined>();
  // const [destination,setDestination] = useState<LatLngLiteral>();

  const driversRef = useRef(drivers);

  //Ref to access map later
  const mapRef = useRef<MapRefType | null>(null);

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 34.07533594376652, lng: -118.26077488618009 }),
    []
  );
  const options = useMemo<MapOptions>(
    () => ({
      //Map Id isn't correctly displaying custom map
      // mapId: "5ad09be0090e4b8c",
      disableDefaultUI: true,
    }),
    []
  );

  const onLoad = useCallback((map: MapRefType) => {
    mapRef.current = map;
  }, []);

  // Create a ref to hold the render count.
  // const renderCount = useRef(0);
  // renderCount.current += 1;

  // console.log("Render: " + renderCount.current);


  useEffect(() => {
    driversRef.current = drivers;
  }, [drivers]);

  // Make this smoother
  useEffect(() => {
    if (!driverInViewIndx) return;

    const intervalId = setInterval(() => {
      mapRef.current?.panTo(driversRef.current[driverInViewIndx].position);
      // console.log("Driver pos: ", driversRef.current[driverInViewIndx].position)
    }, 100);

    return () => clearInterval(intervalId);
  }, [driverInViewIndx]);

  return (
    <div className="">
      {/* This will be the control menu comp */}
      {/* <div
        id="controls"
        className="flex justify-center items-center left-0 right-0 mx-auto z-10 absolute top-[8%] w-[10vh] h-[5vh] bg-red-500"
      >
        <Places
          setDriverShortList={(drivers: HeapItem[]) => {
            setDriverShortList(drivers);
          }}
        />
      </div> */}

      <div id="map" className=" w-full overflow-hidden">
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerStyle={{ height: "92vh", width: "100%" }}
          options={options}
          onLoad={onLoad}
          onClick={() => setDriverInViewIndx(undefined)}
        >
          {driversShortList && (
            <div className="absolute w-[30vh] h-[60vh] bg-white left-10 top-30 p-[2vh] ">
              <div
                className="font-bold absolute top-0 right-5 text-red-500"
                onClick={() => setDriverShortList(undefined)}
              >
                X
              </div>
              <div>
                <h3>These Drivers are the closest to your location</h3>
              </div>
              <ul className="font-serif my-10 h-1/2 flex flex-col justify-between">
                {driversShortList.map((driver, idx) => (
                  <div key={idx}>
                    <p>Id: {driver.id}</p>
                    <p>Distance: {Math.floor(driver.distance)} meters</p>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {drivers.length > 0 && (
            <MarkerClusterer>
              {(clusterer) => (
                <>
                  {drivers.map((driver,idx) => {
                    // console.log(drivers);
                    return (
                      <Marker
                        position={driver?.position}
                        key={driver?.id}
                        clusterer={clusterer}
                        icon={{
                          url: "/car-solid.svg",
                          scaledSize: new window.google.maps.Size(20, 20), // Adjust width and height as needed
                        }}
                        onClick={() => {
                          setDriverInViewIndx(idx);
                          console.log("Id: " + driver?.id);
                          mapRef.current?.setZoom(15);
                          mapRef.current?.panTo(driver?.position);
                        }}
                      />
                    );
                  })}
                </>
              )}
            </MarkerClusterer>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComp;
