import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("auth_code");
    navigate("/");
  };

  // Example stationery items
  const products = [
    { id: 1, name: "A4 Notebook", price: "₹120", desc: "200 pages, soft cover", img: "/notebook.jpg" },
    { id: 2, name: "Ball Pen Set", price: "₹60", desc: "Pack of 5 blue pens", img: "/pen.jpg" },
    { id: 3, name: "Geometry Box", price: "₹150", desc: "Includes scale, compass, protractor", img: "/geometry.jpg" },
    { id: 4, name: "Drawing Book", price: "₹90", desc: "40 pages, thick sheets", img: "/drawing.jpg" }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📒 Stationery Dashboard</h2>
        <p>Explore our collection of notebooks & stationery essentials</p>
      </div>

      <div className="dashboard-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} className="product-img" />
            <h3 className="product-title">{p.name}</h3>
            <p className="product-desc">{p.desc}</p>
            <p className="product-price">{p.price}</p>
            <button className="btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="dashboard-footer">
        <button onClick={signOut} className="btn-secondary">
          Sign Out
        </button>
      </div>
    </div>
  );
}
