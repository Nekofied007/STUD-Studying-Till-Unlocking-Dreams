import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";  
import { setupGsap, ScrollTrigger } from "@/animations/gsapConfig";
import { revealByLines, revealByChars } from "@/animations/animeReveal";
import ThreeBridge from "@/components/ThreeBridge";
import FeatureCard from "@/components/FeatureCard"; 
import InfographicCounter from "@/components/InfographicCounter";
import { StudyModal } from "@/components/StudyModal";
import { Brain, ClipboardCheck, Gamepad2 } from "lucide-react";
import { gsap } from "gsap";

export default function Index() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize GSAP with performance optimizations
    try {
      setupGsap();

      // Use requestIdleCallback for non-critical animations
      const initAnimations = () => {
        if (heroTitleRef.current) void revealByChars(heroTitleRef.current, 200);
        if (heroSubtitleRef.current) void revealByLines(heroSubtitleRef.current, 500);

        // Batch GSAP animations for better performance
        const sections = gsap.utils.toArray<HTMLElement>("section[data-animate]");
        if (sections.length > 0) {
          gsap.set(sections, { opacity: 0, y: 50 });
          sections.forEach((sec, i) => {
            gsap.to(sec, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.1,
              scrollTrigger: { 
                trigger: sec, 
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
            });
          });
        }

        const timelineSteps = gsap.utils.toArray<HTMLElement>("[data-step]");
        if (timelineSteps.length > 0) {
          gsap.set(timelineSteps, { opacity: 0 });
          timelineSteps.forEach((el, i) => {
            gsap.set(el, { x: i % 2 === 0 ? -16 : 16 });
            gsap.to(el, {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: { 
                trigger: el, 
                start: "top 90%",
                toggleActions: "play none none reverse"
              },
            });
          });
        }
      };

      // Use requestIdleCallback for better performance
      if ('requestIdleCallback' in window) {
        requestIdleCallback(initAnimations);
      } else {
        setTimeout(initAnimations, 100);
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    } catch (error) {
      console.error("Animation setup error:", error);
    }
  }, []);

  return (
    <div className="grain vignette">
      {/* Hero Section with Spline Animation */}
  <section className="relative overflow-hidden min-h-screen soft-top-light">
        <div className="absolute inset-0">
          {/* @ts-ignore - custom element provided by external script */}
          <spline-viewer
            url="https://prod.spline.design/eErsLAEicj0ZrJPy/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            loading="eager"
          ></spline-viewer>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" data-animate className="bg-black min-h-screen flex items-center">
        <div className="container mx-auto py-28 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                The Challenge
              </motion.div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold tracking-tight text-white/70"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                The Problem
              </motion.h2>
              <motion.p 
                className="mt-6 text-lg text-gray-400/60 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                1M+ students start learning on YouTube—but 80% drop off without
                structure, accountability, or feedback. The path forward is unclear,
                and motivation fades.
              </motion.p>
              <motion.div 
                className="mt-10 grid sm:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <InfographicCounter
                    to={1000}
                    suffix="+"
                    label="Students use YouTube"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <InfographicCounter
                    to={80}
                    suffix="%"
                    label="Drop-off without structure"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <InfographicCounter
                    to={15}
                    suffix="min"
                    label="Average video attention span"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative h-[50vh] md:h-[70vh] lg:h-[75vh] rounded-2xl overflow-hidden border border-white/5 bg-black/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute inset-0">
                {/* @ts-ignore - custom element provided by external script */}
                <spline-viewer
                  url="https://prod.spline.design/LGHj692Zngep0aba/scene.splinecode"
                  style={{ width: "100%", height: "100%" }}
                  loading="lazy"
                ></spline-viewer>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" data-animate className="bg-black min-h-screen flex items-center relative overflow-hidden">
        {/* Background Spline */}
        <div className="absolute inset-0 -z-10">
          {/* @ts-ignore - custom element provided by external script */}
          <spline-viewer
            url="https://prod.spline.design/LBVpnuEPZ5MCPktL/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          ></spline-viewer>
        </div>
        {/* Cinematic overlay to keep background visible but readable */}
        <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        <div className="container mx-auto py-28 md:py-32 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              How It Works
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tight text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Our Process
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-400/50 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              A systematic approach to transform scattered content into structured learning
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Content Collection",
                desc: "We aggregate the best YouTube content for your goal, filtering quality from noise.",
                icon: "📚",
                gradient: "from-blue-500 to-cyan-500",
                bgColor: "bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30",
                textColor: "text-white/60",
                descColor: "text-blue-100/50"
              },
              {
                title: "Structuring",
                desc: "We map a coherent, step-by-step learning path that builds knowledge progressively.",
                icon: "🗺️",
                gradient: "from-indigo-500 to-purple-500",
                bgColor: "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30",
                textColor: "text-white/60",
                descColor: "text-indigo-100/50"
              }
            ].map((s, i) => (
              <motion.div
                key={s.title}
                data-step
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group rounded-3xl border p-8 ${s.bgColor} backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1`}
              >
                <div className="flex items-start gap-5">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${s.gradient} text-white font-bold text-2xl shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold text-xl mb-3 ${s.textColor}`}>
                      {s.title}
                    </h4>
                    <p className={`${s.descColor} leading-relaxed`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" data-animate className="bg-black min-h-screen flex items-center relative overflow-hidden">
        {/* Background Spline for Features */}
        <div className="absolute inset-0 -z-10">
          {/* @ts-ignore - custom element provided by external script */}
          <spline-viewer
            url="https://prod.spline.design/6IierL-0OHlVwhzD/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          ></spline-viewer>
        </div>
        {/* Lighter overlay so background is clearly visible */}
        <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black/20 via-black/10 to-black/25"></div>
        <div className="container mx-auto py-32 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              Core Features
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tight text-white/60"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Everything You Need
            </motion.h2>
            <motion.p 
              className="mt-4 text-lg text-gray-400/50 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Built for learners who want structure, feedback, and results
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FeatureCard
                title="AI-curated playlists"
                description="Curated routes from the best sources—no endless searching."
                icon={<Brain className="h-6 w-6" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FeatureCard
                title="Auto-generated quizzes"
                description="Reinforce learning with smart questions and checkpoints."
                icon={<ClipboardCheck className="h-6 w-6" />}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FeatureCard
                title="Gamified progress"
                description="Earn streaks, badges, and level up as you learn."
                icon={<Gamepad2 className="h-6 w-6" />}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section with Split Layout */}
      <section id="vision" data-animate className="bg-black min-h-screen flex items-stretch relative">
        <div className="w-1/2 relative overflow-hidden">
          {/* Full-screen Brain Animation on Left */}
          <div className="absolute inset-0">
            {/* @ts-ignore - custom element provided by external script */}
            <spline-viewer
              url="https://prod.spline.design/0B2qGC8U3FBKpjQJ/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
              loading="lazy"
            ></spline-viewer>
          </div>
          {/* Subtle overlay to match the grey tone */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40"></div>
        </div>

        {/* Right Side - Text Content */}
        <div className="w-1/2 bg-black flex items-center justify-center px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <motion.div 
              className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              Our Vision
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 25%, #8B5CF6 50%, #A855F7 75%, #C084FC 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 60px rgba(59, 130, 246, 0.3)"
              }}
            >
              Dreams unlocked through disciplined learning
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A future where every learner has a clear, motivating path from their
              first video to mastery. Where confusion transforms into clarity, and
              dreams become achievable milestones.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" data-animate className="bg-black min-h-screen flex items-center relative overflow-hidden">
        {/* Background Spline (non-interactive, anchored to right side) */}
        <div className="absolute right-0 top-0 h-full w-full md:w-1/2 -z-10 pointer-events-none">
          {/* @ts-ignore - custom element provided by external script */}
          <spline-viewer
            url="https://prod.spline.design/ZeQQlD0p-9HTNdua/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            loading="lazy"
          ></spline-viewer>
        </div>
        {/* Soft overlay for readability while keeping background visible */}
        <div className="absolute inset-0 -z-5 bg-gradient-to-l from-black/35 via-black/15 to-transparent" />
        <div className="container mx-auto py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative text-white"
          >
            <div className="relative z-10 max-w-3xl md:ml-12 lg:ml-24">
              <motion.h3 
                className="text-4xl md:text-5xl font-bold leading-tight text-white/90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to transform your learning?
              </motion.h3>
              <motion.p 
                className="mt-6 text-xl text-gray-300/80 leading-relaxed font-light tracking-wide"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Turn chaos into clarity. Build momentum with structure,
                interactivity, and feedback. Your journey to mastery starts here.
              </motion.p>
              <motion.div 
                className="mt-10 flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white shadow-2xl border-0 px-10 py-7 text-lg font-bold transition-all hover:shadow-cyan-500/25"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Start Your Journey →
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black shadow-2xl px-10 py-7 text-lg font-bold transition-all hover:shadow-cyan-400/25"
                    onClick={() => window.open('https://www.linkedin.com/in/harshvardhan-chaturvedi-bbb85b338', '_blank')}
                  >
                    JOIN US NOW
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Study Modal */}
      <StudyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
