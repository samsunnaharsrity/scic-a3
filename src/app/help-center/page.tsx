export default function HelpCenterPage() {
  const faqs = [
    {
      title: "How do I book a stay?",
      answer:
        "Browse available properties, select your preferred dates, and complete the booking process securely.",
    },
    {
      title: "Can I cancel my booking?",
      answer:
        "Yes. Cancellation depends on the property's cancellation policy.",
    },
    {
      title: "How do I contact support?",
      answer:
        "You can contact us by email, phone, or through the Contact page.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-30">
      <h1 className="mb-4 text-4xl font-bold">Help Center</h1>

      <p className="mb-10 text-gray-600">
        Find answers to common questions and get assistance.
      </p>

      <div className="space-y-6">
        {faqs.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border p-6 shadow-sm"
          >
            <h2 className="mb-2 text-xl font-semibold">
              {item.title}
            </h2>

            <p className="text-gray-600">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}