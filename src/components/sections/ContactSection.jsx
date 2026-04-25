import {
  FaCopy,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import GlassCard from "../ui/GlassCard";
import SectionContainer from "../layout/SectionContainer";

function ContactSection({ email, phone, socials, onCopyEmail, onSubmit }) {
  return (
    <SectionContainer id="contact" title="Contact">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form className="glass rounded-2xl p-5 sm:p-6" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <input
              className="min-h-11 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-white/15 dark:bg-white/5"
              placeholder="Your Name"
              autoComplete="name"
            />
            <input
              className="min-h-11 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-white/15 dark:bg-white/5"
              placeholder="Your Email"
              type="email"
              autoComplete="email"
              inputMode="email"
            />
            <textarea
              className="min-h-36 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-white/15 dark:bg-white/5"
              placeholder="Your Message"
            />
            <button
              className="min-h-11 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 dark:bg-zinc-100 dark:text-zinc-900"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>

        <GlassCard className="space-y-4 rounded-2xl p-5 sm:p-6">
          <h3 className="text-2xl font-semibold">
            Let&apos;s Build Something Great
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Available for freelance projects, collaborations, and internships.
            Reach out and I&apos;ll reply soon.
          </p>
          <div className="flex gap-3 text-xl">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/20 p-3 transition hover:-translate-y-0.5"
            >
              <FaGithub />
            </a>
            <a
              href={socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/20 p-3 transition hover:-translate-y-0.5"
            >
              <FaFacebookF />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/20 p-3 transition hover:-translate-y-0.5"
            >
              <FaInstagram />
            </a>
            <a
              href={`mailto:${email}`}
              aria-label="Send email"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/20 p-3 transition hover:-translate-y-0.5"
            >
              <FaEnvelope />
            </a>
          </div>
          <button
            onClick={onCopyEmail}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            <FaCopy /> Copy Email
          </button>
          <p className="text-sm text-zinc-500">{email}</p>
          <p className="text-sm text-zinc-500">{phone}</p>
        </GlassCard>
      </div>
    </SectionContainer>
  );
}

export default ContactSection;
