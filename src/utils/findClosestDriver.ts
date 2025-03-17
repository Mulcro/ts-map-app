//This function will find the closest driver using the Haversine Function
import Heap from 'heap'
import { HeapItem, Driver } from '../types';
/**
    Haversine formula	

    This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points (ignoring any hills they fly over, of course!).

    via - https://www.movable-type.co.uk/scripts/latlong.html

    a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
    c = 2 ⋅ atan2( √a, √(1−a) )
    d = R ⋅ c
*/

type LatLngLiteral = google.maps.LatLngLiteral;


//Returns 3 closest drivers based on Haversine Function
export const findClosestDrivers  = (drivers: Driver[], destination : LatLngLiteral) : HeapItem[] => {

    const R = 6371e3; // metres
    const minHeap = new Heap<HeapItem>((a,b) => a.distance - b.distance)

    // Using "for...in" iterates over the array indices (keys as strings),
    // whereas "for...of" iterates over the actual elements (values) of the array.  
    for(const driver of drivers){
        const φ1 = driver.position.lat * Math.PI/180; // φ, λ in radians
        const φ2 = destination.lat * Math.PI/180;
        const Δφ = (destination.lat-driver.position.lat) * Math.PI/180;
        const Δλ = (destination.lng-driver.position.lng) * Math.PI/180;
    
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
        const d = R * c; // in metres

        minHeap.push({id: driver.id, distance: d, driverLocation: driver.position});
    }

    const closestDrivers: HeapItem[] = [];
    for(let i = 0; i<3; i++){
        const minItem = minHeap.pop();
        if (minItem) {
          closestDrivers.push(minItem);
        }
    }

    return closestDrivers;
};