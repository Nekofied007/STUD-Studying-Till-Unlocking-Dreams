import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 2, rotateY: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative rounded-2xl p-6 border border-slate-700/70 bg-slate-900/40 backdrop-blur-xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
    >
      {/* gradient border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.15), 0 20px 60px rgba(59,130,246,0.12)" }} />
      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white/95">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-300/90">{description}</p>
    </motion.div>
  );
}
