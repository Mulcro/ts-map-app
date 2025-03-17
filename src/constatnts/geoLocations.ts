// In actual app driver locations would be stored in global state. These are constants for testing
import { Driver } from "../types";

type LatLngLiteral = google.maps.LatLngLiteral;


// Helper function to generate a random geolocation within a given radius (in miles) of a center point
export function generateRandomLocation(
    centerLat: number,
    centerLng: number,
    radiusInMiles: number
  ): Driver {

    const id = Math.floor(Math.random() * 100);

    // Convert radius from miles to degrees approximately.
    // Note: 1 degree is ~69 miles. Using a rough approximation.
    const radiusInDegrees = radiusInMiles / 69;
  
    // Generate two random numbers
    const u = Math.random();
    const v = Math.random();
  
    // Use square root to ensure uniform distribution within circle
    const w = radiusInDegrees * Math.sqrt(u);
    const t = 2 * Math.PI * v;
  
    // Calculate offsets in degrees
    const offsetLat = w * Math.sin(t);
    // Adjust the longitude based on latitude (cosine of the latitude)
    const offsetLng = w * Math.cos(t) / Math.cos(centerLat * (Math.PI / 180));
    
    const driver : Driver = {
      id: id,
      position: {lat: centerLat + offsetLat,
        lng: centerLng + offsetLng,}
    }
    return driver;
  }
  
  // Generate an array of 10 random geolocations within 20 miles of the given center.
  export function randomGeolocationsFromCenter(center: LatLngLiteral) : Driver[] {
    return Array.from({ length: 10 }, () =>
    generateRandomLocation(center.lat, center.lng, 15)
  )};


  export const randomGeoLocationsFromCenterOfLA : Driver[] = randomGeolocationsFromCenter({lat: 34.07533594376652 ,lng:-118.26077488618009 })