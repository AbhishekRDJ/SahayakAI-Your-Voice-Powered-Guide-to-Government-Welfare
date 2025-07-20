import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import schemeData from '../data/schemes.json';

const SchemeSearch = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const filteredSchemes = schemeData.filter((scheme) =>
        scheme.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-[#FFFBDE] px-4 py-12 min-h-screen">
            <h1 className="mb-6 font-bold text-[#4682A9] text-3xl text-center">Search Government Schemes</h1>

            <div className="mx-auto mb-8 max-w-xl">
                <input
                    type="text"
                    placeholder="Search for a scheme (e.g. PM-KISAN)"
                    className="p-4 border border-[#91C8E4] rounded-xl focus:outline-none focus:ring-[#749BC2] focus:ring-2 w-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="space-y-6 mx-auto max-w-3xl">
                {filteredSchemes.map((scheme) => (
                    <div
                        key={scheme.id}
                        className="bg-white/80 shadow-md hover:shadow-lg p-6 border border-[#91C8E4]/20 rounded-xl transition cursor-pointer"
                        onClick={() => navigate(`/schemes/${scheme.id}`)}
                    >
                        <h2 className="font-bold text-[#4682A9] text-xl">{scheme.title}</h2>
                        <p className="mt-2 text-[#749BC2]">{scheme.shortDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchemeSearch;
