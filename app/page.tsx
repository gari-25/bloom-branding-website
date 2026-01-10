"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Target, TrendingUp, Palette, Code, Megaphone, Instagram, Mail, Phone, MapPin, Star } from 'lucide-react';
import { ReactNode } from "react";
import { Variants } from "framer-motion";

const colors = {
  blue: '#2563EB',
  gray: '#64748B',
  cream: '#FFFBF5',
  brown: '#78350F',
};

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

function AnimatedSection({
  children,
  className = "",
  variants = fadeInUp,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}


export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.7, 1], [1, 0.9, 0.5]);

  const services = [
    {
      title: "Brand Strategy",
      description: "Strategic positioning and messaging that sets your brand apart in the marketplace.",
      icon: Target,
    },
    {
      title: "Visual Design",
      description: "Beautiful, functional design systems that create memorable brand experiences.",
      icon: Palette,
    },
    {
      title: "Web Development",
      description: "High-performance websites built with modern technology and best practices.",
      icon: Code,
    },
    {
      title: "Content Creation",
      description: "Engaging content that tells your story and connects with your audience.",
      icon: Sparkles,
    },
    {
      title: "Digital Marketing",
      description: "Data-driven campaigns that drive growth and deliver measurable results.",
      icon: Megaphone,
    },
    {
      title: "Brand Growth",
      description: "Scalable strategies to grow your brand and reach new markets.",
      icon: TrendingUp,
    },
  ];

  const projects = [
    {
      title: "TechVision",
      category: "Brand Identity · Web Design",
      description: "Complete brand transformation for a leading tech company, resulting in 150% increase in engagement.",
    },
    {
      title: "GreenEarth",
      category: "Sustainability · Digital",
      description: "Eco-friendly brand for sustainable products with a focus on modern, clean aesthetics.",
    },
    {
      title: "UrbanLife",
      category: "Lifestyle · Marketing",
      description: "Modern lifestyle brand launch campaign reaching 2M+ impressions in first month.",
    },
  ];

  const stats = [
    { number: "10", label: "Years Experience", suffix: "+" },
    { number: "200", label: "Happy Clients", suffix: "+" },
    { number: "400", label: "Projects Done", suffix: "+" },
    { number: "20", label: "Team Members", suffix: "+" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechVision",
      review: "Outstanding work! They transformed our brand completely and exceeded all expectations. The team was professional and creative.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Founder, GreenEarth",
      review: "Professional, creative, and results-driven. Couldn't ask for a better partner in building our brand identity.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Director, UrbanLife",
      review: "Their strategic approach and attention to detail made all the difference. Highly recommended for any branding project.",
      rating: 5,
    },
  ];

  const navLinks = ['Services', 'Work', 'About', 'Contact'];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX: smoothProgress,
          backgroundColor: colors.blue
        }}
      />

      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-sm shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold"
            whileHover={{ scale: 1.02 }}
            style={{ color: colors.brown }}
          >
            Studio
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium hover:text-opacity-70 transition-opacity relative group"
                style={{ color: colors.gray }}
              >
                {item}
                <span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: colors.blue }}
                />
              </a>
            ))}
            <motion.button 
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: colors.blue }}
              whileHover={{ scale: 1.05, backgroundColor: colors.brown }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 lg:px-12"
        style={{ backgroundColor: colors.cream }}
      >
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y: heroY }}
        >
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-30 blur-3xl"
               style={{ backgroundColor: colors.blue }} />
          <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
               style={{ backgroundColor: colors.brown }} />
        </motion.div>

        <motion.div 
          className="max-w-5xl mx-auto text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-bold shadow-lg"
              style={{ 
                backgroundColor: colors.blue,
                color: 'white'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Sparkles className="w-4 h-4" />
              Creative Agency 2026
            </motion.div>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 font-bold leading-tight"
            style={{ color: colors.brown }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Building Brands
            <br />
            That <span style={{ color: colors.blue }}>Inspire</span>
          </motion.h1>

          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
            style={{ color: colors.gray }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            We create strategic digital experiences that connect brands with their audiences through thoughtful design and compelling storytelling.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.button 
              className="px-8 py-4 rounded-lg text-base font-semibold text-white flex items-center gap-2 shadow-lg"
              style={{ backgroundColor: colors.blue }}
              whileHover={{ scale: 1.05, y: -2, backgroundColor: colors.brown }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="px-8 py-4 rounded-lg text-base font-semibold border-2"
              style={{ 
                borderColor: colors.brown,
                color: colors.brown,
                backgroundColor: 'transparent'
              }}
              whileHover={{ 
                scale: 1.05,
                y: -2,
                backgroundColor: colors.brown,
                color: 'white'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <section id="services" className="py-20 md:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.span 
                className="text-sm uppercase tracking-widest mb-4 inline-block font-bold"
                style={{ color: colors.blue }}
              >
                What We Do
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.brown }}>
                Our Services
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.gray }}>
                Comprehensive solutions to elevate your brand and engage your audience.
              </p>
            </div>
          </AnimatedSection>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group p-8 md:p-10 rounded-2xl border-2 hover:shadow-2xl transition-all duration-300 bg-white"
                  style={{ borderColor: colors.gray + '20' }}
                  whileHover={{ 
                    y: -8, 
                    borderColor: colors.blue,
                    backgroundColor: colors.cream
                  }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md"
                    style={{ backgroundColor: colors.blue }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: colors.brown }}>
                    {service.title}
                  </h3>
                  <p className="leading-relaxed mb-5 text-base" style={{ color: colors.gray }}>
                    {service.description}
                  </p>
                  <motion.div 
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: colors.blue }}
                    whileHover={{ gap: 12 }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="work" className="py-20 md:py-32 px-6 lg:px-12" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.span 
                className="text-sm uppercase tracking-widest mb-4 inline-block font-bold"
                style={{ color: colors.blue }}
              >
                Portfolio
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.brown }}>
                Featured Projects
              </h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: colors.gray }}>
                Recent work that showcases our creative approach and results.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <AnimatedSection key={index} variants={fadeInUp}>
                <motion.div
                  className="group rounded-3xl overflow-hidden border-2 hover:shadow-2xl transition-all duration-500 bg-white"
                  style={{ borderColor: colors.gray + '20' }}
                  whileHover={{ borderColor: colors.blue, y: -4 }}
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
                      <span 
                        className="text-xs uppercase tracking-widest mb-4 font-bold"
                        style={{ color: colors.blue }}
                      >
                        {project.category}
                      </span>
                      <h3 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5" 
                        style={{ color: colors.brown }}
                      >
                        {project.title}
                      </h3>
                      <p 
                        className="text-base md:text-lg mb-8 leading-relaxed" 
                        style={{ color: colors.gray }}
                      >
                        {project.description}
                      </p>
                      <motion.div 
                        className="flex items-center gap-2 text-base font-bold"
                        style={{ color: colors.blue }}
                        whileHover={{ gap: 16 }}
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <div 
                      className="h-64 lg:h-full min-h-[300px] order-1 lg:order-2 group-hover:scale-105 transition-transform duration-500"
                      style={{ 
                        backgroundColor: colors.cream,
                        backgroundImage: `linear-gradient(135deg, ${colors.blue}20 0%, ${colors.brown}20 100%)`
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <motion.button 
              className="px-8 py-4 rounded-lg text-base font-semibold border-2"
              style={{ 
                borderColor: colors.brown,
                color: colors.brown
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: colors.blue,
                borderColor: colors.blue,
                color: 'white'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      <section id="about" className="py-20 md:py-32 px-6 lg:px-12" style={{ backgroundColor: colors.blue }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Our Impact
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence
              </p>
            </div>
          </AnimatedSection>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center"
              >
                <motion.div 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                >
                  {stat.number}
                  <span className="text-white/50">{stat.suffix}</span>
                </motion.div>
                <div className="text-base md:text-lg font-semibold text-white/90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <motion.span 
                className="text-sm uppercase tracking-widest mb-4 inline-block font-bold"
                style={{ color: colors.blue }}
              >
                Testimonials
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: colors.brown }}>
                What Clients Say
              </h2>
            </div>
          </AnimatedSection>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {testimonials.map((review, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="p-8 md:p-10 rounded-2xl border-2 hover:shadow-2xl transition-all duration-300"
                style={{ 
                  borderColor: colors.gray + '20',
                  backgroundColor: colors.cream
                }}
                whileHover={{ y: -8, borderColor: colors.blue }}
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: colors.blue }} 
                    />
                  ))}
                </div>
                <p className="mb-8 leading-relaxed text-base md:text-lg" style={{ color: colors.gray }}>
                  "{review.review}"
                </p>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg"
                    style={{ backgroundColor: colors.blue }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: colors.brown }}>
                      {review.name}
                    </div>
                    <div className="text-sm" style={{ color: colors.gray }}>
                      {review.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-32 px-6 lg:px-12" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center p-12 md:p-20 rounded-3xl shadow-2xl relative overflow-hidden" 
                 style={{ backgroundColor: 'white', border: `3px solid ${colors.blue}` }}>
              <motion.div 
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
                style={{ backgroundColor: colors.blue }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative z-10" style={{ color: colors.brown }}>
                Let's Work Together
              </h2>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed relative z-10" style={{ color: colors.gray }}>
                Ready to take your brand to the next level? Get in touch with us today and let's create something amazing.
              </p>
              <motion.button 
                className="px-10 py-5 rounded-lg text-lg font-bold text-white shadow-xl relative z-10"
                style={{ backgroundColor: colors.blue }}
                whileHover={{ scale: 1.08, y: -3, backgroundColor: colors.brown }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="py-16 md:py-20 px-6 lg:px-12" style={{ backgroundColor: colors.brown }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
            <div className="lg:col-span-2">
              <div className="text-3xl font-bold mb-6 text-white">
                Studio
              </div>
              <p className="mb-8 leading-relaxed text-white/80 text-lg max-w-md">
                A creative agency building meaningful digital experiences for forward-thinking brands worldwide.
              </p>
              <div className="flex gap-4">
                <motion.a 
                  href="#"
                  className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: colors.blue }}
                  whileHover={{ scale: 1.15, y: -3 }}
                >
                  <Instagram className="w-6 h-6 text-white" />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Quick Links</h4>
              <ul className="space-y-4">
                {['Services', 'Work', 'About', 'Contact', 'Careers'].map((link) => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                      className="text-white/70 hover:text-white transition-colors text-base"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Contact</h4>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: colors.blue }} />
                  <span className="text-base">hello@studio.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: colors.blue }} />
                  <span className="text-base">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: colors.blue }} />
                  <span className="text-base">New York, NY</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-white/60" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="text-base">© 2026 Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}