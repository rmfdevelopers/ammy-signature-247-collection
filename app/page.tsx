'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Crown, 
  Globe, 
  Sparkles, 
  Users, 
  Clock, 
  Heart, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCheck, 
  ArrowRight, 
  Loader2, 
  Menu, 
  X, 
  ImageOff,
  ShoppingBag
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

const brand = {
  name: "Ammy Signature 24/7 Collection",
  tagline: "Exquisite Crowns for the Modern Queen",
  description: "Premium handcrafted headwear and bridal accessories designed for the woman who commands presence. From avant-garde fascinators to effortless autogeles, we define Afro-luxury.",
  industry: "Fashion",
  region: "Nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1542581509-7e87190743b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxzdHJlZXQtbHV4ZSUyMGZhc2hpb258ZW58MHwwfHx8MTc3OTg2NjMyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1701923180347-ce90b2733c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwyfHxzdHJlZXQtbHV4ZSUyMGZhc2hpb258ZW58MHwwfHx8MTc3OTg2NjMyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1518627249530-af3cb4a171ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpdm9yeSUyMGJyaWRhbCUyMGZhbiUyMGZlYXRoZXJzJTIwZGV0YWlsc3xlbnwxfDB8fHwxNzc5ODY5NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1597360452016-f9d76955d0a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmFzY2luYXRvciUyMGhhdCUyMGZvciUyMHdlZGRpbmclMjBndWVzdHxlbnwxfDB8fHwxNzc5ODY5NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1701923181335-5fbc178614b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw1fHxzdHJlZXQtbHV4ZSUyMGZhc2hpb258ZW58MHwwfHx8MTc3OTg2NjMyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
  ]
};

const products = [
  { name: "Signature Autogele", description: "Pre-tied luxury gele for instant elegance without the stress.", price: "₦25,000" },
  { name: "Couture Bridal Fan", description: "Intricately detailed plumage and beadwork for the distinguished bride.", price: "₦45,000" },
  { name: "Royal Fascinator", description: "A bespoke statement piece designed for high-society weddings.", price: "₦18,500" },
  { name: "Zara Silk Scarf", description: "Versatile, premium quality scarfs for everyday sophistication.", price: "₦8,000" }
];

const features = [
  { title: "Bespoke Artistry", description: "Every piece is handcrafted to fit your unique style and occasion.", icon: Crown },
  { title: "Global Logistics", description: "Shipping our signature crowns from Abuja to queens worldwide.", icon: Globe },
  { title: "Premium Fabrics", description: "We source only the finest silks, feathers, and traditional textiles.", icon: Sparkles }
];

const contactData = {
  whatsapp: "2348108165842",
  instagram: "ammysignature247_collection",
  address: "Garki International market, El-rufai block, shop 245, Abuja Nigeria"
};

const testimonials = [
  { name: "Chidinma Okafor", text: "The autogele I ordered was the talk of the wedding! Perfectly tied and so comfortable.", role: "Lagos Bride" },
  { name: "Fatima Bello", text: "Amaka's attention to detail is unmatched. My bridal fan was a work of art.", role: "Abuja Socialite" },
  { name: "Blessing Idibia", text: "Fast shipping and the quality of the Zara scarf is incredible. Highly recommend!", role: "Regular Client" }
];

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/60 to-accent/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent text-primary flex items-center justify-center font-heading font-bold text-xl rounded-sm">A</div>
          <span className="font-heading text-lg font-bold tracking-widest text-white hidden sm:block uppercase">Ammy Signature</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Collection', 'The Founder', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium tracking-widest uppercase text-white/70 hover:text-accent transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-primary px-6 py-2.5 font-bold text-xs uppercase tracking-tighter hover:brightness-110 transition-all">
            Shop Now
          </a>
        </div>

        <button onClick={() => setMobileOpen(true)} className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-end">
          <button onClick={() => setMobileOpen(false)} className="text-white"><X size={32} /></button>
        </div>
        <div className="flex flex-col items-center gap-8 pt-12">
          {['Home', 'Collection', 'The Founder', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setMobileOpen(false)} className="text-3xl font-heading text-white">
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-8 bg-accent text-primary px-10 py-4 font-bold uppercase tracking-widest">
            Shop Now
          </a>
        </div>
      </div>
    </nav>
  );
};

