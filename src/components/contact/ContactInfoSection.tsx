interface ContactItem {
  index: string;
  title: string;
  details: string[];
  href?: string;
}

const contactItems: ContactItem[] = [
  {
    index: "01",
    title: "Headquarters",
    details: ["Miami, Florida", "Luxury Tower, Suite 2500", "33130 USA"],
  },
  {
    index: "02",
    title: "Phone",
    details: ["+1 (305) 555-0123", "+1 (305) 555-0124", "Mon – Fri, 9am – 6pm EST"],
    href: "tel:+13055550123",
  },
  {
    index: "03",
    title: "Email",
    details: ["info@drivengroup.com", "partnerships@drivengroup.com", "careers@drivengroup.com"],
    href: "mailto:info@drivengroup.com",
  },
];

export function ContactInfoSection() {
  return (
    <section className="py-24 sm:py-28 md:py-36 border-t border-pale">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <p className="editorial-label text-gray mb-3">Reach Out</p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-[1.05] text-balance">
            Contact Information
          </h2>
        </div>

        {/* Items — horizontal rule layout */}
        <div className="divide-y divide-pale">
          {contactItems.map((item) => (
            <div
              key={item.title}
              className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start group"
            >
              <div className="md:col-span-1">
                <span className="editorial-label text-light-gray">{item.index}</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-ink tracking-tight">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-2">
                  {item.details.map((detail, i) => (
                    <li key={detail}>
                      {item.href && i === 0 ? (
                        <a
                          href={item.href}
                          className="text-sm sm:text-base text-dark-gray hover:text-ink transition-colors duration-300 font-light"
                        >
                          {detail}
                        </a>
                      ) : (
                        <span className="text-sm sm:text-base text-dark-gray font-light">
                          {detail}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
