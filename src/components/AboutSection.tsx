import { motion } from "framer-motion";
import { Shield, Paintbrush } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            About Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            The Perfect Union of{" "}
            <span className="text-gold-gradient">Strength & Beauty</span>
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Founded by a Civil Engineer and an Architect, Precision Structures &
            Interiors bridges the gap between structural integrity and aesthetic
            brilliance. Every project we deliver is built on a foundation of
            technical mastery and finished with an artist's eye for detail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Engineering Stability",
              desc: "Rigorous structural analysis, seismic-ready designs, and precision engineering that ensures your structure stands the test of time.",
            },
            {
              icon: Paintbrush,
              title: "Architectural Beauty",
              desc: "Thoughtful spatial design, premium material selection, and bespoke interiors that transform spaces into experiences.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border p-8 rounded group hover:border-primary/40 transition-colors duration-300"
            >
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
