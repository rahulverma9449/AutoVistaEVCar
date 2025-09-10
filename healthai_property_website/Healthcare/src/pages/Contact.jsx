import React from 'react';
import '../styles/Contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={(e) => { e.preventDefault(); alert('Form sent (demo)'); }}>
        <div>
          <label>Name</label>
          <input required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" required />
        </div>
        <div>
          <label>Phone</label>
          <input />
        </div>
        <div>
          <label>Query</label>
          <textarea />
        </div>
        <button type="submit">Send</button>
      </form>
      <p>Office: 123, Property Lane, Your City</p>
      <p>Email: support@propertymarketplace.example</p>
    </div>
  );
}
