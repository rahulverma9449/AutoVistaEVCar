import express from 'express';
import jokeRoutes from './routes/jokeRoutes.js';

const app = express();
 
app.use(express.json());
app.use(express.static('dist'));
app.use('/api/jokes', jokeRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`  Server running at http://localhost:${PORT}`));
