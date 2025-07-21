import React, { useEffect, useState } from 'react';
import { Search, FileText, Users, Calendar, Loader2 } from 'lucide-react';
import { fetchSchemes } from '../data/schemes'
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation'


export default function SchemeSearch() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchemes()
      .then(data => {
        setSchemes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Agriculture', 'Healthcare', 'Social Welfare', 'Technology', 'Education'];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesQuery = scheme.title.toLowerCase().includes(query.toLowerCase()) ||
      scheme.shortDescription.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const handleSchemeClick = (schemeId) => {
    navigate(`/schemes/${schemeId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-[#FFFBDE] px-4 py-12 min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 w-12 h-12 text-[#4682A9] animate-spin" />
          <p className="text-[#749BC2] text-lg">Loading government schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center bg-[#FFFBDE] px-4 py-12 min-h-screen">
        <div className="max-w-md text-center">
          <div className="bg-red-100 p-6 border border-red-300 rounded-xl">
            <h2 className="mb-2 font-bold text-red-700 text-xl">Error Loading Schemes</h2>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 mt-4 px-4 py-2 rounded-lg text-white transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (<>
    <Navigation />
    <div className="bg-[#FFFBDE] mt-10 px-4 py-12 min-h-screen">

      <div className="mb-10 text-center">
        <h1 className="mb-4 font-bold text-[#4682A9] text-4xl">Search Government Schemes</h1>
        <p className="mx-auto max-w-2xl text-[#749BC2] text-lg">
          Discover government initiatives and benefits available to citizens across various sectors
        </p>
      </div>

      <div className="mx-auto mb-8 max-w-4xl">
        <div className="relative mb-6">
          <Search className="top-1/2 left-4 absolute w-5 h-5 text-[#749BC2] -translate-y-1/2 transform" />
          <input
            type="text"
            placeholder="Search for schemes (e.g., PM-KISAN, Ayushman Bharat)"
            className="bg-white/80 backdrop-blur-sm p-4 pl-12 border border-[#91C8E4] rounded-xl focus:outline-none focus:ring-[#749BC2] focus:ring-2 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition ${selectedCategory === category
                ? 'bg-[#4682A9] text-white'
                : 'bg-white/80 text-[#749BC2] border border-[#91C8E4] hover:bg-[#91C8E4] hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-6 max-w-3xl">
        <p className="text-[#749BC2] text-center">
          {filteredSchemes.length === 0 ? 'No schemes found' :
            `Found ${filteredSchemes.length} scheme${filteredSchemes.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      <div className="space-y-6 mx-auto max-w-3xl">
        {filteredSchemes.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto mb-4 w-16 h-16 text-[#91C8E4]" />
            <h3 className="mb-2 font-semibold text-[#4682A9] text-xl">No schemes found</h3>
            <p className="text-[#749BC2]">
              Try adjusting your search terms or selecting a different category
            </p>
          </div>
        ) : (
          filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="group bg-white/80 shadow-md hover:shadow-lg backdrop-blur-sm p-6 border border-[#91C8E4]/20 rounded-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              onClick={() => handleSchemeClick(scheme.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold text-[#4682A9] group-hover:text-[#2c5f7a] text-xl transition">
                  {scheme.title}
                </h2>
                <span className="bg-[#91C8E4]/20 px-3 py-1 rounded-full font-medium text-[#4682A9] text-sm">
                  {scheme.category}
                </span>
              </div>

              <p className="mb-4 text-[#749BC2] leading-relaxed">
                {scheme.shortDescription}
              </p>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-[#91C8E4]">
                  <Calendar className="mr-1 w-4 h-4" />
                  <span>Launched: {scheme.launchDate}</span>
                </div>

                <div className="font-medium text-[#4682A9] group-hover:underline">
                  View Details →
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {schemes.length > 0 && (
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm mx-auto p-6 border border-[#91C8E4]/20 rounded-xl max-w-md">
            <div className="flex justify-center items-center mb-2">
              <Users className="mr-2 w-6 h-6 text-[#4682A9]" />
              <span className="font-bold text-[#4682A9] text-2xl">{schemes.length}</span>
            </div>
            <p className="text-[#749BC2]">Government schemes available</p>
          </div>
        </div>
      )}
    </div>
  </>
  );
}