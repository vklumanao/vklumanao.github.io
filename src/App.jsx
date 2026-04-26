import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import EducationSection from "./components/sections/EducationSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import HeroSection from "./components/sections/HeroSection";
import HighlightsSection from "./components/sections/HighlightsSection";
import OrganizationsSection from "./components/sections/OrganizationsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import TrainingsSection from "./components/sections/TrainingsSection";
import CommandPalette from "./components/layout/CommandPalette";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import CertificateModal from "./components/ui/CertificateModal";
import ProfileModal from "./components/ui/ProfileModal";
import ProjectModal from "./components/ui/ProjectModal";
import Toast from "./components/ui/Toast";
import ParticleBackground from "./components/ui/ParticleBackground";
import Preloader from "./components/ui/Preloader";
import { certificates } from "./data/certificates";
import { navLinks } from "./data/navLinks";
import { education } from "./data/education";
import { academicHighlights } from "./data/highlights";
import { organizations } from "./data/organizations";
import { personalInfo } from "./data/personal";
import { projectCategories, projects } from "./data/projects";
import { roles } from "./data/roles";
import { skillGroups } from "./data/skills";
import { trainings } from "./data/trainings";
import { workExperience } from "./data/workExperience";
import { useActiveSection } from "./hooks/useActiveSection";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";
import { useTyping } from "./hooks/useTyping";

const sectionIds = navLinks.map((link) => link.id);

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [showPreloader, setShowPreloader] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [certificateIndex, setCertificateIndex] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [profileZoomed, setProfileZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSection = useActiveSection(sectionIds);
  const typedRole = useTyping(roles);
  const heroSnapshot = {
    focus: "Web Developer",
    availability: "Open for collaborations, and project-based opportunities.",
    currentTrack: "Information System student building real-world systems",
    scope: "Web apps, academic systems, and interactive portfolio work",
    stats: [
      `${projects.length} projects documented`,
      `${workExperience.length} work experiences`,
      `${academicHighlights.length} academic highlights`,
    ],
  };

  const selectedProject =
    selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;
  const selectedCertificate =
    certificateIndex !== null ? certificates[certificateIndex] : null;

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  const isOverlayOpen =
    selectedProjectIndex !== null ||
    profileZoomed ||
    certificateIndex !== null ||
    commandOpen ||
    showPreloader;
  useLockBodyScroll(isOverlayOpen);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const key = "portfolio_preloader_seen";
    const alreadySeen = sessionStorage.getItem(key) === "1";
    if (alreadySeen) return;

    setShowPreloader(true);
    const duration = prefersReducedMotion ? 450 : 900;
    const timer = setTimeout(() => {
      setShowPreloader(false);
      sessionStorage.setItem(key, "1");
    }, duration);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const navigateTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  const updateGlow = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--y",
      `${event.clientY - rect.top}px`,
    );
  };

  const openProject = (projectTitle) => {
    const projectIndex = projects.findIndex(
      (project) => project.title === projectTitle,
    );
    if (projectIndex >= 0) {
      setSelectedProjectIndex(projectIndex);
    }
  };

  const nextProject = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    if (selectedProjectIndex === null) return;
    setSelectedProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length,
    );
  };

  const nextCertificate = () => {
    if (certificateIndex === null) return;
    setCertificateIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    if (certificateIndex === null) return;
    setCertificateIndex(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
  };

  const commandActions = [
    ...navLinks.map((link) => ({
      id: `section-${link.id}`,
      label: `Go to ${link.label}`,
      hint: "Section",
      run: () => navigateTo(link.id),
    })),
    ...projects.map((project) => ({
      id: `project-${project.title}`,
      label: `Open project: ${project.title}`,
      hint: project.category,
      run: () => {
        setFilter("All");
        openProject(project.title);
      },
    })),
    {
      id: "contact-copy",
      label: "Copy email address",
      hint: "Action",
      run: () => copyEmail(),
    },
  ];

  const commandResults = commandActions
    .filter((action) =>
      action.label.toLowerCase().includes(commandQuery.toLowerCase()),
    )
    .slice(0, 8);

  const keyboardHandler = useCallback(
    (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
        setSelectedProjectIndex(null);
        setCertificateIndex(null);
        setProfileZoomed(false);
      }

      if (selectedProjectIndex !== null && event.key === "ArrowRight") {
        setSelectedProjectIndex((prev) => (prev + 1) % projects.length);
      }
      if (selectedProjectIndex !== null && event.key === "ArrowLeft") {
        setSelectedProjectIndex(
          (prev) => (prev - 1 + projects.length) % projects.length,
        );
      }

      if (certificateIndex !== null && event.key === "ArrowDown") {
        setCertificateIndex((prev) => (prev + 1) % certificates.length);
      }
      if (certificateIndex !== null && event.key === "ArrowUp") {
        setCertificateIndex(
          (prev) => (prev - 1 + certificates.length) % certificates.length,
        );
      }
    },
    [certificateIndex, selectedProjectIndex],
  );

  useKeyboardShortcuts(keyboardHandler);

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-bg dark:text-text">
      <ParticleBackground theme={theme} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.09),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(255,255,255,0.07),transparent_35%)] opacity-70" />
      <AnimatePresence>{showPreloader && <Preloader />}</AnimatePresence>

      <Navbar
        navLinks={navLinks}
        activeSection={activeSection}
        navigateTo={navigateTo}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onOpenCommand={() => setCommandOpen(true)}
      />

      <main>
        <HeroSection
          typedRole={typedRole}
          onViewProjects={() => navigateTo("projects")}
          onContact={() => navigateTo("contact")}
          name={personalInfo.name}
          tagline={personalInfo.tagline}
          snapshot={heroSnapshot}
        />
        <AboutSection
          personalInfo={personalInfo}
          onOpenProfile={() => setProfileZoomed(true)}
        />
        <SkillsSection skillGroups={skillGroups} onGlowMove={updateGlow} />
        <ProjectsSection
          categories={projectCategories}
          filter={filter}
          setFilter={setFilter}
          filteredProjects={filteredProjects}
          allProjects={projects}
          onOpenProject={openProject}
          onGlowMove={updateGlow}
        />
        <ExperienceSection workExperience={workExperience} />
        <TrainingsSection
          trainings={trainings}
          certificates={certificates}
          onOpenCertificate={setCertificateIndex}
        />
        <EducationSection education={education} />
        <HighlightsSection highlights={academicHighlights} />
        <OrganizationsSection organizations={organizations} />
        <ContactSection
          email={personalInfo.email}
          phone={personalInfo.phone}
          socials={personalInfo.socials}
          onCopyEmail={copyEmail}
          onSubmit={handleContactSubmit}
        />
      </main>

      <Footer />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        query={commandQuery}
        setQuery={setCommandQuery}
        results={commandResults}
        onSelect={(action) => {
          action.run();
          setCommandOpen(false);
          setCommandQuery("");
        }}
      />

      <ProfileModal
        open={profileZoomed}
        onClose={() => setProfileZoomed(false)}
        image={personalInfo.profileImage}
        name={personalInfo.name}
      />

      <CertificateModal
        open={selectedCertificate !== null}
        certificate={selectedCertificate}
        onClose={() => setCertificateIndex(null)}
        onPrev={prevCertificate}
        onNext={nextCertificate}
      />

      <ProjectModal
        open={selectedProject !== null}
        project={selectedProject}
        onClose={() => setSelectedProjectIndex(null)}
        onPrev={prevProject}
        onNext={nextProject}
      />

      <Toast open={copied} message="Email copied to clipboard" />
    </div>
  );
}

export default App;
