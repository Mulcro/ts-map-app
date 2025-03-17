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
  }, [animatedDrivers]);

  // Animate smoothly from current to target positions
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const updateLocations = (timestamp: number) => {
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      setAnimatedDrivers(prevDrivers =>
        prevDrivers.map((driver, i) => {
          // If target driver exists, interpolate toward it
          const targetDriver = targetDriversRef.current[i];
          if (!targetDriver) return driver;

          // Simple linear interpolation:
          const lerp = (start: number, end: number, t: number) =>
            start + (end - start) * t;
          // You can adjust the interpolation factor based on deltaTime for smoother movement.
          const factor = Math.min(deltaTime * 0.001, 1); // adjust factor as needed

          return {
            ...driver,
            position: {
              lat: lerp(driver.position.lat, targetDriver.position.lat, factor),
              lng: lerp(driver.position.lng, targetDriver.position.lng, factor)
            }
          };
        })
      );

      animationFrameId = requestAnimationFrame(updateLocations);
    };

    animationFrameId = requestAnimationFrame(updateLocations);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return animatedDrivers;
};