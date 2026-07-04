import { motion } from "framer-motion";
import { MessageSquare, PenTool, Cog, KeyRound } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Consultation",
    desc: "We listen, understand your vision, and define the project scope.",
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Architectural plans, 3D visualizations, and material selection.",
  },
  {
    icon: Cog,
    title: "Precision Engineering",
    desc: "Structural calculations, approvals, and meticulous execution.",
  },
  {
    icon: KeyRound,
    title: "Handover",
    desc: "Quality inspection, finishing touches, and seamless delivery.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Our Process
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            How We <span className="text-gold-gradient">Deliver</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 relative">
                <step.icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold-gradient text-primary-foreground text-xs font-body font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
