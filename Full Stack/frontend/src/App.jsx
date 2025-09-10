import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios.get('/api/jokes')
      .then(response => setJokes(response.data))
      .catch(error => console.error('Error fetching jokes:', error))
  }, [])

  return (
    <div> 
      <h1>inspire with coding</h1>   
      <p>JOKES: {jokes.length}</p>   
      {jokes.map((joke) => (
        <div key={joke.id} className="joke">
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </div>
  )
}

export default App
