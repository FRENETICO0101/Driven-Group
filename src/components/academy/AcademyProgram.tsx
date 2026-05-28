interface AcademyProgramProps {
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  icon: string;
  duration?: string;
  comingSoon?: boolean;
}

export function AcademyProgram({
  title,
  subtitle,
  description,
  topics,
  icon,
  duration,
  comingSoon = true,
}: AcademyProgramProps) {
  return (
    <div className="bg-white border border-light-gray rounded-lg p-10 sm:p-12 md:p-16">
      {/* Icon & Title */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-black text-3xl">{icon}</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl font-black text-black mb-2">
          {title}
        </h3>
        <p className="text-dark-gray font-semibold">{subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-dark-gray text-base leading-relaxed mb-8">
        {description}
      </p>

      {/* Topics */}
      <div className="mb-8 pb-8 border-b border-light-gray">
        <p className="editorial-label text-gray mb-4">KEY TOPICS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topics.map((topic, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-black shrink-0 text-lg">
                check_circle
              </span>
              <span className="text-dark-gray text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Duration & Coming Soon */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {duration && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-light-gray rounded-lg">
            <span className="material-symbols-outlined text-dark-gray text-lg">schedule</span>
            <p className="text-dark-gray font-semibold text-sm">{duration}</p>
          </div>
        )}
        {comingSoon && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-light-gray rounded-lg">
            <span className="material-symbols-outlined text-dark-gray text-lg">schedule</span>
            <p className="text-dark-gray font-semibold text-sm">Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
