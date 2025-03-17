import { createContext } from 'react';
import { Driver } from '../types';

type LocationContextType = Driver[];

// Provide a default value if needed, for example an empty array and a dummy updater:
const defaultValue: LocationContextType = [];

const LocationContext = createContext<LocationContextType>(defaultValue);

export default LocationContext;