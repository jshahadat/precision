import { motion } from "framer-motion";
import { Ruler, Building2, Sofa, Armchair } from "lucide-react";

const services = [
  {
    icon: Ruler,
    title: "Architectural Planning & 3D Visualization",
    desc: "From conceptual sketches to photorealistic 3D renders, we bring your vision to life before a single brick is laid.",
  },
  {
    icon: Building2,
    title: "Structural Consultancy & Engineering",
    desc: "Comprehensive structural analysis, RCC design, and engineering consultancy that guarantees safety and compliance.",
  },
  {
    icon: Sofa,
    title: "Premium Interior Design & Execution",
    desc: "Full-spectrum interior design services—from mood boards to turnkey execution—crafted with luxury materials and finishes.",
  },
  {
    icon: Armchair,
    title: "Custom Furniture & Finishing",
    desc: "Bespoke furniture designed and built to your exact specifications, featuring premium wood, upholstery, and hardware.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Our Services
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Comprehensive <span className="text-gold-gradient">Solutions</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background border border-border p-6 rounded group hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3 leading-snug">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
