interface ContactItem {
  icon: string;
  title: string;
  details: string[];
}

const contactItems: ContactItem[] = [
  {
    icon: "location_on",
    title: "Headquarters",
    details: ["Miami, Florida", "United States", "Mercados en América del Norte y Europa"],
  },
  {
    icon: "phone",
    title: "Phone",
    details: ["Disponible por solicitud", "Respuesta en 24 horas", "Comunicación confidencial"],
  },
  {
    icon: "mail",
    title: "Email",
    details: ["info@drivengroup.com", "partnerships@drivengroup.com"],
  },
];

export function ContactInfoSection() {
  return (
    <section className="py-20 sm:py-24 md:py-32 max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 sm:mb-20">
        <p className="editorial-label text-gray mb-2">GET IN TOUCH</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.1]">
          Contact Information
        </h2>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {contactItems.map((item) => (
          <div key={item.title} className="flex flex-col">
            {/* Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-yellow-600 text-2xl">
                  {item.icon}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-4 tracking-tight">
              {item.title}
            </h3>
            <ul className="space-y-3">
              {item.details.map((detail) => (
                <li key={detail} className="text-base text-dark-gray leading-relaxed font-light">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
