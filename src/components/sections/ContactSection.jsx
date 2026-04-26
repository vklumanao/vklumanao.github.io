import {
  FaCopy,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import GlassCard from "../ui/GlassCard";
import SectionContainer from "../layout/SectionContainer";
import { trackEvent } from "../../lib/analytics";

function ContactSection({
  email,
  phone,
  socials,
  resumeUrl,
  onCopyEmail,
  onSubmit,
  isSubmitting,
  submitStatus,
  submitMessage,
}) {
  return (
    <SectionContainer id="contact" title="Contact">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form className="glass rounded-2xl p-5 sm:p-6" onSubmit={onSubmit}>
          <div className="grid gap-4">
            <input
              className="min-h-11 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-white/15 dark:bg-white/5"
              placeholder="Your Name"
              autoComplete="name"
              name="name"
              required
            />
            <input
              className="min-h-11 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-white/15 dark:bg-white/5"
              placeholder="Your Email"
              type="email"
              autoComplete="email"
              inputMode="email"
              name="email"
              required
            />
            <textarea
              className="min-h-36 rounded-2xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-white/15 dark:bg-white/5"
              placeholder="Your Message"
              name="message"
              required
            />
            <button
              className="min-h-11 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 dark:bg-zinc-100 dark:text-zinc-900"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submitMessage ? (
              <p
                className={`text-sm ${
                  submitStatus === "success"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {submitMessage}
              </p>
            ) : null}
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
              onClick={() =>
                trackEvent("github_clicked", { location: "contact_section" })
              }
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
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={onCopyEmail}
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300/80 bg-zinc-100/70 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-white/20 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10 dark:focus-visible:ring-white/30"
            >
              <FaCopy /> Copy Email
            </button>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("cv_opened", { location: "contact_section" })
              }
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-white/30"
            >
              View CV
            </a>
          </div>
          <p className="text-sm text-zinc-500">{email}</p>
          <p className="text-sm text-zinc-500">{phone}</p>
        </GlassCard>
      </div>
    </SectionContainer>
  );
}

export default ContactSection;
