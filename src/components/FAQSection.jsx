const faqs = [
  {
    question: "How do I request a book?",
    answer:
      "Open the Books page, choose a title, view details, and place an order with your delivery contact information.",
  },
  {
    question: "Where can I track my orders?",
    answer:
      "After login, go to Dashboard and open My Orders to see status, payment state, and available actions.",
  },
  {
    question: "Can librarians manage catalog items?",
    answer:
      "Yes. Librarian and admin roles can add books, while admins can manage, edit, publish, and delete catalog entries.",
  },
  {
    question: "Which cities are covered?",
    answer:
      "BookCourier currently highlights Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, and Barishal delivery hubs.",
  },
];

const FAQSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <span className="badge badge-warning font-bold uppercase tracking-wide">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Questions Readers Ask
          </h2>
          <p className="mt-4 text-base-content/60">
            Quick answers about the borrowing, dashboard, and delivery flow.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div
              key={item.question}
              className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100"
            >
              <input type="radio" name="bookcourier-faq" defaultChecked={index === 0} />
              <div className="collapse-title text-lg font-black">
                {item.question}
              </div>
              <div className="collapse-content text-sm leading-7 text-base-content/60">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
