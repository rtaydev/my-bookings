// app.js
import { server } from './mocks/server';
import App from './app/_layout'; // Your main app component

console.log('Listening to mock server');

server.listen();

export default App;
