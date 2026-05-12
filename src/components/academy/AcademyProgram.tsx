interface AcademyProgramProps {
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  icon: string;
  comingSoon?: boolean;
}

export function AcademyProgram({
  title,
  subtitle,
  description,
  topics,
  icon,
  comingSoon = true,
}: AcademyProgramProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-10 sm:p-12 md:p-16">
      {/* Icon & Title */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-slate-900 text-3xl">{icon}</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
          {title}
        </h3>
        <p className="text-slate-600 font-semibold">{subtitle}</p>
      </div>

      {/* Description */}
      <p className="text-slate-700 text-base leading-relaxed mb-8">
        {description}
      </p>

      {/* Topics */}
      <div className="mb-8 pb-8 border-b border-slate-200">
        <p className="editorial-label text-slate-400 mb-4">KEY TOPICS</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topics.map((topic, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-slate-900 flex-shrink-0 text-lg">
                check_circle
              </span>
              <span className="text-slate-700 text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg">
          <span className="material-symbols-outlined text-slate-600 text-lg">schedule</span>
          <p className="text-slate-700 font-semibold text-sm">Coming Soon</p>
        </div>
      )}
    </div>
  );
}
