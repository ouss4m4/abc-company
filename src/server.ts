import app from './app';
import { Server } from 'http';
import { connect } from 'mongoose';
const port = process.env.PORT || 5000;
const server = new Server(app);

server.listen(port, () => {
  console.log(`Listening on port ${port} `);
});

let db = `mongodb+srv://bzouss:dddsales@sales-cluster.pjvvs.mongodb.net/abcompany?retryWrites=true&w=majority`;

connect(db)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => console.log(err));
