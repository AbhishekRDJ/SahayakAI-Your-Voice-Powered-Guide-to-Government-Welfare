import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import schemeData from '../data/schemes.json';

const SchemeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scheme = schemeData.find((s) => s.id === id);

    if (!scheme) {
        return (
            <div className="mt-20 font-bold text-[#4682A9] text-xl text-center">
                Scheme not found. <button onClick={() => navigate('/schemes')} className="text-[#91C8E4] underline">Go Back</button>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFBDE] px-4 py-12 min-h-screen">
            <div className="bg-white/90 shadow-lg mx-auto p-8 rounded-2xl max-w-3xl">
                <h1 className="mb-4 font-bold text-[#4682A9] text-3xl">{scheme.title}</h1>
                <p className="mb-6 text-[#749BC2]">{scheme.fullDescription}</p>

                <button
                    className="bg-[#4682A9] hover:bg-[#749BC2] px-6 py-3 rounded-lg font-semibold text-white transition"
                    onClick={() => window.open(scheme.officialLink, '_blank')}
                >
                    Visit Official Website
                </button>
            </div>
        </div>
    );
};

export default SchemeDetails;
