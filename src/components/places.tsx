
//This comp searches for a destination and returns closest drivers

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {findClosestDrivers} from '../utils/findClosestDriver';
import { HeapItem } from "../types";
import { memo, useContext } from "react";
import LocationContext from "../context/LocationContext";

interface SearchProps {
    setDriverShortList: (drivers: HeapItem[]) => void;
}

// TO-DO: Fetch lovation data from context

const Search = memo(({setDriverShortList} : SearchProps) => {
    
    const {ready, value, setValue, suggestions:{status, data}, clearSuggestions } = usePlacesAutocomplete();

    const drivers = useContext(LocationContext);

    const handleSelectDestination = async (val: string) => {
        setValue(val, false);
        clearSuggestions();
        

        // Note: Using 'value' here can fail on the first call because setValue is asynchronous and 'value' isn't updated immediately.
        // Using the 'val' argument directly ensures that getGeocode receives the correct, current address.
        const results = await getGeocode({address: val});
        const {lat, lng} = getLatLng(results[0]);
        
        const driversShortList = findClosestDrivers(drivers,{lat,lng});
        setDriverShortList(driversShortList);
        
        // setDestination({lat,lng});
    }

    return (
        <Combobox onSelect={handleSelectDestination}>
            <ComboboxInput className="w-fit h-[5vh] p-5 bg-white rounded-xl border-solid border-black border-1 " value={value} onChange={e => setValue(e.target.value)} disabled={!ready ? true : false} placeholder="Enter place"/>
        
        <ComboboxPopover>
            <ComboboxList>
                {status === "OK" &&
                    data.map(({place_id,description}) => (
                        <ComboboxOption key={place_id} value={description}/>
                    ))
                }
            </ComboboxList>
        </ComboboxPopover>
        </Combobox>
    )
})

export default Search;