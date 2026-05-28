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
    <div className="border border-pale p-10 sm:p-12 md:p-14 group hover:border-light-gray transition-colors duration-500">

      {/* Header */}
      <div className="mb-8">
        <span
          className="material-symbols-outlined text-dark-gray mb-6 block"
          style={{ fontSize: "22px", fontVariationSettings: "'wght' 200" }}
        >
          {icon}
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl text-ink tracking-tight mb-2 text-balance">
          {title}
        </h3>
        <p className="editorial-label text-gray">{subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-dark-gray text-sm sm:text-base leading-[1.8] font-light mb-10">
        {description}
      </p>

      {/* Topics */}
      <div className="mb-8 pb-8 border-b border-pale">
        <p className="editorial-label text-gray mb-5">Key Topics</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
          {topics.map((topic, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="w-px h-4 bg-light-gray mt-1 shrink-0" />
              <span className="text-dark-gray text-sm leading-relaxed">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {duration && (
          <span className="editorial-label text-gray border border-pale px-3 py-2">
            {duration}
          </span>
        )}
        {comingSoon && (
          <div className="flex items-center gap-2">
            <span className="editorial-label text-mid-gray">Coming Soon</span>
            <span className="inline-block w-1 h-1 rounded-full bg-mid-gray animate-pulse" />
          </div>
        )}
      </div>

    </div>
  );
}
