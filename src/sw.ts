import {cleanupOutdatedCaches, precacheAndRoute} from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import {CacheFirst, NetworkOnly} from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();


//cache images

const imageRoute = new Route(
    ({request, sameOrigin}) => {
        return sameOrigin && request.destination === 'image'
    },
    new CacheFirst({
        cacheName: "images"
    })
);

registerRoute(imageRoute)

//cache api calls

const fetchPosts = new Route(
    ({request}) => {
        return request.url === "https://jsonplaceholder\\.typicode\\.com/posts/\\d+"
    },
    new CacheFirst({
        cacheName: "api/fetch-posts"
    })
)

registerRoute(fetchPosts)

//TO-DO: cache navigation


//TO-DO: implement a post in the front end then implement background sync
const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
    maxRetentionTime: 24 * 60,
  });
  
  const postRoute = new Route(
    ({ request }) => {
        // Example
        // return request.url === import.meta.env.VITE_API_BASE_URL + "/task/create";
    },
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    "POST"
  );
  registerRoute(postRoute);
  
  const editRoute = new Route(
    ({ request }) => {
        // Example
        // return request.url.includes(import.meta.env.VITE_API_BASE_URL + "/task");
    },
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    "PATCH"
  );
  registerRoute(editRoute);