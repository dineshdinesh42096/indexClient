import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignList from './components/CampaignList';
import CampaignPage from './components/CampaignPage';
import DonationForm from './components/DonationForm';
import AddCampaign from './components/AddCampaign';
import axios from 'axios';

const App = () => {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = () => {
    axios.get('/api/campaigns')
      .then((res) => setCampaigns(res.data))
      .catch(() => setCampaigns([]));
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-green-700 text-white py-4 text-center text-2xl font-bold shadow-md">
          Online Donation Platform
        </header>
        <Routes>
          <Route path="/" element={<CampaignList campaigns={campaigns} refreshCampaigns={fetchCampaigns} />} />
          <Route path="/campaign/:id" element={<CampaignPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;