import { Link } from "react-router";
import { FiArrowRight, FiBookOpen, FiTruck, FiUsers } from "react-icons/fi";

const posts = [
  {
    title: "How BookCourier Requests Move From Shelf To Door",
    excerpt:
      "A clear look at how readers browse, order, and follow book delivery status from the dashboard.",
    icon: FiTruck,
  },
  {
    title: "Building A Better Local Reading Network",
    excerpt:
      "Why shared catalogs, verified users, and library hubs make book access easier for students and readers.",
    icon: FiUsers,
  },
  {
    title: "Choosing The Right Book For Your Next Study Sprint",
    excerpt:
      "Practical ways to use categories, search, and latest additions to discover useful books faster.",
    icon: FiBookOpen,
  },
];

const BlogPreview = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="badge badge-warning font-bold uppercase tracking-wide">
            Blog preview
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Reader Guides & Updates
          </h2>
          <p className="mt-3 max-w-2xl text-base-content/60">
            Practical notes about using BookCourier, managing orders, and
            discovering books through local library hubs.
          </p>
        </div>
        <Link to="/blog" className="btn btn-outline">
          View Blog
          <FiArrowRight />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => {
          const Icon = post.icon;
          return (
            <article
              key={post.title}
              className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Icon className="text-xl" />
              </span>
              <h3 className="mt-5 text-xl font-black">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-base-content/60">
                {post.excerpt}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BlogPreview;
