import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Simple SVG Icons
const Icons = {
  Droplets: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.69c-4.5 6.17-8 10.5-8 15.31 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.81-3.5-9.14-8-15.31z"/>
    </svg>
  ),
  Truck: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17 5H9c-1.1 0-2 .9-2 2v8h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4v-5l-2-5zM9 7h6l1.5 3H9V7zm3 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
    </svg>
  ),
  Heart: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  Phone: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  ),
  Mail: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  ),
  MapPin: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  Users: () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 6c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  Award: () => (
    <svg className="w-12 h-15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Leaf: () => (
    <svg className="w-10 h-12" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2c5.52 0 10 4.48 10 10 0 2.21-.72 4.26-1.93 5.91l-6.6-6.6C14.84 9.94 15 8.5 15 7c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.5.16 2.94.53 4.31l-6.6 6.6C1.72 16.26 1 14.21 1 12 1 6.48 5.48 2 12 2z"/>
      <path d="M12 17c1.66 0 3-1.34 3-3h-6c0 1.66 1.34 3 3 3z"/>
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  X: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
    </svg>
  ),
  Star: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
};

// Logo Component
const PulaLogo = ({ className = "w-12 h-12", showText = true }) => (
  <div className="flex items-center space-x-3">
    <img 
      //src="/logo.png" 
      //alt="Pula Water Logo" 
      //className={`${className} object-contain`}
    /> 
    {showText && (
      <span className="text-2xl font-bold text-white tracking-wider">PULA</span>
    )}
  </div>
);

