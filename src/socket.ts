import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_NODE_ENV === 'production' ? undefined : 'http://localhost:5050';

export const socket = io(URL);