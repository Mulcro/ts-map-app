"use client";
{
  /* <div className="h-[100vh] w-[25%] bg-black text-white flex flex-col items-center justify-start pb-20">
        <h1 >Icon</h1>

        <ul className="w-[80%] text-center">
          <li className=" py-2 rounded-xl hover:bg-white/20">Dashborad</li>
          <li className=" py-2 rounded-xl hover:bg-white/20">Realtime View</li>
          <li className=" py-2 rounded-xl hover:bg-white/20">Admin</li>
          <li className=" py-2 rounded-xl hover:bg-white/20">Reports</li>
          <li className=" py-2 rounded-xl hover:bg-white/20">Maintenece</li>
        </ul>

        <ul className="w-[80%] text-center">
          <li className=" py-2 rounded-xl hover:bg-white/20">5</li>
          <li className=" py-2 rounded-xl hover:bg-white/20">6</li>5
          <li className=" py-2 rounded-xl hover:bg-white/20">7</li>
        </ul>

        <button className="w-[80%] h- rounded-xl hover:bg-white/20">Settings</button>
      </div> */
}
import { toast } from "react-toastify";

import { useState, ReactElement, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import {navigation, teams, userNavigation} from '../constatnts/navConsts';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface SideBarProps {
  children: ReactElement | ReactElement[];
}

const Sidebar = ({ children }: SideBarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [displayForm, setDisplayForm] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [data, setData] = useState<Object[]>([]);

  const checkCache = () => {
    if ("caches" in window) {
      caches
        .open("api/fetch-posts")
        .then((cache) => {
          console.log("Opened cache:", cache);
          return cache.matchAll();
        })
        .then((responses) => {
          if (responses && responses.length > 0) {
            // Process all cached responses in parallel
            return Promise.all(
              responses.map(async (resp) => {
                try {
                  const data = await resp.json();
                  return JSON.stringify(data); // or just `data` if you want objects
                } catch (error) {
                  console.error("Error parsing cached response:", error);
                  return null; // Skip this one if error
                }
              })
            );
          } else {
            console.log("No cached data found.");
            return []; // Empty array fallback
          }
        })
        .then((parsedResults) => {
          const validResults = parsedResults.filter((item) => item !== null);
          console.log("Parsed and filtered cache data:", validResults);
          setData(validResults);
        })
        .catch((error) => console.error("Error accessing cache:", error));
    }
  };

  useEffect(() => {
    checkCache();
  }, []);

  useEffect(() => {
    console.log("Data: ", data);
    console.log("Data length: ", data.length);
  }, [data]);

  //My goal is to now cache this data using the service worker
  const fetchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${count}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) return resp.json();
        throw Error;
      })
      .then((data) => {
        // console.log(JSON.stringify(data))
        setCount((prev) => prev + 1);
        const parsedData = JSON.stringify(data);
        setData((prevData) => [...prevData, parsedData]);
      })
      .catch((Err) => console.error(Err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((resp) => {
        if (resp.ok) return resp.json();
        else throw new Error();
      })
      .then((data) => {
        console.log(data);
        toast.success("User successfully created!", {
          className: "z-[9999]",
        });
        setDisplayForm(false);
      })
      .catch((error) => {
        if (!navigator.onLine)
          return toast.success(
            "You're offline but your changes will be made as soon as you're online!",
            {
              className: "z-[9999]",
            }
          );
        console.log(error);
      });
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              <item.icon
                                aria-hidden="true"
                                className={classNames(
                                  item.current
                                    ? "text-indigo-600"
                                    : "text-gray-400 group-hover:text-indigo-600",
                                  "size-6 shrink-0"
                                )}
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    {/* Buttons */}
                    Buttons
                    <div className="flex flex-row gap-2">
                      <button
                        className="bg-blue-300 px-3 py-1 rounded-xl border-1 border-solid hover:bg-blue-400 disabled:bg-gray-300 disabled:text-grey-500"
                        onClick={() => fetchData()}
                      >
                        Fetch from API
                      </button>
                      <button
                        className="bg-green-400  px-3 py-1 rounded-xl border-1 border-solid hover:bg-green-300 disabled:bg-gray-300 disabled:text-grey-500"
                        disabled={data.length <= 0 ? true : false}
                        // onClick={() => window.alert(data)}
                      >
                        Show Data
                      </button>

                      <button
                        className="bg-yellow-400 px-3 py-1 rounded-xl border-1 border-solid hover:bg-blue-400 disabled:bg-gray-300 disabled:text-grey-500"
                        onClick={() => setDisplayForm(true)}
                      >
                        Post Data
                      </button>
                      {/* {data.length > 0 && <>{window.alert(data)}</>} */}

                      {displayForm && (
                        <div className="absolute z-1000 bg-black/30 w-screen h-screen flex top-0">
                          <div className=" m-auto bg-white border-2 border-solid border-blue-400 h-[30%]">
                            <span
                              className="relative left-2 top-1 bold text-red-500 underline"
                              onClick={() => setDisplayForm(false)}
                            >
                              X
                            </span>
                            <form
                              className="flex flex-col h-full items-center justify-center gap-4"
                              onSubmit={(e) => handleSubmit(e)}
                            >
                              <label>User Id: </label>
                              <input
                                onChange={(e) => setId(Number(e.target.value))}
                                type="text"
                                placeholder="ID"
                                className="border-1 border-black w-[50%]"
                              />

                              <button
                                className="bg-blue-300 px-3 py-1 rounded-xl border-1 border-solid hover:bg-blue-400 disabled:bg-gray-300"
                                type="submit"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">
                        Adaptive View - <span className="text-gray-300">List of items on the map</span>
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-gray-50 text-indigo-600"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                              )}
                            >
                              {/* <span
                                className={classNames(
                                  team.current
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-gray-200 text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                  "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                                )}
                              > */}
                                <img src={team.icon} alt="" />
                              {/* </span> */}
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "size-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs/6 font-semibold text-gray-400">
                    Adaptive View - <span className="text-gray-300">List of items on the map</span>
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                            <img src={team.icon} alt="" className="h-[2vh]"/>
                            <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-[8vh] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-200 lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                <input
                  name="search"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
                />
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Separator */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm/6 font-semibold text-gray-900"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 size-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
