export default function FAQPage() {
  const faqs = [
    {
      q: "How do I create an account?",
      a: "Click Sign Up and complete the registration form.",
    },
    {
      q: "How can I make a booking?",
      a: "Choose a property, select dates, and confirm payment.",
    },
    {
      q: "Is online payment secure?",
      a: "Yes. All payments are securely processed.",
    },
    {
      q: "Can I become a host?",
      a: "Yes. Register as a host and list your property.",
    },
    {
      q: "How do I contact customer support?",
      a: "Visit the Contact page or email our support team.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-30">
      <h1 className="mb-10 text-4xl font-bold">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="rounded-xl border p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {faq.q}
            </h2>

            <p className="mt-3 text-gray-600">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}