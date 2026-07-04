import { useState } from "react";
import { motion } from "framer-motion";

import before1 from "@/assets/portfolio-before-1.jpg";
import after1 from "@/assets/portfolio-after-1.jpg";
import before2 from "@/assets/portfolio-before-2.jpg";
import after2 from "@/assets/portfolio-after-2.jpg";
import before3 from "@/assets/portfolio-before-3.jpg";
import after3 from "@/assets/portfolio-after-3.jpg";

const projects = [
  { title: "Luxury Residence", before: before1, after: after1 },
  { title: "Corporate Office", before: before2, after: after2 },
  { title: "Modern Kitchen", before: before3, after: after3 },
];

const PortfolioSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Portfolio
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Before <span className="text-gold-gradient">vs</span> After
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative aspect-[4/3] rounded overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Before image */}
              <img
                src={project.before}
                alt={`${project.title} before`}
                loading="lazy"
                width={800}
                height={600}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredIndex === i ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* After image */}
              <img
                src={project.after}
                alt={`${project.title} after`}
                loading="lazy"
                width={800}
                height={600}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                }`}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-background/40 flex items-end p-5">
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">
                    {project.title}
                  </p>
                  <p className="font-body text-xs text-primary tracking-wider uppercase">
                    {hoveredIndex === i ? "After" : "Before"} — Hover to compare
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
