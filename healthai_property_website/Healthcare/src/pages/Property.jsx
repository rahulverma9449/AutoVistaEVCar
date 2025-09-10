import { useParams } from 'react-router-dom';
import '../styles/Property.css';

export default function Property() {
  const { id } = useParams();

  return (
    <div className="property-container">
      <h2>Property Details</h2>
      <p>Property ID: {id}</p>

      <div className="property-gallery">
        Images gallery, map and description will appear here.
      </div>

      <button className="contact-seller-btn">Contact Seller</button>
    </div>
  );
}
