import React, { useState } from 'react';

const DonationForm = ({ campaign, onDonate }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onDonate(campaign._id, parseInt(amount));
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
      <label className="block mb-2 font-semibold">Donation Amount</label>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mb-4"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Donate Now</button>
    </form>
  );
};

export default DonationForm;
