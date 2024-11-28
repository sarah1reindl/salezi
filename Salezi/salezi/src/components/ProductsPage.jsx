import React, { useEffect, useState } from "react";
 
const API_URL = "http://192.168.1.43:1337/api";
 
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
 
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data.data); // Les données des produits sont dans "data.data"
    } catch (err) {
      setError(err.message);
    }
  };
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  return (
<div>
<h1>Liste des produits</h1>
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
<ul>
        {products.map((product) => (
<li key={product.id}>
<strong>{product.attributes.name}</strong> - {product.attributes.type} - {product.attributes.price}€
</li>
        ))}
</ul>
</div>
  );
};
 
export default ProductsPage;