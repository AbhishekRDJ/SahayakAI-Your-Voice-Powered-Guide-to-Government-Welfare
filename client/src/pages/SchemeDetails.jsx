import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Tag,
  Calendar,
  ExternalLink,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Globe,
  Loader2,
  Share2
} from 'lucide-react';
import Navigation from '../components/Navigation'
import { fetchSchemes } from '../data/schemes'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function SchemeDetails() {
  const Navigate = useNavigate()
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchemes()
      .then(data => {
        const found = data.find(s => s.id === id);
        setScheme(found);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: scheme?.title,
        text: scheme?.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBack = () => {
    Navigate(-1)
    console.log('Navigate back to schemes list');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#FFFBDE] px-4 py-12 min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 w-12 h-12 text-[#4682A9] animate-spin" />
          <p className="text-[#749BC2] text-lg">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-[#FFFBDE] px-4 py-12 min-h-screen">
        <div className="max-w-md text-center">
          <div className="bg-red-100 p-6 border border-red-300 rounded-xl">
            <AlertCircle className="mx-auto mb-4 w-12 h-12 text-red-600" />
            <h2 className="mb-2 font-bold text-red-700 text-xl">Error Loading Scheme</h2>
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!scheme) {
    return (
      <div className="flex justify-center items-center bg-[#FFFBDE] px-4 py-12 min-h-screen">
        <div className="max-w-md text-center">
          <FileText className="mx-auto mb-4 w-16 h-16 text-[#91C8E4]" />
          <h2 className="mb-2 font-bold text-[#4682A9] text-xl">Scheme Not Found</h2>
          <p className="mb-4 text-[#749BC2]">The requested scheme could not be found.</p>
          <button
            onClick={handleBack}
            className="bg-[#4682A9] hover:bg-[#2c5f7a] px-6 py-2 rounded-lg text-white transition"
          >
            Back to Schemes
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="bg-[#FFFBDE] px-4 py-8 min-h-screen">
        {/* Header with Back Button */}
        <div className="mx-auto mb-8 max-w-4xl">
          <button
            onClick={handleBack}
            className="group flex items-center mb-6 text-[#4682A9] hover:text-[#2c5f7a] transition"
          >
            <ArrowLeft className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Schemes
          </button>

          <div className="bg-white/80 shadow-lg backdrop-blur-sm p-8 border border-[#91C8E4]/20 rounded-xl">
            <div className="flex md:flex-row flex-col md:justify-between md:items-start gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#4682A9] px-4 py-1 rounded-full font-medium text-white text-sm">
                    {scheme.category}
                  </span>
                  <span className="bg-[#91C8E4]/20 px-3 py-1 rounded-full text-[#4682A9] text-sm">
                    {scheme.launchDate}
                  </span>
                </div>
                <h1 className="mb-4 font-bold text-[#4682A9] text-3xl md:text-4xl leading-tight">
                  {scheme.title}
                </h1>
                <p className="text-[#749BC2] text-lg leading-relaxed">
                  {scheme.shortDescription}
                </p>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center bg-[#91C8E4] hover:bg-[#749BC2] px-4 py-2 rounded-lg text-white transition"
              >
                <Share2 className="mr-2 w-4 h-4" />
                Share
              </button>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
              <div className="flex items-center text-[#749BC2]">
                <MapPin className="mr-2 w-5 h-5 text-[#4682A9]" />
                <span>{scheme.state}</span>
              </div>
              <div className="flex items-center text-[#749BC2]">
                <Users className="mr-2 w-5 h-5 text-[#4682A9]" />
                <span>{scheme.targetBeneficiaries}</span>
              </div>
              <div className="flex items-center text-[#749BC2]">
                <Calendar className="mr-2 w-5 h-5 text-[#4682A9]" />
                <span>Budget: {scheme.budgetAllocation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto max-w-4xl">
          {/* Left Column - Main Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h2 className="mb-4 font-bold text-[#4682A9] text-2xl">About This Scheme</h2>
              <p className="text-[#749BC2] leading-relaxed">
                {scheme.description}
              </p>
            </div>

            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h2 className="mb-4 font-bold text-[#4682A9] text-2xl">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {(scheme.eligibility || []).map((criteria, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5 text-green-500" />
                    <span className="text-[#749BC2]">{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h2 className="mb-4 font-bold text-[#4682A9] text-2xl">Key Benefits</h2>
              <ul className="space-y-3">
                {(scheme.benefits || []).map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="flex-shrink-0 mt-0.5 mr-3 w-5 h-5 text-green-500" />
                    <span className="text-[#749BC2]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h2 className="mb-4 font-bold text-[#4682A9] text-2xl">Required Documents</h2>
              <div className="gap-3 grid grid-cols-1 md:grid-cols-2">
                {(scheme.documents || []).map((doc, index) => (
                  <div key={index} className="flex items-center bg-[#91C8E4]/10 p-3 rounded-lg">
                    <FileText className="mr-2 w-4 h-4 text-[#4682A9]" />
                    <span className="text-[#749BC2]">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Application Process */}
            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h3 className="mb-4 font-bold text-[#4682A9] text-xl">How to Apply</h3>
              <p className="mb-4 text-[#749BC2] text-sm leading-relaxed">
                {scheme.applicationProcess}
              </p>
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center bg-[#4682A9] hover:bg-[#2c5f7a] px-4 py-2 rounded-lg w-full text-white transition"
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                Apply Online
              </a>
            </div>

            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h3 className="mb-4 font-bold text-[#4682A9] text-xl">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="mr-3 w-4 h-4 text-[#4682A9]" />
                  <span className="text-[#749BC2] text-sm">{scheme.helpline}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 w-4 h-4 text-[#4682A9]" />
                  <span className="text-[#749BC2] text-sm">{scheme.email}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="mr-3 w-4 h-4 text-[#4682A9]" />
                  <a
                    href={scheme.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4682A9] text-sm hover:underline"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/80 shadow-md backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl">
              <h3 className="mb-4 font-bold text-[#4682A9] text-xl">Related Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {(scheme.keywords || []).map((keyword, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-[#91C8E4]/20 px-3 py-1 rounded-full text-[#4682A9] text-sm"
                  >
                    <Tag className="mr-1 w-3 h-3" />
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}