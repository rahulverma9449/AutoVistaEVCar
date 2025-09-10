import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Selling.css';

export default function Selling() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // fetch sample properties - backend endpoint available at /api/properties
    axios.get('/api/properties')
      .then(r => setItems(r.data))
      .catch(() => {
        setItems([
          { _id: '1', title: 'Sample Flat - 850 ft²', price: 4500000, area: 850, location:'Downtown', type:'flat' }
        ]);
      });
  }, []);

  return (
    <div className="selling-container">
      <h2>All Properties</h2>
      <div className="property-grid">
        {items.map(p => (
          <div className="property-card" key={p._id}>
            <h4>{p.title}</h4>
            <p>Price: ₹ {p.price} · Area: {p.area} ft² · Location: {p.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
