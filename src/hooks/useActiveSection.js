import { useEffect, useState } from "react";

export function useActiveSection(sectionIds, threshold = 0.45) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeSection;
}
