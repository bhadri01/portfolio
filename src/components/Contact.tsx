import { useScrollReveal } from "../hooks/useScrollReveal";
import { Mail, MessageCircle, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12">
          <MessageCircle className="text-green-400" size={20} />
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase">
            Contact
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-green-400/40 to-transparent" />
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Exo 2', sans-serif" }}
        >
          Let's{" "}
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Connect
          </span>
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg">
          Got a project in mind, a question, or just want to say hi? Drop me a message and I'll get back to you as soon as I can.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Email", value: "bhadri2002@gmail.com", href: "mailto:bhadri2002@gmail.com", Icon: Mail },
            { label: "LinkedIn", value: "Bhadrinathan A", href: "https://www.linkedin.com/in/bhadrinathan-a-90b8bb361", Icon: Linkedin },
            { label: "GitHub", value: "@bhadri01", href: "https://github.com/bhadri01", Icon: Github },
          ].map(({ label, value, href, Icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="glass rounded-2xl border border-white/10 p-5 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300">
              <Icon size={20} className="text-green-400 mb-4" />
              <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">{label}</span>
              <span className="text-sm text-gray-200 break-words">{value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
