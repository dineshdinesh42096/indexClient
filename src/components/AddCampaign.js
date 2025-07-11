import React, { useState } from 'react';
import axios from 'axios';

const AddCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/campaigns', { title, description, goal });
      alert("Campaign created successfully!");
      setTitle('');
      setDescription('');
      setGoal('');
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded p-6 mt-8 border">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          required
        />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          required
        ></textarea>

        <label className="block mb-2 font-semibold">Goal Amount (₹)</label>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Submit Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
