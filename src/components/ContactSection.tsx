import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMsg = encodeURIComponent(
      `Hi, I'm ${form.name}. ${form.message}\nEmail: ${form.email}\nPhone: ${form.phone}`,
    );
    window.open(`https://wa.me/8801XXXXXXXXX?text=${waMsg}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
            Contact
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Let's <span className="text-gold-gradient">Build Together</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {(["name", "email", "phone"] as const).map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                required={field !== "phone"}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full bg-card border border-border rounded px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
              />
            ))}
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-card border border-border rounded px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors resize-none"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-gold-gradient text-primary-foreground font-body font-semibold text-sm px-6 py-3 rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
              <a
                href="https://wa.me/8801XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-primary/40 text-primary font-body font-semibold text-sm px-6 py-3 rounded hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Dhaka, Bangladesh" },
                { icon: Phone, text: "+880 1XXX-XXXXXX" },
                { icon: Mail, text: "info@precisionstructures.com" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-body text-sm text-muted-foreground">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded overflow-hidden border border-border aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692886!2d90.27923991085498!3d23.780573258035924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5e3daeb86!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
