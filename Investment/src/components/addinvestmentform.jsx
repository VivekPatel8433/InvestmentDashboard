import React, { useState } from "react";

export const AddInvestmentForm = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("Stock");
    const [invested, setInvested] = useState("");

     const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !invested) return;
        onAdd({name, type, invested: parseFloat(invested), currentValue: parseFloat(invested)})
        setName("");
        setType("");
     }

     return(
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 mb-6 gap-4 grid md:grig-cols-4">
            <input type="text" placeholder="Asset Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded"></input>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
               <option>Stock</option>
               <option>ETF</option>
               <option>Crypto</option>
            </select>
            <input type="number" placeholder="Amount Invested" value={invested} onChange={(e) => setInvested(e.target.value)} className="border p-2 rounded">
            </input>
            <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Investment</button>
        </form> 
     )
}