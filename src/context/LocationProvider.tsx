import LocationContext from './LocationContext';
import {ReactElement} from 'react';
import {useGetDriverLocation} from '../hooks/useGetDriverLocations';
import {Driver} from '../types'

interface LocationProviderContext {
    children : ReactElement
}

const LocationProvider = ({children} : LocationProviderContext) => {
    const drivers : Driver[] = useGetDriverLocation();
    // console.log(drivers);


    if(!drivers){
        sessionStorage.removeItem("token");
    }
    return (
        <LocationContext.Provider value={drivers}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider;