import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h2>Find Flats, Houses & Lands at the Best Price</h2>
        <p>Search by price, location, or size (ft²).</p>
        <div>
          <input placeholder="Location" />
          <input placeholder="Min Price" />
          <input placeholder="Max Price" />
          <button>Search</button>
        </div>
      </section>

      <section>
        <h3>Why choose us?</h3>
        <ul>
          <li>Best Price Guaranteed</li>
          <li>Verified Properties</li>
          <li>Easy Financing Options</li>
        </ul>
      </section>

      <section>
        <h3>Featured Properties</h3>
        <div className="property-card">
          <h4>Modern Flat in City Center</h4>
          <p>Price: ₹ 45,00,000 · Area: 850 ft² · Location: Downtown</p>
          <Link to="/property/1">View Details</Link>
        </div>
      </section>
    </div>
  );
}
