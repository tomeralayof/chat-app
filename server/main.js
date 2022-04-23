const express = require('express');
const cors = require('cors');
const app = express();
const auth = require('./routes/auth');
const friends = require('./routes/friends');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect('mongodb://localhost/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error(err));

app.use(cors());

app.use("/login",auth);
app.use("/getAuth",auth);

app.use("/addFriend",friends);

const PORT = 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));