// Ice Cube Component
const IceCube = ({ size = "w-4 h-4", delay = "0s" }) => (
  <div 
    className={`${size} ice-cube rounded opacity-20 animate-float`}
    style={{ animationDelay: delay }}
  ></div>
);

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    inquiry_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['home', 'products', 'mission', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'mission', label: 'Our Mission' },
    { id: 'contact', label: 'Contact' }
  ];

  // Product Data
  const products = [
    {
      image: "/preminum.png", 
      title: "500ml Premium Bottles",
      description: "Crystal-clear premium water in convenient 500ml bottles. Perfect for on-the-go hydration with our signature pure taste.",
      features: ["Natural spring water", "Eco-friendly packaging", "Perfec for daily hydration", "Order in bulk for events"],
      popular: true
    },
    {
      image: "/jojo.png", 
      title: "Tank Refills",
      description: "Large-scale water refills for businesses, events, and communities. Reliable supply when you need it most.",
      features: ["Up to 10,000L capacity", "Scheduled deliveries and refills", "Emergency supply available", "Commercial rates"],
      popular: false
    },
    {
      image: "/community.png", 
      title: "Community Support",
      description: "Donate/Provide clean water to community. Clean water is a basic human right.",
      features: ["Housesholds" , "Partnerships with NGOs", "Community events and sponsorships"],
      popular: false
    }
  ];

  const stats = [
    { 
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 6c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
        </svg>
      ), 
      number: "100+", 
      label: "Families Served" 
    },
    { 
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.69c-4.5 6.17-8 10.5-8 15.31 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4.81-3.5-9.14-8-15.31z"/>
        </svg>
      ), 
      number: "10k+", 
      label: "Liters Delivered" 
    },
    { 
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ), 
      number: "1", 
      label: "Years of Excellence" 
    },
    { 
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c5.52 0 10 4.48 10 10 0 2.21-.72 4.26-1.93 5.91l-6.6-6.6C14.84 9.94 15 8.5 15 7c0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.5.16 2.94.53 4.31l-6.6 6.6C1.72 16.26 1 14.21 1 12 1 6.48 5.48 2 12 2z"/>
          <path d="M12 17c1.66 0 3-1.34 3-3h-6c0 1.66 1.34 3 3 3z"/>
        </svg>
      ), 
      number: "100%", 
      label: "Sustainable Practices" 
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const templateParams = {
      to_email: 'gabriel@pulamineralwater.co.za',
      from_name: formData.user_name,
      from_email: formData.user_email,
      inquiry_type: formData.inquiry_type,
      message: formData.message
    };

    try {
      await emailjs.send(
        'service_6qsodor',    
        'template_pv8ei47',      
        templateParams,
        'x8DqcGB-i_FidrVQc'        
      );
      
      alert('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ user_name: '', user_email: '', inquiry_type: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <PulaLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-400 font-semibold' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* CTA Button */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 items-center gap-2"
            >
              Order Now
              <Icons.ArrowRight />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block px-3 py-2 text-gray-300 hover:text-blue-400 w-full text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <IceCube 
                size={`w-${2 + Math.floor(Math.random() * 4)} h-${2 + Math.floor(Math.random() * 4)}`}
                delay={`${i * 0.3}s`}
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h3 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            Purified Water from the Earth, Pure Life, Pure Water
          </h3>
          <p className="text-lg md:text-xl text-gray-300 mb-7">
            Bringing clean, sustainable water solutions to communities.
          </p>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            From premium 500ml bottled water to truck and jojo tanks refills, Pula Water brings you 
            the purest hydration while supporting those in need.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('products')}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Icons.Droplets />
              Explore Products
            </button>
            <button 
              onClick={() => scrollToSection('mission')}
              className="border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              About
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Water Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From individual hydration to community-wide solutions, we deliver pure water with purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 justify-items-center">
            {products.map((product, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border transition-all duration-300 hover:transform hover:-translate-y-2 w-full max-w-sm ${
                  product.popular 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-gray-700 hover:border-blue-500/50'
                }`}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-6 w-full h-48 rounded-xl overflow-hidden bg-gray-700">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to a gradient background if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400">Image Coming Soon</div>';
                      }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{product.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{product.description}</p>
                  
                  <ul className="space-y-2 mb-6 w-full">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <div className="w-4 h-4 text-green-400 mr-2 flex-shrink-0">
                          <Icons.CheckCircle />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto w-full">
                    <p className="text-2xl font-bold text-blue-400 mb-4">{product.price}</p>
                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-200"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-blue-200 w-12 h-12 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-sm md:text-base text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Mission Section */}
      <section id="mission" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
             Our commitment is rooted in the understanding that every drop matters. We aim to provide clean, affordable water solutions that empower communities and 
             improve lives, one household and one bottle at a time.
            </p>
          </div>

          {/* Core Mission Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Mission Statement */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 border border-blue-700 h-full">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                  <div className="w-8 h-8 text-blue-300">
                    <Icons.Heart />
                  </div>
                  Water for All
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-green-400 mt-1 flex-shrink-0">
                      <Icons.CheckCircle />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Quality & Accessibility</h4>
                      <p className="text-gray-200">To deliver top-quality purified drinking water at reasonable and accessible prices for every community.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-green-400 mt-1 flex-shrink-0">
                      <Icons.CheckCircle />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Personalized Service</h4>
                      <p className="text-gray-200">To offer each customer a tailored and attentive service experience that meets their unique needs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-green-400 mt-1 flex-shrink-0">
                      <Icons.CheckCircle />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Quality Standards</h4>
                      <p className="text-gray-200">To maintain high manufacturing standards in clean and sanitary conditions for pure, safe water.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 text-green-400 mt-1 flex-shrink-0">
                      <Icons.CheckCircle />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Community Impact</h4>
                      <p className="text-gray-200">To contribute to the well-being of our community by providing clean water and supporting local initiatives.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 rounded-2xl p-6 border border-yellow-700">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <div className="w-6 h-6 text-white-300">
                    <Icons.Star />
                  </div>
                  Our Vision
                </h3>
                <p className="text-yellow-100 leading-relaxed">
                 To be a trusted source of clean, affordable water for every community.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-2xl p-6 border border-green-700">
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <div className="w-6 h-6 text-green-300">
                    <Icons.Star />
                  </div>
                  Our Values
                </h3>
                <ul className="space-y-2 text-green-100">
                  <li>• Purity & Quality</li>
                  <li>• Community First</li>
                  <li>• Sustainability</li>
                  <li>• Accessibility</li>
                  <li>• Integrity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Mission</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Through innovation, quality service, and a deep sense of responsibility, we strive to make pure water accessible to all, one household and one bottle at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Icons.Heart />
                Support Our Cause
              </button>
              <button 
                onClick={() => scrollToSection('products')}
                className="border-2 border-blue-500 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                View Our Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to to get pure water? We're here to help with orders, partnerships, or questions.
            </p>
          </div>
            
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
             <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800">
                <div className="w-8 h-8 text-blue-400">
                  <Icons.Users />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Name</h3>
                  <p className="text-gray-300">Mr Malatji</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800">
                <div className="w-8 h-8 text-blue-400">
                  <Icons.Phone />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-300">+27 (68) 713 3193 </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800">
                <div className="w-8 h-8 text-blue-400">
                  <Icons.Mail />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-300">orders@pulamineralwater.co.za</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800">
                <div className="w-8 h-8 text-blue-400">
                  <Icons.MapPin />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Address</h3>
                  <p className="text-gray-300">1081 Michaview, Kgabalatsane</p>
                  <p className="text-gray-300">Pretoria, Gauteng, South Africa</p>
                </div>
              </div>
            </div>

           <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-white">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">I'm interested in</label>
                <select 
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="500ml Bottles Order">500ml Bottles Order</option>
                  <option value="Tank refills">Tank refills</option>
                  <option value="Community Support">Community Support</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us more about your needs..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 Pula Water. All rights reserved.</p>
            <p className="text-sm mt-1">Pure Life, Pure Water.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;