import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiMessageSquare, FiPhone, FiSend } from "react-icons/fi";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const contactMessage = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    if (Object.values(contactMessage).some((value) => !value)) {
      toast.error("Please complete every field");
      return;
    }

    setSubmitting(true);

    fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contactMessage),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to send message");
        return data;
      })
      .then((data) => {
        if (data.insertedId) {
          toast.success("Message sent successfully");
          form.reset();
        }
      })
      .catch((error) => toast.error(error.message || "Failed to send message"))
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-900 p-8 text-white shadow-xl">
          <span className="badge badge-warning font-bold uppercase tracking-wide">
            Contact
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
            Need help with a book request?
          </h1>
          <p className="mt-5 leading-7 text-slate-300">
            Send us your question, partnership request, or delivery concern.
            The message is stored securely for the BookCourier team.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <p className="flex items-center gap-3">
              <FiMapPin className="text-amber-400" />
              Banani Road 11, Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-3">
              <FiMail className="text-amber-400" />
              support@bookcourier.com
            </p>
            <p className="flex items-center gap-3">
              <FiPhone className="text-amber-400" />
              +880 1234-567890
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-3xl font-black">Send Message</h2>
          <p className="mt-2 text-sm text-base-content/60">
            All fields are required.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="input input-bordered w-full"
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              className="input input-bordered w-full"
            />
          </div>

          <label className="input input-bordered mt-4 flex items-center gap-2">
            <FiMessageSquare className="text-base-content/40" />
            <input
              name="subject"
              type="text"
              placeholder="Subject"
              required
              className="grow"
            />
          </label>

          <textarea
            name="message"
            placeholder="Write your message..."
            required
            minLength={10}
            className="textarea textarea-bordered mt-4 min-h-40 w-full"
          />

          <button
            disabled={submitting}
            className="btn mt-5 w-full border-none bg-amber-600 text-white hover:bg-amber-700"
          >
            {submitting ? <span className="loading loading-spinner loading-sm" /> : <FiSend />}
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
