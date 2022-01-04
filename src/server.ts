import app from './app';
import { Server } from 'http';

const port = process.env.PORT || 5000;
const server = new Server(app);

server.listen(port, () => {
  console.log(`Listening on port ${port} `);
});
