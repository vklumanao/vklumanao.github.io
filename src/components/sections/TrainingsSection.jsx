import { useState } from "react";
import { FaCertificate } from "react-icons/fa";
import SectionContainer from "../layout/SectionContainer";
import CertificateCard from "../ui/CertificateCard";

function TrainingsSection({ trainings, certificates, onOpenCertificate }) {
  const [showAllTrainings, setShowAllTrainings] = useState(false);
  const visibleTrainings = showAllTrainings ? trainings : trainings.slice(0, 3);

  return (
    <SectionContainer id="trainings" title="Trainings & Seminars">
      <div className="grid gap-4 md:grid-cols-2">
        {visibleTrainings.map((item) => (
          <article
            key={`${item.title}-${item.period}`}
            className="glass rounded-2xl p-5 sm:p-6"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-zinc-500 dark:text-zinc-300">
              <FaCertificate /> {item.period}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.venue}
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sponsor:{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-200">
                {item.sponsor}
              </span>
            </p>
          </article>
        ))}
      </div>

      {trainings.length > 3 && (
        <div className="mt-4 sm:hidden">
          <button
            type="button"
            onClick={() => setShowAllTrainings((prev) => !prev)}
            className="w-full rounded-xl border border-zinc-300/70 bg-zinc-200/40 px-4 py-2.5 text-sm font-medium dark:border-white/15 dark:bg-white/5"
          >
            {showAllTrainings ? "Show Less Trainings" : "Show More Trainings"}
          </button>
        </div>
      )}

      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-semibold">Certificates</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.title}
              certificate={certificate}
              index={index}
              onOpen={onOpenCertificate}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export default TrainingsSection;
