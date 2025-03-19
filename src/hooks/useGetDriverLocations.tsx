import { useState, useEffect, useRef } from 'react';
import { DriverTuple, Driver } from '../types';
import { socket } from '../socket.ts';

export const useGetDriverLocation = () => {
  // This state holds the positions used for rendering (animated positions)
  const [animatedDrivers, setAnimatedDrivers] = useState<Driver[]>([]);
  // This ref holds the latest target positions from the socket
  const targetDriversRef = useRef<Driver[]>([]);

  // Update target positions on socket message
  useEffect(() => {
    const handler = (data: DriverTuple[]) => {
      //Parsing data
      const driverData: Driver[] = data.map(tuple => tuple[1]);
      targetDriversRef.current = driverData;
      
      // Initialize animatedDrivers if empty, otherwise let animation interpolate
      if (animatedDrivers.length === 0) {
        setAnimatedDrivers(driverData);
      }
    };

    socket.on('batchDriverLocations', handler);
    return () => {
      socket.off('batchDriverLocations', handler);
    };
  }, []);

  // Animate smoothly from current to target positions
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();
  
    const updateLocations = (timestamp: number) => {
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
  
      // Update state using the functional updater to work with the latest state.
      setAnimatedDrivers((prevDrivers) => {
        let shouldUpdate = false;
  
        const newDrivers = prevDrivers.map((driver, i) => {
          const targetDriver = targetDriversRef.current[i];
          if (!targetDriver) return driver;
  
          // Simple linear interpolation function.
          const lerp = (start: number, end: number, t: number) =>
            start + (end - start) * t;
          // Adjust factor based on deltaTime; tweak as needed.
          const factor = Math.min(deltaTime * 0.001, 1);
  
          const newLat = lerp(driver.position.lat, targetDriver.position.lat, factor);
          const newLng = lerp(driver.position.lng, targetDriver.position.lng, factor);
  
          // Define a threshold below which we consider the change negligible.
          const THRESHOLD = 0.00005;
          const latDiff = Math.abs(newLat - driver.position.lat);
          const lngDiff = Math.abs(newLng - driver.position.lng);
  
          if (latDiff > THRESHOLD || lngDiff > THRESHOLD) {
            shouldUpdate = true;
            return {
              ...driver,
              position: { lat: newLat, lng: newLng }
            };
          }
          return driver;
        });
  
        // Only update state if at least one driver's position changed significantly.
        return shouldUpdate ? newDrivers : prevDrivers;
      });
  
      animationFrameId = requestAnimationFrame(updateLocations);
    };
  
    animationFrameId = requestAnimationFrame(updateLocations);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  

  return animatedDrivers;
};