import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury interior"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-primary mb-6">
            Precision Structures & Interiors
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Where Engineering
            <br />
            <span className="text-gold-gradient">Meets Artistry</span>
          </h1>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Crafting architectural and structural excellence through the perfect
            union of engineering precision and design sophistication.
          </p>
          <a
            href="#contact"
            className="inline-block bg-gold-gradient text-primary-foreground font-body font-semibold text-sm md:text-base px-8 py-4 rounded hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