export default function Page() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main>
      <Navbar />

      {/* Hero Section - HR-C Asymmetric Split */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1.2fr_1fr] items-stretch bg-primary overflow-hidden pt-20 md:pt-0">
        <div className={`flex flex-col justify-center px-8 md:px-20 py-24 transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`} ref={heroReveal.ref as any}>
          <span className="text-accent font-sans text-xs tracking-[0.4em] uppercase mb-6 opacity-80">
            {brand.industry} — {brand.region}
          </span>
          <h1 className="font-heading text-6xl md:text-[5.5rem] font-bold text-secondary leading-[0.9] tracking-tighter">
            The Art of African Adornment
          </h1>
          <p className="text-secondary/60 mt-8 text-xl max-w-lg leading-relaxed font-light">
            Step into the world of Amaka Nweke’s signature designs. Discover headwear that blends traditional heritage with modern regal luxury.
          </p>
          <div className="flex gap-6 mt-12 flex-wrap">
            <a href="#products" className="bg-accent text-primary px-10 py-5 font-bold text-sm uppercase tracking-widest hover:scale-[1.03] transition-all shadow-2xl">
              Shop the Collection
            </a>
          </div>
          <div className="mt-20 flex gap-12 border-t border-white/5 pt-10">
            <div>
              <p className="font-heading text-4xl font-bold text-accent">1k+</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Queens Served</p>
            </div>
            <div>
              <p className="font-heading text-4xl font-bold text-accent">500+</p>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">Bridal Works</p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
          <SafeImage src={IMAGES.hero} alt="Signature Headwear" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/20 to-transparent" />
        </div>
      </section>

      {/* D-RULE Divider */}
      <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <span className="text-accent/60 font-sans text-[10px] tracking-[0.6em] uppercase whitespace-nowrap">
          {brand.tagline}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Features Section - F-NUMBERED */}
      <section id="features" ref={featuresReveal.ref as any} className="py-28 px-6 bg-primary">
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-heading text-5xl font-bold text-secondary">The Ammy Experience</h2>
            <p className="text-secondary/40 mt-4 tracking-wide italic">Sharp delivery, nationwide for the modern queen.</p>
          </div>
          <div className="divide-y divide-white/5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`py-12 flex flex-col md:flex-row items-start gap-12 transition-all duration-700 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <span className="font-heading text-accent/20 text-7xl font-bold italic shrink-0 w-24">0{i+1}</span>
                  <div className="flex-1">
                    <h3 className="font-heading text-3xl font-bold text-secondary flex items-center gap-4">
                      <Icon className="text-accent" size={24} /> {f.title}
                    </h3>
                    <p className="text-secondary/50 mt-4 max-w-xl text-lg leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section - P-STAGGER */}
      <section id="collection" ref={productsReveal.ref as any} className="py-32 px-6 bg-secondary overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-6xl font-bold text-primary mb-24 text-center">The Signature Vault</h2>
          <div className="space-y-32">
            {products.map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-700 ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <div className="w-full md:w-1/2 relative">
                  <div className="aspect-[4/5] relative rounded-sm overflow-hidden shadow-2xl group">
                    <SafeImage src={IMAGES.products[i]} alt={p.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  </div>
                  <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-full h-full border border-primary/5 -z-10`} />
                </div>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs mb-4 block">0{i+1} — Editorial Choice</span>
                  <h3 className="font-heading text-5xl font-bold text-primary leading-tight">{p.name}</h3>
                  <p className="text-primary/60 mt-6 text-xl leading-relaxed font-light">{p.description}</p>
                  <div className="mt-10 flex flex-col gap-6 items-start">
                    <span className="text-4xl font-heading font-bold text-primary">{p.price}</span>
                    <a href="#contact" className="bg-primary text-secondary px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-primary transition-all">
                      Enquire Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Visionary */}
      <section id="thefounder" ref={aboutReveal.ref as any} className="py-28 bg-primary text-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              <div className="relative aspect-square max-w-md mx-auto">
                <SafeImage src="https://images.unsplash.com/photo-1701923180347-ce90b2733c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" alt="Amaka Nweke" fill className="object-cover rounded-sm" />
                <div className="absolute inset-0 border border-accent/30 translate-x-4 translate-y-4 -z-10" />
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <h2 className="font-heading text-5xl font-bold mb-8">The Visionary: Amaka Nweke</h2>
              <p className="text-secondary/60 text-lg leading-relaxed mb-10">
                Founded by Amaka Nweke, Ammy Signature 24/7 Collection began with a simple vision: to make every woman feel like royalty. Based in the heart of Abuja, Amaka combines her keen eye for detail with the rich textures of African fashion to create masterpieces that transcend trends. Each turban and fascinator is a testament to her dedication to the craft of millinery.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-accent font-heading text-4xl font-bold">100%</h4>
                  <p className="text-[10px] uppercase tracking-widest mt-1 opacity-50">Handcrafted Craft</p>
                </div>
                <div>
                  <h4 className="text-accent font-heading text-4xl font-bold">Abuja</h4>
                  <p className="text-[10px] uppercase tracking-widest mt-1 opacity-50">Design Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Masonry */}
      <section ref={galleryReveal.ref as any} className="py-28 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-bold text-secondary">Couture in Motion</h2>
            <p className="text-secondary/40 mt-4 tracking-widest uppercase text-xs">Our Editorial Lookbook</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[...IMAGES.products, IMAGES.hero, "https://images.unsplash.com/photo-1758633854740-26967a7d18f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"].map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-sm overflow-hidden transition-all duration-700 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <SafeImage src={src} alt={`Gallery ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <ShoppingBag className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - T-MASONRY */}
      <section ref={testimonialsReveal.ref as any} className="py-28 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl font-bold text-secondary text-center mb-20">Words from our Queens</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-secondary/5 p-10 rounded-sm border border-white/5 transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(n => <div key={n} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                </div>
                <p className="text-secondary/70 text-xl font-light italic leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="font-heading font-bold text-secondary text-lg">{t.name}</p>
                    <p className="text-accent/60 text-[10px] uppercase tracking-widest mt-1 font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - C2 Asymmetric Glass Overlap */}
      <section id="contact" ref={contactReveal.ref as any} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="font-heading text-7xl font-bold text-secondary mb-8 leading-tight">Visit the Boutique</h2>
            <p className="text-secondary/50 text-xl max-w-md font-light mb-12">
              Based in Garki International market, we welcome you to experience Afro-luxury firsthand.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-accent">
                <MapPin size={24} />
                <span className="text-secondary/80 font-light">{contactData.address}</span>
              </div>
              <a href={`https://wa.me/${contactData.whatsapp}`} className="flex items-center gap-4 text-accent hover:text-white transition-colors">
                <Phone size={24} />
                <span className="text-secondary/80 font-light">+{contactData.whatsapp}</span>
              </a>
              <a href={`https://instagram.com/${contactData.instagram}`} className="flex items-center gap-4 text-accent hover:text-white transition-colors">
                <Instagram size={24} />
                <span className="text-secondary/80 font-light">@{contactData.instagram}</span>
              </a>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {sent ? (
              <div className="bg-secondary/10 backdrop-blur-3xl p-12 rounded-sm border border-white/10 text-center animate-scaleIn">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 mx-auto border border-accent/40">
                  <CheckCheck size={32} className="text-accent" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-secondary mb-3">Message Sent</h3>
                <p className="text-secondary/60">Thank you, Queen. Our team will review your inquiry shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-secondary/5 backdrop-blur-2xl p-10 md:p-14 rounded-sm border border-white/10 shadow-2xl">
                <h3 className="font-heading text-3xl font-bold text-secondary mb-10">Bespoke Inquiry</h3>
                <div className="space-y-6">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 text-secondary outline-none focus:border-accent transition-all font-light" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 text-secondary outline-none focus:border-accent transition-all font-light" 
                  />
                  <textarea 
                    placeholder="Tell us about your occasion..." 
                    rows={4} 
                    required 
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 text-secondary outline-none focus:border-accent transition-all font-light resize-none" 
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-10 bg-accent text-primary py-5 font-bold uppercase tracking-widest hover:brightness-110 transition-all flex justify-center items-center gap-3 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Message <ArrowRight size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-primary border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-8 h-8 bg-accent text-primary flex items-center justify-center font-heading font-bold text-lg rounded-sm">A</div>
              <span className="font-heading text-xl font-bold tracking-widest text-white uppercase">Ammy Signature</span>
            </div>
            <p className="text-white/30 text-sm max-w-xs">{brand.tagline}</p>
          </div>
          
          <div className="flex gap-8">
            <a href={`https://instagram.com/${contactData.instagram}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
              <Instagram size={20} />
            </a>
            <a href={`https://wa.me/${contactData.whatsapp}`} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
              <Phone size={20} />
            </a>
            <a href="mailto:info@ammysignature.com" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
              <Mail size={20} />
            </a>
          </div>

          <p className="text-white/20 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Ammy Signature Collection. Abuja.
          </p>
        </div>
      </footer>
    </main>
  );
}