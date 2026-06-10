import { FiBookOpen, FiTruck, FiUsers } from "react-icons/fi";

const posts = [
  {
    title: "How BookCourier Requests Move From Shelf To Door",
    body:
      "Readers browse the catalog, open a details page, submit delivery information, and then track the order from the dashboard as it moves through pending, shipped, and delivered states.",
    icon: FiTruck,
  },
  {
    title: "Building A Better Local Reading Network",
    body:
      "BookCourier connects catalog management, reader accounts, and delivery workflows so local library access feels organized and reachable.",
    icon: FiUsers,
  },
  {
    title: "Choosing The Right Book For Your Next Study Sprint",
    body:
      "Use search, category filters, availability filters, and latest additions to quickly find books that match your study or reading goals.",
    icon: FiBookOpen,
  },
];

const Blog = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Blog
        </span>
        <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight sm:text-5xl">
          Reader Guides & BookCourier Updates
        </h1>
        <p className="mt-4 max-w-3xl leading-7 text-base-content/60">
          Practical notes about finding books, placing orders, and using the
          BookCourier dashboard.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {posts.map((post) => {
          const Icon = post.icon;
          return (
            <article
              key={post.title}
              className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Icon className="text-xl" />
              </span>
              <h2 className="mt-5 text-2xl font-black">{post.title}</h2>
              <p className="mt-3 leading-7 text-base-content/60">{post.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Blog;
