import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DonationForm from './DonationForm';

const CampaignPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    axios.get(`/api/campaigns/${id}`).then((res) => setCampaign(res.data));
  }, [id]);

  const handleDonate = async (campaignId, amount) => {
    await axios.post('/api/donations', { campaignId, amount });
    const res = await axios.get(`/api/campaigns/${id}`);
    setCampaign(res.data);
  };

  if (!campaign) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-green-800">{campaign.title}</h2>
      <p className="mb-4 text-gray-700">{campaign.description}</p>
      <p className="mb-6 text-gray-600">Raised: ₹{campaign.amountRaised} / ₹{campaign.goal}</p>
      <DonationForm campaign={campaign} onDonate={handleDonate} />
    </div>
  );
};

export default CampaignPage;
