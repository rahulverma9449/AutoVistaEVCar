import express from 'express';
import jokes from '../Data/jokes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(jokes);
});

router.get('/:id', (req, res) => {
  const joke = jokes.find(j => j.id === parseInt(req.params.id));
  if (!joke) return res.status(404).json({ message: 'Joke not found' });
  res.json(joke);
});

router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newJoke = { id: jokes.length + 1, title, content };
  jokes.push(newJoke);
  res.status(201).json(newJoke);
});

router.put('/:id', (req, res) => {
  const joke = jokes.find(j => j.id === parseInt(req.params.id));
  if (!joke) return res.status(404).json({ message: 'Joke not found' });
  joke.title = req.body.title || joke.title;
  joke.content = req.body.content || joke.content;
  res.json(joke);
});

router.delete('/:id', (req, res) => {
  const index = jokes.findIndex(j => j.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Joke not found' });
  const deleted = jokes.splice(index, 1);
  res.json({ message: 'Joke deleted', joke: deleted[0] });
});

export default router;
