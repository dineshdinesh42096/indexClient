import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './list.css';

const CampaignList = ({ campaigns = [], refreshCampaigns }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.goal) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post('/api/campaigns', {
        title: form.title,
        description: form.description,
        goal: parseInt(form.goal),
        amountRaised: 0
      });
      setForm({ title: '', description: '', goal: '' });
      refreshCampaigns();
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-10">
        🌱 Online Donation Platform
      </h1>

      {/* Form Section */}
      <div className="flex justify-center mb-12">
  <div className="form-container w-full max-w-xl">
    <h2 className="form-title">📌 Start a New Campaign</h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="title"
        placeholder="Campaign Title"
        value={form.title}
        onChange={handleChange}
        className="input-field"
      />
      <textarea
        name="description"
        placeholder="Campaign Description"
        value={form.description}
        onChange={handleChange}
        className="input-field"
        rows="4"
      />
      <input
        type="number"
        name="goal"
        placeholder="Target Amount (₹)"
        value={form.goal}
        onChange={handleChange}
        className="input-field"
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="submit-button"
        >
          ➕ Create Campaign
        </button>
      </div>
    </form>
  </div>
</div>

      {/* Campaign Listings */}
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">📂 Browse Ongoing Campaigns</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {campaigns.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">No campaigns available at the moment.</p>
        )}

        {campaigns.map((campaign) => (
          <div
            key={campaign._id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-2">{campaign.title}</h3>
            <p className="text-gray-700 mb-3 line-clamp-3">{campaign.description}</p>
            <div className="text-sm text-gray-600 mb-4">
              🎯 ₹{campaign.amountRaised} raised of ₹{campaign.goal}
            </div>
            <Link
              to={`/campaign/${campaign._id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              💝 View / Donate
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
