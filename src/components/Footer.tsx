import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "../lib/motion";
import { Mail, Download, Send, Github, Linkedin, ArrowUpRight, Copy, Check, Loader2 } from "lucide-react";

const EMAIL = "bhadrinathan28@gmail.com";
type Status = "idle" | "sending" | "success" | "error";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const key = import.meta.env.VITE_WEB3FORMS_KEY;
    // No form backend configured → open the visitor's mail client
    if (!key) {
      mailtoFallback();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `Portfolio message from ${name || "someone"}`,
          from_name: "bha3.me",
          name,
          email: email || "not provided",
          message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1a2e] px-4 py-2.5 text-sm text-[#000b1b] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0358fc] focus:ring-2 focus:ring-[#0358fc]/15 transition-all duration-200";

  return (
    <footer
      id="contact"
      className="relative py-12 md:py-16 px-5 sm:px-6 md:px-12 overflow-hidden scroll-mt-24"
    >
      <motion.div
        className="max-w-6xl mx-auto relative"
        variants={stagger()}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {/* Top divider */}
        <motion.div
          variants={fadeUp}
          className="h-px w-full bg-gradient-to-r from-transparent via-[#0358fc]/25 to-transparent mb-12"
        />

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left: heading + form */}
          <motion.div variants={fadeUp}>
            <p className="font-brand text-xs text-[#0358fc] dark:text-[#4b8dff] tracking-[0.2em] uppercase mb-3">
              Get in touch
            </p>
            <h2 className="font-brand text-2xl md:text-3xl text-[#000b1b] dark:text-slate-100 leading-tight mb-6">
              Let's build something
              <br />
              <span className="gradient-text">together.</span>
            </h2>

            <form onSubmit={onSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  aria-label="Your name"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  aria-label="Your email"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="What would you like to build?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputCls} resize-none`}
                aria-label="Your message"
              />
              <div className="flex items-center gap-3 flex-wrap">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0358fc] text-white font-medium text-sm hover:bg-[#0246d4] transition-colors duration-300 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Sending…
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check size={15} /> Sent!
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Send message
                    </>
                  )}
                </motion.button>
                {status === "success" && (
                  <span className="text-xs text-green-600 dark:text-green-400" role="status">
                    Thanks — I'll get back to you soon.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-xs text-red-500" role="alert">
                    Couldn't send. Please email me directly.
                  </span>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right: direct links */}
          <motion.div variants={fadeUp} className="md:pt-14">
            <p className="font-mono text-[11px] text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase mb-5">
              Or reach me directly
            </p>

            <div className="space-y-3">
              {/* Email + copy */}
              <div className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0358fc]/40 hover:bg-[#0358fc]/[0.03] transition-all duration-200">
                <span className="w-9 h-9 rounded-lg bg-[#0358fc]/10 text-[#0358fc] dark:text-[#4b8dff] flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex-1 min-w-0 text-sm text-slate-600 dark:text-slate-300 group-hover:text-[#0358fc] transition-colors truncate"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 p-1.5 rounded-md text-slate-400 dark:text-slate-500 hover:text-[#0358fc] hover:bg-[#0358fc]/10 transition-colors"
                >
                  {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                </button>
              </div>

              <a
                href="/Bhadrinathan_A_Resume.pdf"
                download
                className="group flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0358fc]/40 hover:bg-[#0358fc]/[0.03] transition-all duration-200"
              >
                <span className="w-9 h-9 rounded-lg bg-[#0358fc]/10 text-[#0358fc] dark:text-[#4b8dff] flex items-center justify-center shrink-0">
                  <Download size={16} />
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-[#0358fc] transition-colors">
                  Download résumé (PDF)
                </span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/bhadri01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0358fc]/40 hover:bg-[#0358fc]/[0.03] transition-all duration-200 text-sm text-slate-600 dark:text-slate-300 hover:text-[#0358fc]"
                >
                  <Github size={16} /> GitHub <ArrowUpRight size={13} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhadrinathan-a-90b8bb361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-[#0358fc]/40 hover:bg-[#0358fc]/[0.03] transition-all duration-200 text-sm text-slate-600 dark:text-slate-300 hover:text-[#0358fc]"
                >
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tracking-wider">
            &copy; {new Date().getFullYear()} Bhadrinathan A
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
