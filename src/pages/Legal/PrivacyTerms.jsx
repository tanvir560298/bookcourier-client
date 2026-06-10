const PrivacyTerms = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Policy
        </span>
        <h1 className="mt-5 text-4xl font-black">Privacy & Terms</h1>
        <p className="mt-4 leading-7 text-base-content/60">
          BookCourier uses account, order, and contact information only to
          provide book browsing, delivery request, dashboard, and support
          features.
        </p>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-black">Information We Collect</h2>
            <p className="mt-2 leading-7 text-base-content/60">
              We store user profile details, book orders, payment records,
              dashboard roles, and contact form messages needed to operate the
              application.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black">User Responsibilities</h2>
            <p className="mt-2 leading-7 text-base-content/60">
              Users should provide accurate contact and delivery information
              when placing orders and should not misuse dashboard access.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Delivery & Orders</h2>
            <p className="mt-2 leading-7 text-base-content/60">
              Order status, payment status, and courier information are managed
              inside the BookCourier dashboard for transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyTerms;
