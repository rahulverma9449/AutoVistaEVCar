import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const Joke = mongoose.model('Joke', jokeSchema);

export default Joke;
