import React, { useState } from "react";
 
const API_URL = "http://192.168.1.43:1337/api";
 
const TransactionPage = () => {
  const [transaction, setTransaction] = useState({
    type: "Sell", 
    quantity: 1,
    productId: "",
    sellerId: "",
    position: "Pending", 
  });
 
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            type: transaction.type,
            quantity: transaction.quantity,
            position: transaction.position,
            product: transaction.productId,
            seller: transaction.sellerId,
          },
        }),
      });
 
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
 
      const data = await response.json();
      setMessage("Transaction créée avec succès !");
      setError(null);
    } catch (err) {
      setMessage(null);
      setError(err.message);
    }
  };
 
  return (
<div>
<h1>Créer une transaction</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
<form onSubmit={handleSubmit}>
<label>
          Type de transaction :
<select name="type" value={transaction.type} onChange={handleChange}>
<option value="Sell">Sell</option>
<option value="Receive">Receive</option>
</select>
</label>
<br />
<label>
          Quantité :
<input
            type="number"
            name="quantity"
            value={transaction.quantity}
            onChange={handleChange}
            min="1"
          />
</label>
<br />
<label>
          ID du produit :
<input
            type="text"
            name="productId"
            value={transaction.productId}
            onChange={handleChange}
          />
</label>
<br />
<label>
          ID du vendeur :
<input
            type="text"
            name="sellerId"
            value={transaction.sellerId}
            onChange={handleChange}
          />
</label>
<br />
<label>
          Statut :
<select name="position" value={transaction.position} onChange={handleChange}>
<option value="Pending">Pending</option>
<option value="Completed">Completed</option>
</select>
</label>
<br />
<button type="submit">Créer la transaction</button>
</form>
</div>
  );
};
 
export default TransactionPage;