'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Crown, 
  Clock, 
  Truck, 
  Scissors, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff,
  Users,
  Heart,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: glassmorphic
// Divider Style: D-RULE
// Typography Personality: refined

const brief = {
  brand: {
    name: "Ammy Signature 24/7 Collection",
    tagline: "The Art of Regal Headwear",
    description: "Modern Afro-luxury headwear for the contemporary woman. From bespoke autogele to statement fascinators, we craft crowns that command respect.",
    industry: "fashion"
  },
  colors: {
    primary: "#3D2B1F",
    secondary: "#FFFFF0",
    accent: "#A67C52"
  },
  contact: {
    whatsapp: "2348108165842",
    instagram: "@ammysignature247_collection",
    address: "Garki International market, El-rufai block, shop 245, Abuja Nigeria"
  },
  heroImage: {
    url: "https://images.unsplash.com/photo-1542581509-7e87190743b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxzdHJlZXQtbHV4ZSUyMGZhc2hpb258ZW58MHwwfHx8MTc3OTg2NjMyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  products: [
    {
      name: "Signature Autogele",
      description: "Pre-tied luxury headwraps with intricate pleats for effortless elegance.",
      price: "₦25,000",
      image: "https://images.unsplash.com/photo-1701923180347-ce90b2733c0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwyfHxzdHJlZXQtbHV4ZSUyMGZhc2hpb258ZW58MHwwfHx8MTc3OTg2NjMyM3ww"
    },
    {
      name: "Bespoke Fascinator",
      description: "Handcrafted statement pieces featuring feathers and architectural netting.",
      price: "₦35,000",
      image: "https://images.unsplash.com/photo-1597360452016-f9d76955d0a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmFzY2luYXRvciUyMGhhdCUyMHdpdGglMjBmZWF0aGVycyUyMGFuZCUyMG5ldHRpbmd8ZW58MXwwfHx8MTc3OTg2NjMyNHww"
    },
    {
      name: "Bridal Ostrich Fan",
      description: "Opulent feathered fans designed for the modern African bride.",
      price: "₦45,000",
      image: "https://images.unsplash.com/photo-1758633854736-8973bcd84dd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw0fHxzdHJlZXQtbHV4ZSUyMGZhc2hpb258ZW58MHwwfHx8MTc3OTg2NjMyM3ww"
    },
    {
      name: "Zara Luxe Scarf",
      description: "Premium oversized scarfs with rich textures and modern prints.",
      price: "₦8,500",
      image: "https://images.unsplash.com/photo-1652385748879-cd7a0cdf466c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkZXNpZ25lciUyMHNjYXJmJTIwZm9yJTIwd29tZW4lMjBkcmFwZWQlMjBlbGVnYW50bHl8ZW58MXwwfHx8MTc3OTg2NjMyNXww"
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1758633854740-26967a7d18f9",
    "https://images.unsplash.com/photo-1701923181335-5fbc178614b4",
    "https://images.unsplash.com/photo-1774571953758-5aefc9e2b5b3",
    "https://images.unsplash.com/photo-1767854808145-5adfb3866ddd"
  ],
  features: [
    { title: "Bespoke Craft", description: "Each piece is hand-finished by master artisans to ensure a unique fit.", icon: Crown },
    { title: "24/7 Availability", description: "Our collection is designed to take you from dawn till dusk with ease.", icon: Clock },
    { title: "Nationwide Delivery", description: "Fast and secure shipping from our Abuja boutique. Sharp.", icon: Truck },
    { title: "Afro-Modern Design", description: "Traditional silhouettes reimagined for the global fashion landscape.", icon: Scissors }
  ],
  stats: [
    { number: "1k+", label: "Social Followers", icon: Users },
    { number: "500+", label: "Brides Adorned", icon: Heart },
    { number: "100%", label: "Handcrafted", icon: Scissors }
  ],
  testimonials: [
    { name: "Chiamaka Okafor", text: "The autogele I bought was the talk of the wedding. So comfortable and regal!", role: "Wedding Guest" },
    { name: "Bisi Adebayo", text: "The best fascinators in Abuja. The quality of the chocolate brown fabric is unmatched.", role: "Corporate Professional" },
    { name: "Nneka Egwu", text: "Amaka understands exactly what a bride needs. My ostrich fan was breathtaking.", role: "2023 Bride" }
  ]
};

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br
        from-[var(--primary)]/60 to-[var(--accent)]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Divider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
    <span className="text-[var(--accent)] font-mono text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      {brief.brand.tagline}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
  </div>
);

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroRev = useScrollReveal(0.1);
  const featRev = useScrollReveal(0.15);
  const prodRev = useScrollReveal(0.1);
  const gallRev = useScrollReveal(0.1);
  const abtRev = useScrollReveal(0.15);
  const testRev = useScrollReveal(0.1);
  const contRev = useScrollReveal(0.15);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl py-4 shadow-xl' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-[var(--primary)] font-black text-xl">AS</span>
            </div>
            <span className="font-heading text-xl font-black text-white hidden sm:block tracking-tight">AMMY SIGNATURE</span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            {['Collection', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                className="text-white/70 hover:text-[var(--accent)] transition-colors text-sm font-medium tracking-widest uppercase">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-black px-8 py-3 rounded-full font-bold text-sm
              hover:scale-105 transition-all shadow-lg active:scale-95">
              Shop Now
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white p-2">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[var(--primary)] p-12 flex flex-col shadow-2xl">
          <button onClick={() => setIsMenuOpen(false)} className="self-end text-white mb-16">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Collection', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                className="text-white text-3xl font-heading font-black border-b border-white/10 pb-4">
                {item}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMenuOpen(false)}
              className="mt-8 bg-[var(--accent)] text-black text-center py-4 rounded-xl font-bold text-lg">
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Hero (HR-A) */}
      <section id="hero" ref={heroRev.ref} className="min-h-screen relative flex items-center justify-center
        bg-gradient-to-br from-[var(--primary)] via-[var(--primary)]/90 to-[var(--accent)]/20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[var(--accent)]/10 rounded-full blur-[140px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-15 max-w-5xl max-h-[70vh] rounded-[4rem] overflow-hidden rotate-6 transition-all duration-1000 ${heroRev.isVisible ? 'scale-100' : 'scale-90'}`}>
          <SafeImage src={brief.heroImage.url} alt="Luxury Headwear" fill className="object-cover" priority />
        </div>

        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroRev.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-20'}`}>
          <h1 className="font-heading text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
            Crowning Your <br/> <span className="text-[var(--accent)]">Confidence</span>
          </h1>
          <p className="text-white/60 mt-12 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
            {brief.brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
            <a href="#collection" className="bg-[var(--accent)] text-black px-12 py-5 font-black text-lg
              hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-2xl">
              Shop the Collection
            </a>
            <a href="#about" className="backdrop-blur-md bg-white/5 border border-white/20 text-white px-12 py-5 font-bold text-lg
              hover:bg-white/10 transition-all duration-300 rounded-full">
              Behind the Brand
            </a>
          </div>
        </div>
      </section>

      {/* Features (F-ICON-GRID) */}
      <section id="features" ref={featRev.ref} className="py-28 px-6 bg-[var(--primary)] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-24 transition-all duration-1000 ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">The Signature Standard</h2>
            <p className="text-white/40 text-xl font-light">Why our crowns are the choice of the modern elite.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brief.features.map((f, i) => (
              <div key={i} className={`p-10 rounded-3xl border border-white/8 bg-white/5 backdrop-blur-lg
                hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/30 transition-all duration-500 group cursor-default
                ${featRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="mb-8 p-4 bg-[var(--accent)]/10 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-[var(--accent)] transition-all duration-500">
                  <f.icon className="text-[var(--accent)] group-hover:text-black transition-colors" size={32} />
                </div>
                <h3 className="font-heading font-black text-white text-2xl mb-4 leading-tight">{f.title}</h3>
                <p className="text-white/40 text-base leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Products (P-EDITORIAL) */}
      <section id="collection" ref={prodRev.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className={`font-heading text-6xl md:text-8xl font-black text-white leading-none transition-all duration-1000 ${prodRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
              The <br/> Boutique
            </h2>
            <p className={`text-white/40 max-w-sm text-lg transition-all duration-1000 delay-300 ${prodRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              Curated accessories for your next celebration. Each piece is a masterpiece of Afro-luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brief.products.map((p, i) => (
              <div key={i} className={`group relative h-[500px] rounded-[3rem] overflow-hidden transition-all duration-1000 ${prodRev.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${i * 200}ms` }}>
                <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-4xl font-heading font-black text-white">{p.name}</h3>
                      <p className="text-white/60 mt-2 text-lg line-clamp-2 max-w-xs">{p.description}</p>
                    </div>
                    <span className="text-[var(--accent)] font-black text-3xl">{p.price}</span>
                  </div>
                  <div className="mt-8 overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-24">
                    <a href="#contact" className="inline-flex items-center gap-3 bg-[var(--accent)] text-black px-10 py-4
                      rounded-full font-black text-base hover:brightness-110 transition-all shadow-xl">
                      Select Crown <ChevronRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (Bonus - Masonry) */}
      <section id="gallery" ref={gallRev.ref} className="py-28 px-6 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-black">The Lookbook</h2>
            <p className="text-black/40 mt-4 font-mono uppercase tracking-[0.3em]">Regal Visuals</p>
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.gallery.map((src, i) => (
              <div key={i} className={`break-inside-avoid group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${gallRev.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <SafeImage src={src} alt={`Lookbook ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-[var(--primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About (V3 Split) */}
      <section id="about" ref={abtRev.ref} className="py-28 px-6 bg-[var(--accent)]/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${abtRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <span className="font-mono text-[var(--accent)] text-sm font-black tracking-widest uppercase mb-6 block">Our Story</span>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-tight mb-8">Crafting Royalty for the Contemporary Woman</h2>
            <p className="text-white/60 text-xl leading-relaxed mb-10 italic">
              &ldquo;Traditional silhouettes reimagined for the global fashion landscape.&rdquo;
            </p>
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Founded by Amaka Nweke, Ammy Signature 24/7 Collection was born from a vision to simplify African elegance. 
              Amaka&apos;s meticulous eye for detail transforms traditional fabrics into contemporary masterpieces.
            </p>
            <div className="flex gap-4">
              <a href="#contact" className="bg-[var(--accent)] text-black px-10 py-4 rounded-full font-black text-base">Visit Abuja Boutique</a>
            </div>
          </div>
          
          <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${abtRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {brief.stats.map((s, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] bg-[var(--primary)] border border-white/5 flex flex-col justify-center items-center text-center group hover:border-[var(--accent)]/40 transition-colors ${i === 0 ? 'col-span-2 py-16' : ''}`}>
                <p className="font-heading text-5xl md:text-7xl font-black text-[var(--accent)] mb-2 group-hover:scale-110 transition-transform duration-500">{s.number}</p>
                <p className="text-white/40 font-mono text-sm uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (T-MASONRY) */}
      <section id="testimonials" ref={testRev.ref} className="py-28 px-6 bg-[var(--primary)] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-6xl md:text-8xl font-black text-white text-center mb-24 opacity-10">Real Royalty</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {brief.testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-white/5 p-10 rounded-[2.5rem] border border-white/8 relative overflow-hidden group
                hover:border-[var(--accent)]/25 transition-all duration-500 ${testRev.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl" />
                <p className="text-white/80 text-xl leading-relaxed italic mb-8 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-5 border-t border-white/10 pt-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-black text-white text-lg">{t.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact (C2) */}
      <section id="contact" ref={contRev.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          
          <div className={`bg-secondary/5 backdrop-blur-3xl p-8 sm:p-14 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] transition-all duration-1000 ${contRev.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn relative overflow-hidden">
                <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 border border-[var(--accent)]/40 relative z-10 shadow-[0_0_50px_rgba(166,124,82,0.3)]">
                  <CheckCheck size={40} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4">Inquiry Received</h3>
                <p className="text-white/50 text-lg">Thank you for your interest. Our consultants will contact you shortly to crown your look.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-heading text-4xl font-black text-white mb-10">Begin Your <span className="text-[var(--accent)]">Crown</span></h3>
                <div className="grid gap-6">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <input key={field} type={field === 'email' ? 'email' : 'text'} placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[var(--accent)] transition-all"
                      value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))} required={field !== 'phone'} />
                  ))}
                  <textarea rows={4} placeholder="What piece are you interested in?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-[var(--accent)] transition-all resize-none"
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-6 bg-[var(--accent)] text-black py-5 rounded-2xl font-black text-lg hover:brightness-110 transition-all flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : <>Send Inquiry <ArrowRight size={20} /></>}
                </button>
              </form>
            )}
          </div>

          <div className={`md:pl-12 text-left transition-all duration-1000 delay-300 ${contRev.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-none">Visit Our <br/> Boutique</h2>
            <p className="text-white/40 text-xl mb-12 max-w-sm">Experience the collection in person at our Abuja flagship store.</p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-[0.2em] mb-1">Our Location</p>
                  <p className="text-white text-lg max-w-xs">{brief.contact.address}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                  <Instagram size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-[0.2em] mb-1">Instagram</p>
                  <p className="text-white text-lg">{brief.contact.instagram}</p>
                </div>
              </div>
              <div className="flex gap-6 items-start group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-[0.2em] mb-1">WhatsApp</p>
                  <p className="text-white text-lg">{brief.contact.whatsapp}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[var(--accent)] flex items-center justify-center rounded-xl">
                  <span className="text-[var(--primary)] font-black text-2xl">AS</span>
                </div>
                <span className="font-heading text-3xl font-black text-white tracking-tighter">AMMY SIGNATURE</span>
              </div>
              <p className="text-white/40 text-lg max-w-md leading-relaxed mb-8">
                Crafting modern crowns for the global contemporary woman. Every piece is a story of heritage and power.
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-white text-xl font-bold mb-8">Collection</h4>
              <div className="flex flex-col gap-4">
                {['Autogele', 'Fascinators', 'Bridal Fans', 'Luxe Scarves'].map(item => (
                  <a key={item} href="#collection" className="text-white/40 hover:text-[var(--accent)] transition-colors">{item}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-white text-xl font-bold mb-8">Information</h4>
              <div className="flex flex-col gap-4">
                {['Boutique Visit', 'Bespoke Order', 'Delivery Policy', 'Contact Us'].map(item => (
                  <a key={item} href="#contact" className="text-white/40 hover:text-[var(--accent)] transition-colors">{item}</a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm font-mono tracking-widest uppercase">
              &copy; {new Date().getFullYear()} AMMY SIGNATURE. Crowns for the sharpest fit.
            </p>
            <div className="flex gap-10">
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Privacy</span>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}