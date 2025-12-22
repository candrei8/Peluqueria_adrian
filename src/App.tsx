import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronLeft,
  ChevronRight,
  Quote,
  Zap,
  Crown,
  Sparkles
} from 'lucide-react';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isCookiePolicyModalOpen, setIsCookiePolicyModalOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  const galleryImages = [
    '/adrian local.jpg',
    '/insta_01-2.jpg',
    '/ChatGPT Image 13 sept 2025, 15_32_34.png',
    '/ChatGPT Image 13 sept 2025, 15_32_48.png'
  ];

  const testimonials = [
    {
      name: "Carlos Martínez",
      text: "Profesionales de primera. Siempre salgo satisfecho con el resultado.",
      rating: 5
    },
    {
      name: "Miguel Rodríguez",
      text: "Excelente trato y calidad. La mejor peluquería de Torrejón sin duda.",
      rating: 5
    },
    {
      name: "Antonio López",
      text: "Llevo años viniendo aquí. Siempre un trabajo impecable y profesional.",
      rating: 5
    }
  ];

  // Authentic services from Adrián Peluqueros price list
  const services = [
    // CORTE
    { name: "Niños de 0 a 5 años", price: "9,50 €", category: "CORTE", icon: Scissors, featured: false },
    { name: "Niños de 6 a 12 años", price: "11,00 €", category: "CORTE", icon: Scissors, featured: false },
    { name: "Jóvenes de 13 a 19 años", price: "13,00 €", category: "CORTE", icon: Scissors, featured: false },
    { name: "Normal", price: "15,00 €", category: "CORTE", icon: Scissors, featured: true },
    { name: "Todo con Máquina", price: "10,00 €", category: "CORTE", icon: Zap, featured: false },
    { name: "Navaja sin Lavado", price: "18,00 €", category: "CORTE", icon: Sparkles, featured: false },
    { name: "Navaja con Lavado", price: "19,00 €", category: "CORTE", icon: Sparkles, featured: true },
    { name: "Afeitado", price: "11,00 €", category: "CORTE", icon: Star, featured: false },
    { name: "Arreglo Cuello y Patillas", price: "5,00 €", category: "CORTE", icon: Clock, featured: false },
    { name: "A Militares", price: "12,00 €", category: "CORTE", icon: Crown, featured: false },
    
    // BARBA
    { name: "Afeitado", price: "10,00 €", category: "BARBA", icon: Sparkles, featured: false },
    { name: "Repaso con Máquina", price: "4,00 €", category: "BARBA", icon: Zap, featured: false },
    { name: "Arreglo sin Afeitar", price: "6,00 €", category: "BARBA", icon: Scissors, featured: false },
    { name: "Arreglo con Afeitado", price: "9,00 €", category: "BARBA", icon: Crown, featured: false },
    
    // OTROS
    { name: "Cejas", price: "2,00 €", category: "OTROS", icon: Star, featured: false },
    { name: "Marcar Rayas", price: "2,00 €", category: "OTROS", icon: Sparkles, featured: false },
    { name: "Lavar", price: "2,00 €", category: "OTROS", icon: Star, featured: false },
    { name: "Lavar y Peinar", price: "6,00 €", category: "OTROS", icon: Crown, featured: false },
    { name: "Diseños", price: "5,00 €", category: "OTROS", icon: Scissors, featured: false },
    { name: "Afeitado Pelo y Barba", price: "19,00 €", category: "OTROS", icon: Sparkles, featured: true },
    { name: "Corte Normal y Afeitado", price: "22,00 €", category: "OTROS", icon: Crown, featured: true },
  ];

  const servicesPerSlide = 6;
  const totalServiceSlides = Math.ceil(services.length / servicesPerSlide);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Check if user has already accepted/rejected cookies
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowCookieBanner(true);
      }, 1000);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setShowCookieBanner(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const nextServiceSlide = () => {
    setCurrentServiceSlide((prev) => (prev + 1) % totalServiceSlides);
  };

  const prevServiceSlide = () => {
    setCurrentServiceSlide((prev) => (prev - 1 + totalServiceSlides) % totalServiceSlides);
  };

  const getCurrentServices = () => {
    const startIndex = currentServiceSlide * servicesPerSlide;
    return services.slice(startIndex, startIndex + servicesPerSlide);
  };

  return (
    <div className="min-h-screen bg-dark-primary text-gold-light overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-accent">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pt-8 sm:pt-12 md:pt-16">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gold-primary/10 to-gold-accent/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-gold-accent/15 to-gold-primary/15 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-gold-primary/20 to-gold-accent/20 rounded-full animate-ping"></div>
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-dark-primary/40 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* 3D Barber Elements */}
          <div className="mb-8 sm:mb-12 md:mb-16 relative pt-4 sm:pt-6 md:pt-8 animate-hero-logo-fade">
            <div className="mx-auto w-56 h-56 relative transform-gpu animate-float">
              {/* Main 3D Element */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-primary via-gold-accent to-gold-dark rounded-3xl transform rotate-12 shadow-2xl shadow-gold-primary/20 animate-glow animate-card-stack-1"></div>
              <div className="absolute inset-4 bg-gradient-to-tr from-gold-accent to-gold-primary rounded-2xl transform -rotate-6 shadow-xl shadow-gold-accent/30 animate-card-stack-2"></div>
              <div className="absolute inset-8 bg-gradient-to-bl from-gold-light to-gold-accent rounded-xl shadow-lg animate-card-stack-3"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img 
                  src="/AdrianLogo.png" 
                  alt="Adrián Peluqueros Logo" 
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain animate-pulse filter drop-shadow-lg animate-logo-final logo-no-dark-mode"
                  style={{
                    imageRendering: 'crisp-edges',
                    imageRendering: '-webkit-optimize-contrast',
                    imageRendering: 'optimize-contrast',
                    msInterpolationMode: 'nearest-neighbor'
                  }}
                />
              </div>
            </div>
            {/* Light reflections */}
            <div className="absolute -inset-8 bg-gradient-radial from-gold-primary/20 via-transparent to-transparent animate-pulse"></div>
          </div>

          <h1 className="text-7xl md:text-9xl font-luxury font-black mb-8 bg-gradient-to-r from-gold-light via-gold-primary to-gold-accent bg-clip-text text-transparent leading-tight tracking-tight animate-fade-in-up animate-glow-pulse">
            <span className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] block text-center">ADRIÁN</span>
            <span className="text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] xl:text-[11rem] font-light animate-slide-in-right block mt-2 text-center text-gold-light">PELUQUEROS</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gold-muted mb-8 md:mb-16 font-body font-light tracking-wide max-w-3xl mx-auto leading-relaxed animate-slide-in-left px-4">
            Más de 50 años siendo la peluqueria de referencia de Torrejón de Ardoz
          </p>

          <div 
            className="relative inline-block px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-gold-primary to-gold-accent rounded-2xl text-lg sm:text-xl font-body font-bold text-dark-primary border border-gold-primary/20 animate-fade-in-up cursor-default"
          >
            <span className="relative z-10">Reservas online - pronto</span>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-20 left-10 transform rotate-45 opacity-40">
          <Scissors className="w-10 h-10 text-gold-accent animate-bounce" />
        </div>
        <div className="absolute top-20 right-20 transform -rotate-12 opacity-30">
          <Crown className="w-8 h-8 text-gold-primary animate-pulse" />
        </div>
      </section>

      {/* Services Section */}
      <section id="animate-services" className={`py-20 sm:py-24 md:py-32 lg:py-40 px-4 bg-gradient-to-b from-dark-secondary to-dark-primary transition-all duration-1000 ${isVisible['animate-services'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-luxury font-bold text-center mb-8 sm:mb-12 md:mb-20 text-gold-light sm:bg-gradient-to-r sm:from-gold-light sm:to-gold-accent sm:bg-clip-text sm:text-transparent animate-typewriter animate-glow-pulse">
            Nuestros Servicios
          </h2>
          
          {/* New Services Carousel */}
          <div className="relative px-4 sm:px-8 md:px-12 lg:px-16">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl">
              {/* Services Slides */}
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentServiceSlide * 100}%)` }}
              >
                {Array.from({ length: totalServiceSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-4 py-8">
                    {/* Mobile List Layout */}
                    <div className="block md:hidden">
                      <div className="space-y-3">
                        {services.slice(slideIndex * servicesPerSlide, (slideIndex + 1) * servicesPerSlide).map((service, index) => {
                          const IconComponent = service.icon;
                          
                          return (
                            <div
                              key={`mobile-${slideIndex}-${index}`}
                              className={`flex items-center justify-between bg-gradient-to-r from-dark-card/60 to-dark-accent/40 backdrop-blur-lg rounded-xl p-4 border border-gold-primary/10 hover:border-gold-primary/30 transition-all duration-300 ${
                                service.featured ? 'ring-1 ring-gold-primary/40 shadow-lg shadow-gold-primary/20' : ''
                              }`}
                            >
                              {/* Left side: Icon and Service Info */}
                              <div className="flex items-center space-x-3 flex-1">
                                {/* Icon */}
                                <div className="bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 rounded-lg p-2 flex-shrink-0">
                                  <IconComponent className="w-5 h-5 text-gold-primary" />
                                </div>
                                
                                {/* Service Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs font-body text-gold-accent bg-gold-primary/10 px-2 py-0.5 rounded-full border border-gold-primary/15">
                                      {service.category}
                                    </span>
                                    {service.featured && (
                                      <Star className="w-3 h-3 text-gold-primary flex-shrink-0" />
                                    )}
                                  </div>
                                  <h3 className="text-sm font-luxury font-semibold text-gold-light leading-tight truncate">
                                    {service.name}
                                  </h3>
                                </div>
                              </div>
                              
                              {/* Right side: Price */}
                              <div className="flex-shrink-0 ml-3">
                                <span className="text-lg font-luxury font-bold text-gold-primary">
                                  {service.price}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Desktop Card Layout */}
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                      {services.slice(slideIndex * servicesPerSlide, (slideIndex + 1) * servicesPerSlide).map((service, index) => {
                        const IconComponent = service.icon;
                        const animationClasses = [
                          'service-icon-pop-left',
                          'service-icon-bounce-up', 
                          'service-icon-pop-right',
                          'service-icon-spin-scale',
                          'service-icon-pulse-glow',
                          'service-icon-wobble'
                        ];
                        const animationClass = animationClasses[index % animationClasses.length];
                        
                        return (
                          <div
                            key={`${slideIndex}-${index}`}
                            className={`group relative bg-gradient-to-br from-dark-card/90 to-dark-accent/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 hover:from-dark-card hover:to-dark-accent transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold-primary/25 border border-gold-primary/15 hover:border-gold-primary/40 ${
                              service.featured ? 'ring-2 ring-gold-primary/60 shadow-xl shadow-gold-primary/30' : ''
                            } flex flex-col justify-between min-h-[280px] md:min-h-[320px]`}
                          >
                            {/* Featured Badge */}
                            {service.featured && (
                              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-gold-primary to-gold-accent rounded-full p-3 shadow-lg">
                                <Star className="w-5 h-5 text-dark-primary" />
                              </div>
                            )}
                            
                            {/* Card Content */}
                            <div className="flex-grow">
                              {/* Icon */}
                              <div className={`service-icon-container bg-gradient-to-br from-gold-primary/25 to-gold-accent/25 rounded-2xl p-4 w-fit mb-6 group-hover:from-gold-primary/35 group-hover:to-gold-accent/35 transition-all duration-300 ${animationClass}`}>
                                <IconComponent className="w-8 h-8 md:w-9 md:h-9 text-gold-primary transform group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              
                              {/* Category Badge */}
                              <div className="mb-4">
                                <span className="text-sm font-body text-gold-accent bg-gold-primary/15 px-3 py-1.5 rounded-full border border-gold-primary/20">
                                  {service.category}
                                </span>
                              </div>
                              
                              {/* Service Name */}
                              <h3 className="text-lg md:text-xl font-luxury font-bold mb-6 text-gold-light group-hover:text-gold-primary transition-colors duration-300 leading-tight">
                                {service.name}
                              </h3>
                            </div>
                            
                            {/* Price */}
                            <div className="flex justify-center mt-auto pt-4 border-t border-gold-primary/10">
                              <span className="text-2xl md:text-3xl font-luxury font-bold text-gold-primary group-hover:text-gold-light transition-colors duration-300">
                                {service.price}
                              </span>
                            </div>
                            
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold-primary/0 via-gold-accent/8 to-gold-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevServiceSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-dark-card/90 hover:bg-gold-primary/25 backdrop-blur-xl rounded-full p-2 transition-all duration-300 border border-gold-primary/30 hover:border-gold-primary/60 z-20 shadow-xl hover:shadow-2xl hover:shadow-gold-primary/20"
            >
              <ChevronLeft className="w-4 h-4 text-gold-primary" />
            </button>
            <button
              onClick={nextServiceSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-dark-card/90 hover:bg-gold-primary/25 backdrop-blur-xl rounded-full p-2 transition-all duration-300 border border-gold-primary/30 hover:border-gold-primary/60 z-20 shadow-xl hover:shadow-2xl hover:shadow-gold-primary/20"
            >
              <ChevronRight className="w-4 h-4 text-gold-primary" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {Array.from({ length: totalServiceSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentServiceSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentServiceSlide 
                    ? 'bg-gold-primary shadow-lg shadow-gold-primary/50 scale-125' 
                    : 'bg-gold-muted/50 hover:bg-gold-muted hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="animate-gallery" className={`py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-r from-dark-accent/30 to-dark-secondary/50 transition-all duration-1000 ${isVisible['animate-gallery'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-luxury font-bold text-center mb-8 sm:mb-12 md:mb-20 text-gold-light sm:bg-gradient-to-r sm:from-gold-light sm:to-gold-accent sm:bg-clip-text sm:text-transparent animate-typewriter animate-glow-pulse">
            Nuestro Trabajo
          </h2>
          
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-dark-primary/50 border border-gold-primary/20">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px]">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 bg-dark-card/80 hover:bg-gold-primary/20 backdrop-blur-lg rounded-full p-2 sm:p-3 transition-all duration-300 border border-gold-primary/30 hover:border-gold-primary/60"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gold-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 bg-dark-card/80 hover:bg-gold-primary/20 backdrop-blur-lg rounded-full p-2 sm:p-3 transition-all duration-300 border border-gold-primary/30 hover:border-gold-primary/60"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gold-primary" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1 h-1 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gold-primary shadow-lg shadow-gold-primary/50 scale-150 sm:scale-100' 
                      : 'bg-gold-muted/50 hover:bg-gold-muted sm:hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="animate-testimonials" className={`py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-dark-primary to-dark-secondary transition-all duration-1000 ${isVisible['animate-testimonials'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-luxury font-bold text-center mb-8 sm:mb-12 md:mb-20 text-gold-light sm:bg-gradient-to-r sm:from-gold-light sm:to-gold-accent sm:bg-clip-text sm:text-transparent animate-typewriter animate-glow-pulse">
            <span className="block sm:inline">Lo Que Dicen</span>
            <span className="block sm:inline sm:ml-2">Nuestros Clientes</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-dark-card/80 to-dark-accent/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gold-primary/10 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-primary/20 hover:border-gold-primary/30"
              >
                <div className="bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 w-fit mb-4 sm:mb-6">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-gold-primary" />
                </div>
                <p className="text-gold-light mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base md:text-lg leading-relaxed font-body font-light">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <h4 className="font-luxury font-semibold text-gold-primary text-sm sm:text-base md:text-lg">{testimonial.name}</h4>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-gold-accent fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA Section */}
      <section id="animate-booking" className={`py-12 sm:py-16 md:py-24 px-4 text-center bg-gradient-to-r from-dark-accent to-dark-secondary transition-all duration-1000 ${isVisible['animate-booking'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-luxury font-bold mb-4 sm:mb-6 md:mb-8 text-gold-light sm:bg-gradient-to-r sm:from-gold-light sm:via-gold-primary sm:to-gold-accent sm:bg-clip-text sm:text-transparent leading-tight animate-typewriter animate-glow-pulse">
            Reserva tu Cita
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gold-muted mb-8 sm:mb-12 md:mb-16 font-body font-light max-w-3xl mx-auto leading-relaxed animate-slide-in-left px-4">
            Llámanos o visítanos en nuestra peluquería en Torrejón de Ardoz
          </p>
          
          <a 
            href="tel:+34916566306"
            className="group relative inline-block px-8 sm:px-12 md:px-16 lg:px-20 py-4 sm:py-6 md:py-8 bg-gradient-to-r from-gold-primary to-gold-accent rounded-2xl sm:rounded-3xl text-lg sm:text-xl md:text-2xl font-body font-bold text-dark-primary hover:from-gold-light hover:to-gold-primary transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-gold-primary/50 border border-gold-primary/20 animate-fade-in-up"
          >
            <span className="relative z-10">Llamar Ahora</span>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold-light to-gold-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gold-primary/50 to-gold-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-dark-primary to-dark-accent py-8 sm:py-12 md:py-20 px-4 border-t border-gold-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
            {/* Location */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 mr-3 sm:mr-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gold-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-luxury font-semibold text-gold-light">Ubicación</h3>
              </div>
              <a 
                href="https://maps.app.goo.gl/fVSubKFoZQWfojKQA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base text-gold-muted hover:text-gold-primary leading-relaxed font-body transition-colors duration-300 cursor-pointer group"
              >
                <span className="group-hover:underline">
                  Calle Marmol. numero 1<br />
                  28850 Torrejón de Ardoz<br />
                  Madrid, España
                </span>
              </a>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 mr-3 sm:mr-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gold-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-luxury font-semibold text-gold-light">Horarios</h3>
              </div>
              <div className="text-sm sm:text-base text-gold-muted space-y-1 sm:space-y-2 leading-relaxed font-body">
                <p className="text-xs sm:text-sm md:text-base">Lun - Vie: 09:30 - 14:00 / 16:30 - 20:30</p>
                <p className="text-xs sm:text-sm md:text-base">Sáb: 09:00 - 14:00</p>
                <p className="text-xs sm:text-sm md:text-base">Domingo: Cerrado</p>
              </div>
            </div>

            {/* Contact & Socials */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 rounded-xl sm:rounded-2xl p-2 sm:p-3 mr-3 sm:mr-4">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gold-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-luxury font-semibold text-gold-light">Contacto</h3>
              </div>
              <a 
                href="tel:+34916566306"
                className="text-gold-muted hover:text-gold-primary mb-4 sm:mb-6 md:mb-8 text-base sm:text-lg font-body transition-colors duration-300 cursor-pointer hover:underline"
              >
                +34 916 566 306
              </a>
              
              <div className="flex justify-center space-x-3 sm:space-x-4">
                <a 
                  href="https://www.instagram.com/adrianpeluquerostorrejon/?hl=es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 hover:from-gold-primary/40 hover:to-gold-accent/40 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border border-gold-primary/20 hover:border-gold-primary/40 transform hover:scale-110"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gold-primary" />
                </a>
                <a 
                  href="https://www.facebook.com/adrianpeluquerostorrejon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold-primary/20 to-gold-accent/20 hover:from-gold-primary/40 hover:to-gold-accent/40 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 border border-gold-primary/20 hover:border-gold-primary/40 transform hover:scale-110"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gold-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16 pt-4 sm:pt-6 md:pt-8 border-t border-gold-primary/20 text-center text-gold-muted">
            <p className="text-sm sm:text-base md:text-lg font-body mb-4">&copy; 2025 Adrián Peluqueros Torrejón. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button
                onClick={() => setIsLegalModalOpen(true)}
                className="text-sm sm:text-base text-gold-muted hover:text-gold-primary transition-colors duration-300 cursor-pointer underline"
              >
                Aviso Legal
              </button>
              <button
                onClick={() => setIsCookiePolicyModalOpen(true)}
                className="text-sm sm:text-base text-gold-muted hover:text-gold-primary transition-colors duration-300 cursor-pointer underline"
              >
                Política de Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cal.com Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-primary/80 hover:bg-dark-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Cal.com Iframe */}
            <iframe
              src="https://cal.com/epsilune/peluqueria-adrian"
              className="w-full h-full border-0"
              title="Reservar Cita - Adrián Peluqueros"
            />
          </div>
        </div>
      )}

      {/* Aviso Legal Modal */}
      {isLegalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8 bg-gradient-to-br from-dark-card to-dark-accent rounded-2xl shadow-2xl overflow-hidden border border-gold-primary/20">
            {/* Close Button */}
            <button
              onClick={() => setIsLegalModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-primary/80 hover:bg-gold-primary/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gold-primary/30"
            >
              <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content */}
            <div className="p-6 sm:p-8 md:p-12 max-h-[90vh] overflow-y-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-luxury font-bold text-gold-primary mb-8 text-center">
                AVISO LEGAL
              </h1>

              <div className="space-y-8 text-gold-light font-body text-sm sm:text-base leading-relaxed">
                {/* Section 1 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">1. DATOS IDENTIFICATIVOS</h2>
                  <p className="mb-4 text-gold-muted">
                    En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), el titular de este sitio web le informa de lo siguiente:
                  </p>
                  <div className="space-y-2 text-gold-light">
                    <p><strong className="text-gold-primary">Titular:</strong> Lorenzo Peluqueros SL</p>
                    <p><strong className="text-gold-primary">NIF/CIF:</strong> B-81640120</p>
                    <p><strong className="text-gold-primary">Nombre comercial:</strong> Adrián Peluqueros</p>
                    <p><strong className="text-gold-primary">Domicilio social:</strong> Calle Mármol 1, Torrejón de Ardoz, Madrid</p>
                    <p><strong className="text-gold-primary">Correo electrónico:</strong> <a href="mailto:Pelucacesar78@gmail.com" className="text-gold-accent hover:underline">Pelucacesar78@gmail.com</a></p>
                    <p><strong className="text-gold-primary">Teléfono:</strong> <a href="tel:+34916566306" className="text-gold-accent hover:underline">916566306</a></p>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">2. OBJETO</h2>
                  <p className="mb-4 text-gold-muted">
                    El titular pone a disposición de los usuarios el presente documento con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), así como informar a todos los usuarios del sitio web respecto a cuáles son las condiciones de uso del sitio web.
                  </p>
                  <p className="text-gold-muted">
                    Toda persona que acceda a este sitio web asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí dispuestas, así como a cualquier otra disposición legal que fuera de aplicación.
                  </p>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">3. CONDICIONES DE ACCESO Y USO DEL SITIO WEB</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-2">3.1. Carácter gratuito del acceso y uso del sitio web</h3>
                      <p className="text-gold-muted">
                        El acceso y navegación en este sitio web tiene carácter gratuito. No obstante, algunos de los servicios y contenidos ofrecidos por el sitio web pueden encontrarse sujetos a la contratación previa del servicio.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-2">3.2. Registro de usuario</h3>
                      <p className="text-gold-muted">
                        Con carácter general, la prestación de los servicios no exige la previa suscripción o registro de los usuarios. No obstante, el titular condiciona el uso de algunos de los servicios a la previa cumplimentación del correspondiente registro de usuario.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-2">3.3. Veracidad de la información</h3>
                      <p className="text-gold-muted">
                        Toda la información que facilite el usuario deberá ser veraz. A estos efectos, el usuario garantiza la autenticidad de todos aquellos datos que comunique como consecuencia de la cumplimentación de los formularios necesarios para la suscripción de los servicios.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">4. CONTENIDOS</h2>
                  <p className="mb-4 text-gold-muted">
                    Los contenidos de este sitio web han sido elaborados con la mayor precisión y actualidad posible. Sin embargo, el titular no puede garantizar ni hacerse responsable de:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                    <li>La continuidad de los contenidos del sitio web</li>
                    <li>La ausencia de errores en dichos contenidos</li>
                    <li>La ausencia de virus y/o demás componentes dañinos</li>
                    <li>Los daños o perjuicios que pudieran causar a los usuarios</li>
                  </ul>
                  <div className="mt-4">
                    <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-2">4.1. Modificación de contenidos</h3>
                    <p className="text-gold-muted">
                      El titular se reserva el derecho de modificar en cualquier momento los contenidos existentes en el sitio web, así como de suprimir, limitar o impedir el acceso a dichos contenidos de manera temporal o definitiva.
                    </p>
                  </div>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">5. PROPIEDAD INTELECTUAL E INDUSTRIAL</h2>
                  <p className="mb-4 text-gold-muted">
                    Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, tecnología, software, links, contenidos, diseño gráfico, código fuente, etc.), así como las marcas y demás signos distintivos, son propiedad de Lorenzo Peluqueros SL o de terceros, no adquiriendo el usuario ningún derecho sobre los mismos por el mero uso del sitio web.
                  </p>
                  <p className="text-gold-muted">
                    Queda prohibida la reproducción, distribución, comunicación pública y transformación de los contenidos sin la autorización expresa y por escrito del titular.
                  </p>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">6. LIMITACIÓN DE RESPONSABILIDAD</h2>
                  <p className="mb-4 text-gold-muted">
                    El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar por:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                    <li>Los errores u omisiones en los contenidos</li>
                    <li>La falta de disponibilidad del sitio web o la transmisión de virus o programas maliciosos</li>
                    <li>La concurrencia de virus o de otros elementos en los contenidos que puedan producir alteraciones en los sistemas informáticos, documentos electrónicos o datos de los usuarios</li>
                  </ul>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">7. ENLACES (LINKS)</h2>
                  <p className="mb-4 text-gold-muted">
                    En el caso de que en el sitio web se dispusieran enlaces o hipervínculos hacia otros sitios de Internet, el titular no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
                  </p>
                  <p className="text-gold-muted">
                    El titular no asume ninguna responsabilidad por los contenidos de los enlaces a los que se haga referencia desde el sitio web, ni garantiza la ausencia de virus u otros elementos en los mismos que puedan producir alteraciones en el sistema informático.
                  </p>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">8. PROTECCIÓN DE DATOS</h2>
                  <p className="mb-4 text-gold-muted">
                    Para utilizar algunos de los servicios o acceder a determinados contenidos, deberá proporcionar previamente ciertos datos de carácter personal. En cumplimiento de lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, le informamos que los datos personales recabados serán objeto de tratamiento por parte del titular, con la finalidad de gestionar su solicitud, comentario o consulta.
                  </p>
                  <p className="text-gold-muted">
                    Para información detallada sobre el tratamiento de sus datos personales, consulte nuestra Política de Privacidad.
                  </p>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">9. COOKIES</h2>
                  <p className="mb-4 text-gold-muted">
                    Este sitio web puede utilizar cookies técnicas (pequeños archivos de información que el servidor envía al ordenador de quien accede a la página) para llevar a cabo determinadas funciones que son consideradas imprescindibles para el correcto funcionamiento y visualización del sitio.
                  </p>
                  <p className="text-gold-muted">
                    Para más información sobre el uso de cookies, consulte nuestra Política de Cookies.
                  </p>
                </section>

                {/* Section 10 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">10. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h2>
                  <p className="text-gold-muted">
                    Las presentes Condiciones Generales se rigen por la legislación española. Para la resolución de cualquier controversia o conflicto que pudiera surgir de la interpretación o ejecución de las presentes condiciones generales, las partes se someten expresamente a los Juzgados y Tribunales de Madrid, renunciando expresamente a cualquier otro fuero que pudiera corresponderles.
                  </p>
                </section>

                {/* Section 11 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">11. CONTACTO</h2>
                  <p className="mb-4 text-gold-muted">
                    Para cualquier consulta o sugerencia relacionada con este Aviso Legal, puede contactar con nosotros a través de:
                  </p>
                  <div className="space-y-2 text-gold-light">
                    <p><strong className="text-gold-primary">Email:</strong> <a href="mailto:Pelucacesar78@gmail.com" className="text-gold-accent hover:underline">Pelucacesar78@gmail.com</a></p>
                    <p><strong className="text-gold-primary">Teléfono:</strong> <a href="tel:+34916566306" className="text-gold-accent hover:underline">916566306</a></p>
                    <p><strong className="text-gold-primary">Dirección:</strong> Calle Mármol 1, Torrejón de Ardoz, Madrid</p>
                  </div>
                </section>

                {/* Footer */}
                <div className="pt-8 border-t border-gold-primary/20 text-center">
                  <p className="text-gold-muted text-sm">Última actualización: Noviembre 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Política de Cookies Modal */}
      {isCookiePolicyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8 bg-gradient-to-br from-dark-card to-dark-accent rounded-2xl shadow-2xl overflow-hidden border border-gold-primary/20">
            {/* Close Button */}
            <button
              onClick={() => setIsCookiePolicyModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-primary/80 hover:bg-gold-primary/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gold-primary/30"
            >
              <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content */}
            <div className="p-6 sm:p-8 md:p-12 max-h-[90vh] overflow-y-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-luxury font-bold text-gold-primary mb-8 text-center">
                POLÍTICA DE COOKIES
              </h1>

              <div className="space-y-8 text-gold-light font-body text-sm sm:text-base leading-relaxed">
                {/* Section 1 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">1. ¿QUÉ SON LAS COOKIES?</h2>
                  <p className="text-gold-muted">
                    Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
                  </p>
                </section>

                {/* Section 2 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">2. ¿QUÉ TIPOS DE COOKIES UTILIZA ESTA WEB?</h2>
                  <p className="mb-4 text-gold-muted">
                    Esta página web utiliza los siguientes tipos de cookies:
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">2.1. Cookies técnicas (necesarias)</h3>
                      <p className="mb-3 text-gold-muted">
                        Son aquellas que permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones o servicios que en ella existen. Por ejemplo:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4 mb-4">
                        <li>Controlar el tráfico y la comunicación de datos</li>
                        <li>Realizar el proceso de compra de un pedido</li>
                        <li>Utilizar elementos de seguridad durante la navegación</li>
                        <li>Almacenar contenidos para la difusión de vídeos o sonido</li>
                      </ul>
                      <p className="mb-2 text-gold-light"><strong className="text-gold-primary">Cookies utilizadas:</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Duración:</strong> Sesión</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">2.2. Cookies analíticas</h3>
                      <p className="mb-3 text-gold-muted">
                        Son aquellas que, bien tratadas por nosotros o por terceros, nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.
                      </p>
                      <p className="mb-2 text-gold-light"><strong className="text-gold-primary">Si utilizas Google Analytics u otra herramienta:</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Google Analytics</strong> (_ga, _gid, _gat): Para análisis de tráfico web</li>
                        <li><strong className="text-gold-primary">Duración:</strong> Hasta 2 años</li>
                        <li><strong className="text-gold-primary">Más información:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Política de privacidad de Google</a></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">2.3. Cookies de personalización</h3>
                      <p className="mb-3 text-gold-muted">
                        Son aquellas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario (idioma, tipo de navegador, configuración regional, etc.)
                      </p>
                      <p className="mb-2 text-gold-light"><strong className="text-gold-primary">Cookies utilizadas:</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Preferencias de idioma/región:</strong> Para recordar tus preferencias</li>
                        <li><strong className="text-gold-primary">Duración:</strong> 1 año</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">2.4. Cookies de terceros</h3>
                      <p className="mb-3 text-gold-muted">
                        Esta web puede utilizar servicios de terceros que recopilarán información con fines estadísticos, de uso del sitio por parte del usuario y para la prestación de otros servicios relacionados con la actividad del sitio web y otros servicios de Internet.
                      </p>
                      <p className="mb-2 text-gold-light"><strong className="text-gold-primary">Servicios de terceros que pueden utilizarse:</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Google Maps:</strong> Para mostrar mapas de ubicación</li>
                        <li><strong className="text-gold-primary">Redes sociales</strong> (Facebook, Instagram, etc.): Si hay botones para compartir contenido</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">3. TABLA RESUMEN DE COOKIES</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gold-primary/30 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-gold-primary/20">
                          <th className="border border-gold-primary/30 px-4 py-3 text-left text-gold-primary font-semibold">Cookie</th>
                          <th className="border border-gold-primary/30 px-4 py-3 text-left text-gold-primary font-semibold">Tipo</th>
                          <th className="border border-gold-primary/30 px-4 py-3 text-left text-gold-primary font-semibold">Titular</th>
                          <th className="border border-gold-primary/30 px-4 py-3 text-left text-gold-primary font-semibold">Finalidad</th>
                          <th className="border border-gold-primary/30 px-4 py-3 text-left text-gold-primary font-semibold">Duración</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-dark-accent/30">
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-light">_ga</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Analítica</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Google</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Análisis de tráfico</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">2 años</td>
                        </tr>
                        <tr className="bg-dark-card/50">
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-light">_gid</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Analítica</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Google</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Análisis de tráfico</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">24 horas</td>
                        </tr>
                        <tr className="bg-dark-accent/30">
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-light">preferencias</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Personalización</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Propia</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">Guardar preferencias usuario</td>
                          <td className="border border-gold-primary/30 px-4 py-3 text-gold-muted">1 año</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-gold-muted text-sm italic">
                    *Nota: Esta tabla debe actualizarse según las cookies reales que utilice tu web
                  </p>
                </section>

                {/* Section 4 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">4. BASE LEGAL</h2>
                  <p className="text-gold-muted">
                    El tratamiento de los datos recopilados a través de las cookies se basa en el consentimiento que se solicita a través del banner de cookies, a excepción de las cookies técnicas que son necesarias para la navegación.
                  </p>
                </section>

                {/* Section 5 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">5. ¿CÓMO PUEDO GESTIONAR LAS COOKIES?</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">5.1. Configuración del navegador</h3>
                      <p className="mb-3 text-gold-muted">
                        Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador de Internet:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Configuración &gt; Privacidad y seguridad &gt; Cookies</a></li>
                        <li><strong className="text-gold-primary">Firefox:</strong> <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Opciones &gt; Privacidad y seguridad &gt; Cookies</a></li>
                        <li><strong className="text-gold-primary">Safari:</strong> <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Preferencias &gt; Privacidad &gt; Cookies</a></li>
                        <li><strong className="text-gold-primary">Edge:</strong> <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Configuración &gt; Privacidad, búsqueda y servicios &gt; Cookies</a></li>
                        <li><strong className="text-gold-primary">Opera:</strong> <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Configuración &gt; Privacidad y seguridad &gt; Cookies</a></li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">5.2. Panel de configuración de cookies</h3>
                      <p className="mb-3 text-gold-muted">
                        En tu primera visita a nuestro sitio web, te mostramos un banner informativo sobre el uso de cookies donde puedes:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Aceptar todas las cookies:</strong> Permites el uso de todas las cookies</li>
                        <li><strong className="text-gold-primary">Rechazar cookies opcionales:</strong> Solo se utilizarán las cookies técnicas necesarias</li>
                        <li><strong className="text-gold-primary">Configurar cookies:</strong> Puedes elegir qué tipos de cookies aceptar</li>
                      </ul>
                      <p className="mt-3 text-gold-muted">
                        Puedes cambiar tu configuración en cualquier momento accediendo al panel de cookies desde el enlace en el pie de página.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-luxury font-semibold text-gold-primary mb-3">5.3. Herramientas de terceros</h3>
                      <p className="mb-3 text-gold-muted">
                        También puedes gestionar algunas cookies de terceros a través de estas plataformas:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                        <li><strong className="text-gold-primary">Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Complemento de inhabilitación</a></li>
                        <li><strong className="text-gold-primary">Your Online Choices:</strong> <a href="http://www.youronlinechoices.com/es/" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">www.youronlinechoices.com/es</a></li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">6. CONSECUENCIAS DE DESACTIVAR LAS COOKIES</h2>
                  <p className="mb-3 text-gold-muted">
                    Si desactivas o bloqueas las cookies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                    <li><strong className="text-gold-primary">Cookies técnicas:</strong> Algunas funcionalidades del sitio web pueden no estar disponibles</li>
                    <li><strong className="text-gold-primary">Cookies analíticas:</strong> No afectará a la navegación, pero no podremos mejorar la web con datos estadísticos</li>
                    <li><strong className="text-gold-primary">Cookies de personalización:</strong> La web no recordará tus preferencias</li>
                  </ul>
                </section>

                {/* Section 7 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">7. COOKIES DE REDES SOCIALES</h2>
                  <p className="mb-3 text-gold-muted">
                    Esta web puede incluir plugins de redes sociales (Facebook, Instagram, Twitter, etc.). Estas redes sociales pueden instalar cookies que permiten conocer tu perfil de navegación.
                  </p>
                  <p className="mb-3 text-gold-muted">
                    El titular de esta web no tiene acceso ni control sobre las cookies utilizadas por redes sociales. Para más información, consulta las políticas de cookies de las redes sociales:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gold-muted ml-4">
                    <li><a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Facebook</a></li>
                    <li><a href="https://help.instagram.com/1896641480634370" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Instagram</a></li>
                    <li><a href="https://twitter.com/es/privacy" target="_blank" rel="noopener noreferrer" className="text-gold-accent hover:underline">Twitter</a></li>
                  </ul>
                </section>

                {/* Section 8 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">8. ACTUALIZACIONES DE LA POLÍTICA DE COOKIES</h2>
                  <p className="mb-3 text-gold-muted">
                    Esta política de cookies puede ser modificada en función de exigencias legislativas o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
                  </p>
                  <p className="text-gold-muted">
                    Por ello, aconsejamos a los usuarios que la visiten periódicamente. Cuando se produzcan cambios significativos en esta política de cookies, se comunicarán a los usuarios bien mediante un aviso informativo en el sitio web o a través del correo electrónico a los usuarios registrados.
                  </p>
                </section>

                {/* Section 9 */}
                <section>
                  <h2 className="text-xl sm:text-2xl font-luxury font-semibold text-gold-accent mb-4">9. MÁS INFORMACIÓN</h2>
                  <p className="mb-4 text-gold-muted">
                    Para cualquier duda sobre el uso de cookies en este sitio web, puede contactar con nosotros en:
                  </p>
                  <div className="space-y-2 text-gold-light">
                    <p><strong className="text-gold-primary">Email:</strong> <a href="mailto:Pelucacesar78@gmail.com" className="text-gold-accent hover:underline">Pelucacesar78@gmail.com</a></p>
                    <p><strong className="text-gold-primary">Teléfono:</strong> <a href="tel:+34916566306" className="text-gold-accent hover:underline">916566306</a></p>
                    <p><strong className="text-gold-primary">Dirección:</strong> Calle Mármol 1, Torrejón de Ardoz, Madrid</p>
                  </div>
                  <p className="mt-4 text-gold-muted">
                    Para más información sobre el tratamiento de sus datos personales, consulte nuestra <button onClick={() => { setIsCookiePolicyModalOpen(false); setIsLegalModalOpen(true); }} className="text-gold-accent hover:text-gold-primary underline transition-colors duration-300"><strong>Política de Privacidad</strong></button>.
                  </p>
                </section>

                {/* Footer */}
                <div className="pt-8 border-t border-gold-primary/20 text-center">
                  <p className="text-gold-muted text-sm">Última actualización: Noviembre 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up">
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-dark-card to-dark-accent border border-gold-primary/30 rounded-2xl shadow-2xl backdrop-blur-xl p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-luxury font-semibold text-gold-primary mb-2">
                  Uso de Cookies
                </h3>
                <p className="text-sm sm:text-base text-gold-muted leading-relaxed">
                  Este sitio web utiliza cookies técnicas para garantizar el correcto funcionamiento y visualización del sitio. 
                  Al continuar navegando, acepta el uso de cookies. Para más información, consulte nuestra{' '}
                  <button
                    onClick={() => {
                      setShowCookieBanner(false);
                      setIsCookiePolicyModalOpen(true);
                    }}
                    className="text-gold-accent hover:text-gold-primary underline transition-colors duration-300"
                  >
                    Política de Cookies
                  </button>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleRejectCookies}
                  className="px-6 py-3 bg-dark-primary/50 hover:bg-dark-primary border border-gold-primary/30 hover:border-gold-primary/50 rounded-xl text-gold-light font-body font-semibold transition-all duration-300 hover:scale-105"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAcceptCookies}
                  className="px-6 py-3 bg-gradient-to-r from-gold-primary to-gold-accent hover:from-gold-light hover:to-gold-primary rounded-xl text-dark-primary font-body font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-gold-primary/30"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;