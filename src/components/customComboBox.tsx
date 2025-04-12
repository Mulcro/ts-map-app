import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";

import { Users } from "../types";

import { useLayoutEffect, useRef, useState } from "react";

const CustomComboBox = () => {
  interface NameSearchResult {
    name: string;
  }
    const [searchQuery, setSearchQuery] = useState<string>("");

//users
const [loadingUsers,setLoadingUsers] = useState<boolean>(false);
const [usersError,setUsersError] = useState<boolean>(false);
const [usersSearchResults, setUsersSearchResults] = useState<Users[] | []>([]);

//names
  const [loadingNames,setLoadingNames] = useState<boolean>(false);
  const [namesError,setNamesError] = useState<boolean>(false);
  const [nameSearchResults, setNameSearchResults] = useState<NameSearchResult[] | []>([]);


//Places - Google API
const {ready, value, setValue, suggestions:{status, data}, clearSuggestions } = usePlacesAutocomplete();

//Names - Static Data
  const names = [
    { name: "Aaron" },
    { name: "Abigail" },
    { name: "Adam" },
    { name: "Adrian" },
    { name: "Aiden" },
    { name: "Alan" },
    { name: "Albert" },
    { name: "Alex" },
    { name: "Alexander" },
    { name: "Alexis" },
    { name: "Alice" },
    { name: "Alicia" },
    { name: "Allison" },
    { name: "Amanda" },
    { name: "Amber" },
    { name: "Amelia" },
    { name: "Amy" },
    { name: "Andrea" },
    { name: "Andrew" },
    { name: "Angela" },
    { name: "Anna" },
    { name: "Anthony" },
    { name: "Ashley" },
    { name: "Austin" },
    { name: "Ava" },
    { name: "Barbara" },
    { name: "Benjamin" },
    { name: "Bethany" },
    { name: "Betty" },
    { name: "Blake" },
    { name: "Brenda" },
    { name: "Brian" },
    { name: "Brittany" },
    { name: "Bruce" },
    { name: "Bryan" },
    { name: "Caleb" },
    { name: "Cameron" },
    { name: "Carl" },
    { name: "Carol" },
    { name: "Caroline" },
    { name: "Cassandra" },
    { name: "Catherine" },
    { name: "Charles" },
    { name: "Charlie" },
    { name: "Charlotte" },
    { name: "Chloe" },
    { name: "Chris" },
    { name: "Christian" },
    { name: "Christina" },
    { name: "Christopher" },
    { name: "Claire" },
    { name: "Clara" },
    { name: "Claudia" },
    { name: "Cole" },
    { name: "Colin" },
    { name: "Connie" },
    { name: "Courtney" },
    { name: "Craig" },
    { name: "Cynthia" },
    { name: "Daisy" },
    { name: "Daniel" },
    { name: "Danielle" },
    { name: "David" },
    { name: "Debra" },
    { name: "Dennis" },
    { name: "Diana" },
    { name: "Dominic" },
    { name: "Donald" },
    { name: "Donna" },
    { name: "Doris" },
    { name: "Dorothy" },
    { name: "Edward" },
    { name: "Elizabeth" },
    { name: "Ella" },
    { name: "Emily" },
    { name: "Emma" },
    { name: "Eric" },
    { name: "Ethan" },
    { name: "Eva" },
    { name: "Evelyn" },
    { name: "Felicia" },
    { name: "Fiona" },
    { name: "Frank" },
    { name: "Gabrielle" },
    { name: "Gail" },
    { name: "Garrett" },
    { name: "Gary" },
    { name: "Gavin" },
    { name: "George" },
    { name: "Georgia" },
    { name: "Gerald" },
    { name: "Gina" },
    { name: "Gloria" },
    { name: "Grace" },
    { name: "Harold" },
    { name: "Harry" },
    { name: "Hazel" },
    { name: "Heather" },
    { name: "Helen" },
    { name: "Henry" },
    { name: "Holly" },
    { name: "Howard" },
    { name: "Ian" },
    { name: "Isaac" },
    { name: "Irene" },
    { name: "Isabella" },
    { name: "Jack" },
    { name: "Jacob" },
    { name: "Jacqueline" },
    { name: "Jade" },
    { name: "James" },
    { name: "Jamie" },
    { name: "Janet" },
    { name: "Jared" },
    { name: "Jason" },
    { name: "Jean" },
    { name: "Jeffery" },
    { name: "Jennifer" },
    { name: "Jeremy" },
    { name: "Jerry" },
    { name: "Jessica" },
    { name: "Jesus" },
    { name: "Jill" },
    { name: "Joan" },
    { name: "Joanna" },
    { name: "Joe" },
    { name: "John" },
    { name: "Jonathan" },
    { name: "Jordan" },
    { name: "Joseph" },
    { name: "Joshua" },
    { name: "Joyce" },
    { name: "Juan" },
    { name: "Judith" },
    { name: "Julia" },
    { name: "Julian" },
    { name: "Justin" },
    { name: "Karen" },
    { name: "Katherine" },
    { name: "Kathleen" },
    { name: "Kathryn" },
    { name: "Katie" },
    { name: "Kayla" },
    { name: "Keith" },
    { name: "Kelly" },
    { name: "Kenneth" },
    { name: "Kevin" },
    { name: "Kim" },
    { name: "Kimberly" },
    { name: "Kirsten" },
    { name: "Kyle" },
    { name: "Lance" },
    { name: "Larry" },
    { name: "Lauren" },
    { name: "Leah" },
    { name: "Lee" },
    { name: "Leonard" },
    { name: "Lily" },
    { name: "Linda" },
    { name: "Lisa" },
    { name: "Logan" },
    { name: "Lois" },
    { name: "Lorraine" },
    { name: "Lucas" },
    { name: "Lucy" },
    { name: "Luis" },
    { name: "Luke" },
    { name: "Lydia" },
    { name: "Mackenzie" },
    { name: "Madison" },
    { name: "Marcus" },
    { name: "Margaret" },
    { name: "Maria" },
    { name: "Mariana" },
    { name: "Marie" },
    { name: "Marilyn" },
    { name: "Marina" },
    { name: "Mario" },
    { name: "Mark" },
    { name: "Marsha" },
    { name: "Martha" },
    { name: "Martin" },
    { name: "Mary" },
    { name: "Mason" },
    { name: "Matthew" },
    { name: "Megan" },
    { name: "Melanie" },
    { name: "Melissa" },
    { name: "Meredith" },
    { name: "Michael" },
    { name: "Michelle" },
    { name: "Miguel" },
    { name: "Miranda" },
    { name: "Molly" },
    { name: "Monica" },
    { name: "Nancy" },
    { name: "Naomi" },
    { name: "Nathan" },
    { name: "Nathaniel" },
    { name: "Neil" },
    { name: "Nicholas" },
    { name: "Nicole" },
    { name: "Noah" },
    { name: "Nora" },
    { name: "Olivia" },
    { name: "Paige" },
    { name: "Pamela" },
    { name: "Patricia" },
    { name: "Patrick" },
    { name: "Paul" },
    { name: "Paula" },
    { name: "Peggy" },
    { name: "Peter" },
    { name: "Philip" },
    { name: "Phillip" },
    { name: "Priscilla" },
    { name: "Quentin" },
    { name: "Rachel" },
    { name: "Ralph" },
    { name: "Ramon" },
    { name: "Randall" },
    { name: "Rebecca" },
    { name: "Regina" },
    { name: "Renee" },
    { name: "Richard" },
    { name: "Rick" },
    { name: "Rita" },
    { name: "Robert" },
    { name: "Robin" },
    { name: "Roger" },
    { name: "Ronald" },
    { name: "Rosa" },
    { name: "Rose" },
    { name: "Rosemary" },
    { name: "Ross" },
    { name: "Roy" },
    { name: "Russell" },
    { name: "Ruth" },
    { name: "Ryan" },
    { name: "Sabrina" },
    { name: "Samantha" },
    { name: "Samuel" },
    { name: "Sandra" },
    { name: "Sara" },
    { name: "Sarah" },
    { name: "Scott" },
    { name: "Sean" },
    { name: "Sebastian" },
    { name: "Selena" },
    { name: "Seth" },
    { name: "Sharon" },
    { name: "Sheila" },
    { name: "Shelby" },
    { name: "Simon" },
    { name: "Sonia" },
    { name: "Sophia" },
    { name: "Sophie" },
    { name: "Spencer" },
    { name: "Stacey" },
    { name: "Stanley" },
    { name: "Stephanie" },
    { name: "Stephen" },
    { name: "Steve" },
    { name: "Susan" },
    { name: "Suzanne" },
    { name: "Sydney" },
    { name: "Sylvia" },
    { name: "Tabitha" },
    { name: "Tammy" },
    { name: "Tara" },
    { name: "Taylor" },
    { name: "Teresa" },
    { name: "Terrence" },
    { name: "Terry" },
    { name: "Theresa" },
    { name: "Thomas" },
    { name: "Tiffany" },
    { name: "Timothy" },
    { name: "Todd" },
    { name: "Tony" },
    { name: "Tracy" },
    { name: "Travis" },
    { name: "Trevor" },
    { name: "Tristan" },
    { name: "Troy" },
    { name: "Tyler" },
    { name: "Valerie" },
    { name: "Vanessa" },
    { name: "Veronica" },
    { name: "Victor" },
    { name: "Victoria" },
    { name: "Vincent" },
    { name: "Violet" },
    { name: "Virginia" },
    { name: "Vivian" },
    { name: "Wade" },
    { name: "Walter" },
    { name: "Warren" },
    { name: "Wayne" },
    { name: "Wendy" },
    { name: "Whitney" },
    { name: "William" },
    { name: "Willie" },
    { name: "Wyatt" },
    { name: "Xavier" },
    { name: "Yolanda" },
    { name: "Yvonne" },
    { name: "Zachary" },
    { name: "Zoe" },
    { name: "Abdul" },
    { name: "Abid" },
    { name: "Aamir" },
    { name: "Ayaan" },
    { name: "Basil" },
    { name: "Bekim" },
    { name: "Bojan" },
    { name: "Boris" },
    { name: "Branimir" },
    { name: "Caoimhe" },
    { name: "Carina" },
    { name: "Cavan" },
    { name: "Celeste" },
    { name: "Ciaran" },
    { name: "Daciana" },
    { name: "Darius" },
    { name: "Davina" },
    { name: "Dejan" },
    { name: "Desmond" },
    { name: "Darya" },
    { name: "Delia" },
    { name: "Dimitri" },
    { name: "Eamon" },
    { name: "Eileen" },
    { name: "Eliana" },
    { name: "Emiliana" },
    { name: "Emmanuelle" },
    { name: "Enrico" },
    { name: "Esmeralda" },
    { name: "Esteban" },
    { name: "Estella" },
    { name: "Fabian" },
    { name: "Farida" },
    { name: "Faustina" },
    { name: "Federica" },
    { name: "Felicity" },
    { name: "Ferdinand" },
    { name: "Fionn" },
    { name: "Florencia" },
    { name: "Franco" },
    { name: "Frederic" },
    { name: "Georgina" },
    { name: "Gianni" },
    { name: "Giselle" },
    { name: "Gunnar" },
    { name: "Haidar" },
    { name: "Hamza" },
    { name: "Harald" },
    { name: "Harmony" },
    { name: "Haroun" },
    { name: "Hasan" },
    { name: "Hesham" },
    { name: "Hiroshi" },
    { name: "Horatio" },
    { name: "Iman" },
    { name: "Inez" },
    { name: "Ingrid" },
    { name: "Isha" },
    { name: "Ismail" },
    { name: "Isra" },
    { name: "Ivana" },
    { name: "Ivanka" },
    { name: "Ivar" },
    { name: "Jabari" },
    { name: "Jacinta" },
    { name: "Jacques" },
    { name: "Jagger" },
    { name: "Jamal" },
    { name: "Jana" },
    { name: "Janice" },
    { name: "Janna" },
    { name: "Javed" },
    { name: "Jemma" },
    { name: "Jermaine" },
    { name: "Jervis" },
    { name: "Jibril" },
    { name: "Joelle" },
    { name: "Joleen" },
    { name: "Josiah" },
    { name: "Jovani" },
    { name: "Jovita" },
    { name: "Junaid" },
    { name: "Kaan" },
    { name: "Kaelyn" },
    { name: "Kahlil" },
    { name: "Kaia" },
    { name: "Kamal" },
    { name: "Kamila" },
    { name: "Karan" },
    { name: "Karel" },
    { name: "Kassandra" },
    { name: "Kaya" },
    { name: "Keira" },
    { name: "Kellan" },
    { name: "Kelton" },
    { name: "Kendra" },
    { name: "Kenyon" },
    { name: "Kian" },
    { name: "Kiara" },
    { name: "Kira" },
    { name: "Klaus" },
    { name: "Konrad" },
    { name: "Krista" },
    { name: "Kristoffer" },
    { name: "Kristine" },
    { name: "Kyra" },
    { name: "Leandro" },
    { name: "Leonora" },
    { name: "Leona" },
    { name: "Leslie" },
    { name: "Leticia" },
    { name: "Lexi" },
    { name: "Lila" },
    { name: "Liliana" },
    { name: "Lina" },
    { name: "Lionel" },
    { name: "Livia" },
    { name: "Lola" },
    { name: "Lorena" },
    { name: "Lorenzo" },
    { name: "Louisa" },
    { name: "Luciana" },
    { name: "Lucia" },
    { name: "Lucinda" },
    { name: "Luisa" },
    { name: "Lyle" },
    { name: "Lynette" },
    { name: "Lysander" },
    { name: "Magdalena" },
    { name: "Maia" },
    { name: "Maisie" },
    { name: "Malachi" },
    { name: "Malika" },
    { name: "Mandisa" },
    { name: "Manuela" },
    { name: "Marcella" },
    { name: "Marcelo" },
    { name: "Marcellus" },
    { name: "Marcia" },
    { name: "Marcos" },
    { name: "Marek" },
    { name: "Margarita" },
    { name: "Mariam" },
    { name: "Marianna" },
    { name: "Marianne" },
    { name: "Mariel" },
    { name: "Marley" },
    { name: "Marnie" },
    { name: "Marsden" },
    { name: "Martina" },
    { name: "Mauricio" },
    { name: "Maximilian" },
    { name: "Maxine" },
    { name: "Melina" },
    { name: "Melinda" },
    { name: "Mercedes" },
    { name: "Merrick" },
    { name: "Micah" },
    { name: "Mikaela" },
    { name: "Milan" },
    { name: "Milena" },
    { name: "Mireya" },
    { name: "Mitchel" },
    { name: "Moira" },
    { name: "Monroe" },
    { name: "Nadia" },
    { name: "Nadine" },
    { name: "Nala" },
    { name: "Nandini" },
    { name: "Nash" },
    { name: "Nestor" },
    { name: "Nevaeh" },
    { name: "Ngoc" },
    { name: "Nia" },
    { name: "Nicola" },
    { name: "Nicolette" },
    { name: "Nikhil" },
    { name: "Nikita" },
    { name: "Noemi" },
    { name: "Noel" },
    { name: "Norbert" },
    { name: "Octavia" },
    { name: "Odette" },
    { name: "Odin" },
    { name: "Olive" },
    { name: "Ophelia" },
    { name: "Orlando" },
    { name: "Oswald" },
    { name: "Otto" },
    { name: "Paloma" },
    { name: "Portia" }
  ];
  

//Simulating fetch to server for names
  const getNameResults = (): Promise<NameSearchResult[]> => {

    return new Promise((resolve,reject) => {
        setTimeout(() => {
            try{
                //compare the search query against the data
                const results: NameSearchResult[] = names.filter((obj) => {
                    if (obj.name.toLowerCase().includes(searchQuery.toLowerCase())) return obj;
                });
            
                resolve(results)
            }
            catch(error){
                reject(error)
            }
        }, 800);
      });

    }

  //Call get results everytime the search query changes
  //Using layouteffect to be able to trigger sychronously with searchQuery after initial render of the page and prevent 
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if(firstUpdate.current){
        firstUpdate.current = false;
        return;
    }

    //Fetch users from Mock API
    const fetchUsersSearchResults = async () => {
        try{
            setLoadingUsers(true);
            const results = await fetch("http://localhost:4000/users/search",{
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    searchQuery
                })
            });
            const parsedResults = await results.json();
            setUsersSearchResults(parsedResults);
            setLoadingUsers(false);
        }
        catch(error){
            setLoadingUsers(false);
            setUsersError(true);
        }
    }

    //Fetch names using getNamesResults promise
    const fetchNamesSearchResults = async () =>{
        try{
            setLoadingNames(true);
            const results = await getNameResults();
            setNameSearchResults(results);
            setLoadingNames(false)
        }
        catch(error){
            setLoadingNames(false);
            setNamesError(true);
        }
    }

    //Invoke fetch functions
    fetchUsersSearchResults();
    fetchNamesSearchResults();

  }, [searchQuery]);


  const googleErrorStatusResponses : string[] = ["INVALID_REQUEST" ,"OVER_QUERY_LIMIT","REQUEST_DENIED","UNKNOWN_ERROR"] 

  return (
    <div className="m-auto w-[20%]">
      {/* Search Bar */}
      <input className="border-1 border-black w-full" placeholder="Search" onChange={e => {
        setSearchQuery(e.target.value)
        setValue(e.target.value)
      }}/>
      {/* Dynamic results display for search results */}
      <div className="w-full">
        <ul className={searchQuery.length !== 0 ? "fixed bg-black/50 text-white p-2 h-[30vh] w-[20%] overflow-y-scroll " : "hidden"}>
            {/* Users */}
                {usersError && !loadingUsers &&
                    <div>ERROR</div>
                }
                {loadingUsers && !usersError &&
                    <div>Loading</div>
                }
                {usersSearchResults.length > 0 && !loadingUsers && !usersError &&
                    <>
                    <h3 className="text-center font-bold tracking-wide">Users </h3>
                    {usersSearchResults.map((obj, indx) => (
                        <li key={indx}>Username: {obj.username} | User Type: {obj.userType}</li>
                    ))}
                    </>
                }
                {(usersSearchResults.length === 0 && !loadingUsers && !usersError) &&
                    <div>No users found</div>
                }

            {/* divider */}
                <div className="h-[1px] rounded-xl my-5 w-[90%] m-auto bg-white"/>
            
            {/* places */}
                { googleErrorStatusResponses.includes(status) &&
                    <div>ERROR</div>
                }
                { googleErrorStatusResponses.includes(status) && status !== "OK" &&
                    <div>Loading</div>
                }
                {status === "OK" &&
                    <>
                    <h3 className="text-center font-bold tracking-wide">Places</h3>
                        {data.map(({place_id,description}) => (
                            <li key={place_id}>{description}</li>
                        ))}
                    </>
                }
                { status === "ZERO_RESULTS" || status === "NOT_FOUND" &&
                    <div>{status}</div>
                }

            {/* divider */}
                <div className="h-[1px] rounded-xl my-5 w-[90%] m-auto bg-white"/>

            {/* names */}
                {namesError && !loadingNames &&
                    <div>ERROR</div>
                }
                {loadingNames && !namesError &&
                    <div>Loading</div>
                }
                {nameSearchResults.length > 0 && !loadingNames && !namesError &&
                    <>
                    <h3 className="text-center font-bold tracking-wide">Names </h3>
                    {nameSearchResults.map((obj, indx) => (
                        <li key={indx}>{obj.name}</li>
                    ))}
                    </>
                }
                {nameSearchResults.length === 0 && !loadingNames && !namesError &&
                    <div>No names found</div>
                }
        </ul>
      </div>
    </div>
  );
};

export default CustomComboBox;
