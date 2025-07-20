import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Mic, Users, Globe, Wifi, ChevronRight, Star, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import Navigation from '../components/Navigation'



const SahayakLanding = () => {
  const navigate = useNavigate();
  // Title language toggle state
  const [isEnglish, setIsEnglish] = useState(true);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setIsEnglish((prev) => !prev); // Switch language
        setFade(true); // Fade in
      }, 500); // Fade out duration (ms)
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleConverstation = () => {
    navigate('/conversation')
  }

  // Smooth scroll to How It Works section


  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice Commands",
      description: "Speak naturally in your preferred language to get instant assistance"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Scheme Finder",
      description: "Discover relevant government schemes tailored to your needs"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multilingual Support",
      description: "Available in Hindi, English, and 15+ regional languages"
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Offline Mode",
      description: "Access essential features even without internet connectivity"
    }
  ];

  const testimonials = [
    {
      name: "Aditya Magar",
      location: "Farmer, Uttar Pradesh",
      quote: "Sahayak helped me find the PM-KISAN scheme in minutes. Now I receive ₹6000 annually!",
      rating: 4
    },
    {
      name: "Chandan Bhirud",
      location: "Rural Teacher, Gujarat",
      quote: "The voice feature in Gujarati made it so easy to understand government benefits.",
      rating: 5
    }
  ];

  return (
    <div className="bg-[#FFFBDE] min-h-screen">
      <Navigation />


      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="items-center gap-12 grid lg:grid-cols-2">
            <div className="lg:text-left text-center">
              <h1
                className={`mb-6 font-bold text-[#4682A9] text-4xl md:text-6xl leading-tight transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
              >
                {isEnglish ? (
                  <>
                    Your Digital Companion for
                    <span className="block text-[#749BC2]">Social Welfare</span>
                  </>
                ) : (
                  <>
                    आपका डिजिटल साथी
                    <span className="block text-[#749BC2]">सामाजिक कल्याण के लिए</span>
                  </>
                )}
              </h1>
              <p className="mb-8 max-w-2xl text-[#749BC2] text-lg md:text-xl">
                {isEnglish
                  ? 'Empowering farmers and rural citizens to access government schemes through simple voice commands. Get personalized assistance in your language, anytime, anywhere.'
                  : 'सरल वॉयस कमांड के ज़रिए किसानों और ग्रामीण नागरिकों को सरकारी योजनाओं तक पहुँचने में मदद करें। अपनी भाषा में, कभी भी, कहीं भी व्यक्तिगत सहायता प्राप्त करें।'}
              </p>

              <div className="flex sm:flex-row flex-col justify-center lg:justify-start gap-4">
                <button className="flex justify-center items-center space-x-2 bg-[#4682A9] hover:bg-[#749BC2] shadow-lg hover:shadow-xl px-8 py-4 rounded-full font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform" onClick={handleConverstation}>
                  <Mic className="w-5 h-5" />
                  <span>Talk to Sahayak</span>
                </button>
                <button className="flex justify-center items-center space-x-2 hover:bg-[#91C8E4] px-8 py-4 border-[#91C8E4] border-2 rounded-full font-semibold text-[#4682A9] hover:text-white text-lg transition-all duration-300" onClick={handleConverstation}>
                  <span>Learn More</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="rounded-2xl lg:w-[700px] h-96 lg:h-[600px]">
              <iframe
                src="https://my.spline.design/clonergrasscopy-ndZGLnHTVIjq92SmRr5FWBVL/"
                frameBorder="0"
                width="100%"
                height="100%"
                allow="autoplay; fullscreen"
                title="Spline 3D"
                style={{ minHeight: '100%', minWidth: '100%', border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white/60 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-[#4682A9] text-3xl md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-[#749BC2] text-lg">Get started in just a few simple steps!</p>
          </div>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
            {[
              { step: 1, title: 'Speak Your Query', desc: 'Use your voice to ask about government schemes.' },
              { step: 2, title: 'Sahayak Listens', desc: 'Our AI understands your language and intent.' },
              { step: 3, title: 'Get Personalized Info', desc: 'Receive tailored scheme recommendations instantly.' },
              { step: 4, title: 'Apply or Learn More', desc: 'Get links and guidance to apply or read details.' },
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col items-center bg-white shadow-md hover:shadow-xl p-8 rounded-2xl transition-shadow duration-300">
                <div className="flex justify-center items-center bg-[#91C8E4] mb-4 rounded-full w-14 h-14 font-bold text-[#4682A9] text-2xl group-hover:scale-110 transition-transform">{item.step}</div>
                <h3 className="mb-2 font-semibold text-[#4682A9] text-xl">{item.title}</h3>
                <p className="text-[#749BC2] text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Assistant Simulation Section */}
      <section id="voice-sim" className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <button className="mb-6 font-bold text-[#4682A9] text-3xl md:text-4xl" >Try a Voice Conversation</button>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-[#91C8E4]/30 shadow-md p-6 rounded-xl w-full max-w-md">
              <div className="flex flex-col space-y-2">
                <div className="self-start bg-[#4682A9] px-4 py-2 rounded-full max-w-xs text-white animate-bounce">How can I get a loan for my farm?</div>
                <div className="self-end bg-[#749BC2] px-4 py-2 rounded-full max-w-xs text-white animate-fade-in">You may be eligible for the Kisan Credit Card scheme. Would you like details?</div>
                <div className="self-start bg-[#4682A9] px-4 py-2 rounded-full max-w-xs text-white">Yes, tell me more.</div>
                <div className="self-end bg-[#749BC2] px-4 py-2 rounded-full max-w-xs text-white">Here are the benefits and how to apply...</div>
              </div>
            </div>
            <button className="bg-[#4682A9] hover:bg-[#749BC2] shadow mt-4 px-6 py-3 rounded-full font-semibold text-white transition-colors" onClick={handleConverstation}>Try Your Voice</button>
          </div>
        </div>
      </section>

      {/* Scheme Category Highlights Section */}
      <section id="scheme-categories" className="bg-white/60 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-[#4682A9] text-3xl md:text-4xl">Explore Schemes by Category</h2>
            <p className="mx-auto max-w-2xl text-[#749BC2] text-lg">Find schemes relevant to your needs</p>
          </div>
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: <Users className="w-8 h-8" />, label: 'Farmers', desc: 'Support for agriculture and rural livelihoods.' },
              { icon: <Globe className="w-8 h-8" />, label: 'Students', desc: 'Scholarships and education support.' },
              { icon: <Wifi className="w-8 h-8" />, label: 'Women', desc: 'Empowerment and safety schemes.' },
              { icon: <Star className="w-8 h-8" />, label: 'Senior Citizens', desc: 'Pension and healthcare benefits.' },
            ].map((cat, idx) => (
              <div key={idx} className="group flex flex-col items-center bg-white shadow-md hover:shadow-xl p-8 rounded-2xl transition-shadow hover:-translate-y-2 duration-300">
                <div className="flex justify-center items-center bg-[#91C8E4] mb-4 rounded-full w-16 h-16 text-[#4682A9] group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="mb-2 font-bold text-[#4682A9] text-lg">{cat.label}</h3>
                <p className="text-[#749BC2] text-center">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Trust Numbers Section */}
      <section id="stats" className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-[#4682A9] text-3xl md:text-4xl">Trusted by Thousands</h2>
            <p className="mx-auto max-w-2xl text-[#749BC2] text-lg">Join a growing community benefiting from Sahayak AI</p>
          </div>
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4">
            {[
              { number: '0+', label: 'Users' },
              { number: '150+', label: 'Schemes' },
              { number: '5+', label: 'Languages' },
              { number: '50+', label: 'Volunteers' },
            ].map((stat, idx) => (
              <div key={idx} className="group flex flex-col items-center bg-white shadow-md hover:shadow-xl p-8 rounded-2xl transition-shadow duration-300">
                <div className="font-extrabold text-[#4682A9] text-4xl group-hover:scale-110 transition-transform">{stat.number}</div>
                <div className="mt-2 text-[#749BC2] text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NGO / Volunteer Join Us Section */}
      <section id="join-us" className="bg-[#FFFBDE] py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-[#4682A9] text-3xl md:text-4xl">Join Us as an NGO or Volunteer</h2>
          <p className="mb-8 text-[#749BC2] text-lg">Help us reach more people and make a bigger impact. Partner with Sahayak AI or volunteer to spread awareness and support rural communities.</p>
          <button className="bg-[#4682A9] hover:bg-[#749BC2] shadow px-8 py-4 rounded-full font-semibold text-white transition-colors">Become a Partner</button>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="bg-white/50 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-[#4682A9] text-3xl md:text-4xl">
              Bridging the Digital Divide
            </h2>
          </div>

          <div className="items-center gap-12 grid md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-bold text-[#749BC2] text-2xl">The Challenge</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#91C8E4] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Complex government websites difficult to navigate</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#91C8E4] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Language barriers preventing scheme access</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#91C8E4] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Lack of awareness about available benefits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#91C8E4] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Limited internet connectivity in rural areas</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-6 font-bold text-[#4682A9] text-2xl">Our Solution</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#4682A9] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Simple voice-based interface for easy interaction</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#4682A9] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Multi-language support for regional accessibility</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#4682A9] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">AI-powered personalized scheme recommendations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#4682A9] mt-2 rounded-full w-2 h-2"></div>
                  <p className="text-[#749BC2]">Offline capabilities for areas with poor connectivity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-[#4682A9] text-3xl md:text-4xl">
              Powerful Features for Everyone
            </h2>
            <p className="mx-auto max-w-2xl text-[#749BC2] text-lg">
              Designed with simplicity and accessibility in mind, our features make government schemes accessible to all.
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/70 hover:shadow-xl p-8 border border-[#91C8E4]/20 rounded-2xl text-center transition-all hover:-translate-y-2 duration-300">
                <div className="inline-flex justify-center items-center bg-[#91C8E4] mb-6 rounded-full w-16 h-16 text-[#4682A9]">
                  {feature.icon}
                </div>
                <h3 className="mb-4 font-bold text-[#4682A9] text-xl">{feature.title}</h3>
                <p className="text-[#749BC2] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white/50 py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-[#4682A9] text-3xl md:text-4xl">
              Stories from Our Users
            </h2>
            <p className="text-[#749BC2] text-lg">Real experiences from farmers and citizens across India</p>
          </div>

          <div className="gap-8 grid md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white shadow-lg hover:shadow-xl p-8 border border-[#91C8E4]/20 rounded-2xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-current w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="mb-6 text-[#749BC2] text-lg italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-[#4682A9]">{testimonial.name}</div>
                  <div className="text-[#91C8E4]">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-[#4682A9] text-3xl md:text-4xl" >
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[#749BC2] text-lg">
            Join thousands of farmers and citizens who are already benefiting from government schemes with Sahayak AI.
          </p>
          <button className="bg-[#4682A9] hover:bg-[#749BC2] shadow-lg hover:shadow-xl px-12 py-4 rounded-full font-semibold text-white text-xl hover:scale-105 transition-all duration-300 transform" onClick={handleConverstation}>
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#4682A9] py-12 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="gap-8 grid md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex justify-center items-center bg-white rounded-full w-8 h-8">
                  <Mic className="w-4 h-4 text-[#4682A9]" />
                </div>
                <span className="font-bold text-xl">Sahayak AI</span>
              </div>
              <p className="text-[#91C8E4] leading-relaxed">
                Empowering rural India through accessible AI technology and government scheme awareness.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-lg">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-[#91C8E4] hover:text-white transition-colors">About</a>
                <a href="#features" className="block text-[#91C8E4] hover:text-white transition-colors">How it Works</a>
                <a href="#features" className="block text-[#91C8E4] hover:text-white transition-colors">Features</a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-lg">Support</h4>
              <div className="space-y-2">
                <a href="#contact" className="block text-[#91C8E4] hover:text-white transition-colors">Contact</a>
                <a href="#help" className="block text-[#91C8E4] hover:text-white transition-colors">Help Center</a>
                <a href="#privacy" className="block text-[#91C8E4] hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-lg">Get in Touch</h4>
              <div className="space-y-2 text-[#91C8E4]">
                <p>Email: hello@sahayakai.in</p>
                <p>Phone: +91 800-SAHAYAK</p>
                <p>Available in 15+ languages</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-[#749BC2] border-t text-center">
            <p className="text-[#91C8E4]">&copy; 2025 Sahayak AI. Built with ❤️ for rural India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SahayakLanding;