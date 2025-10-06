import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Youtube, BookOpen, MapPin, Brain, ClipboardCheck, Route } from "lucide-react";
import type { ProcessStudyRequest, ProcessStudyResponse, StudyProcessAction } from "@shared/api";

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudyModal({ isOpen, onClose }: StudyModalProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessStudyResponse | null>(null);

  const handleSubmit = async (action: StudyProcessAction) => {
    if (!url.trim()) {
      setError("Please enter a YouTube or Udemy URL first!");
      return;
    }
    setLoading(action);
    setError(null);
    setResult(null);
    try {
      const body: ProcessStudyRequest = { url, action };
      const res = await fetch("/api/study/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: ProcessStudyResponse = await res.json();
      if (!res.ok || data.status === "error") {
        throw new Error(data?.message || "Failed to process");
      }
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(null);
    }
  };

  const actionButtons = [
    {
      id: "playlists",
      title: "AI-curated playlists",
      description: "Smart content organization",
      icon: <Brain className="h-6 w-6" />,
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      hoverGradient: "hover:from-purple-600 hover:via-violet-600 hover:to-indigo-600",
      shadowColor: "shadow-purple-500/25 hover:shadow-purple-500/40"
    },
    {
      id: "quizzes",
      title: "Auto-generated quizzes",
      description: "Test your knowledge",
      icon: <ClipboardCheck className="h-6 w-6" />,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      hoverGradient: "hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600",
      shadowColor: "shadow-teal-500/25 hover:shadow-teal-500/40"
    },
    {
      id: "roadmap",
      title: "Personalized study roadmap",
      description: "Your learning path",
      icon: <Route className="h-6 w-6" />,
      gradient: "from-orange-500 via-pink-500 to-rose-500",
      hoverGradient: "hover:from-orange-600 hover:via-pink-600 hover:to-rose-600",
      shadowColor: "shadow-pink-500/25 hover:shadow-pink-500/40"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
              >
                <X className="h-5 w-5 text-white/70 group-hover:text-white" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Start Your Learning Journey
                  </h2>
                  <p className="text-white/70 text-lg">
                    Paste your course link and choose how you want to learn
                  </p>
                </motion.div>
              </div>

              {/* URL Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-400" />
                      <BookOpen className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                  <Input
                    type="url"
                    placeholder="Paste your YouTube or Udemy course link here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-20 pr-4 py-6 text-lg bg-white/5 border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
                  />
                  {error && (
                    <div className="mt-2 text-sm text-rose-300">{error}</div>
                  )}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {actionButtons.map((button, index) => (
                  <motion.div
                    key={button.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Button
                      onClick={() => handleSubmit(button.id as StudyProcessAction)}
                      className={`w-full p-6 h-auto rounded-2xl bg-gradient-to-r ${button.gradient} ${button.hoverGradient} text-white font-semibold text-left shadow-lg ${button.shadowColor} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group`}
                      disabled={!!loading}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors duration-200">
                          {button.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold mb-1">{button.title}</div>
                          <div className="text-white/80 text-sm">{button.description}</div>
                        </div>
                        <div className="text-white/80">
                          {loading === button.id ? "Processing…" : "→"}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Results */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/90 text-sm"
                >
                  <div className="mb-2 font-semibold">{result.message}</div>
                  {result.data?.playlists && (
                    <ul className="list-disc pl-6 space-y-1">
                      {result.data.playlists.map((p, i) => (
                        <li key={i}>{p.title} — {p.items} items</li>
                      ))}
                    </ul>
                  )}
                  {result.data?.quizzes && (
                    <ul className="list-disc pl-6 space-y-1">
                      {result.data.quizzes.map((q, i) => (
                        <li key={i}>{q.topic} — {q.questions} questions</li>
                      ))}
                    </ul>
                  )}
                  {result.data?.roadmap && (
                    <ul className="list-disc pl-6 space-y-1">
                      {result.data.roadmap.map((r, i) => (
                        <li key={i}>{r.phase} — {r.durationWeeks} weeks</li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 text-center"
              >
                <p className="text-white/50 text-sm">
                  Supports YouTube videos, playlists, and Udemy courses
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}