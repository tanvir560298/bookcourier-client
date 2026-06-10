import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiSave, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [saving, setSaving] = useState(false);

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();

    if (!name || !photo) {
      toast.error("Name and photo URL are required");
      return;
    }

    setSaving(true);

    updateUserProfile(name, photo)
      .then(() => {
        toast.success("Profile updated successfully");
        window.location.reload();
      })
      .catch(() => toast.error("Failed to update profile"))
      .finally(() => setSaving(false));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <span className="badge badge-warning font-bold uppercase tracking-wide">
          Account
        </span>
        <h1 className="mt-3 text-4xl font-black">Profile Settings</h1>
        <p className="mt-2 text-base-content/60">
          Keep your BookCourier reader profile accurate for orders and delivery
          updates.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-3xl border border-base-300 bg-base-100 p-6 text-center shadow-sm">
          <img
            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={user?.displayName || "User"}
            className="mx-auto h-32 w-32 rounded-full border-4 border-amber-500 object-cover"
          />
          <h2 className="mt-5 text-3xl font-black">
            {user?.displayName || "No Name"}
          </h2>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-base-content/55">
            <FiMail />
            {user?.email}
          </p>
        </aside>

        <form
          onSubmit={handleUpdateProfile}
          className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
        >
          <h3 className="text-2xl font-black">Update Profile</h3>
          <p className="mt-1 text-sm text-base-content/60">
            Changes will update your Firebase profile.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="profile-name">
                Name
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FiUser className="text-base-content/40" />
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  defaultValue={user?.displayName || ""}
                  placeholder="Enter your name"
                  required
                  className="grow"
                />
              </label>
            </div>

            <div>
              <label className="label" htmlFor="profile-photo">
                Photo URL
              </label>
              <input
                id="profile-photo"
                type="url"
                name="photo"
                defaultValue={user?.photoURL || ""}
                placeholder="https://example.com/photo.jpg"
                required
                className="input input-bordered w-full"
              />
            </div>

            <button
              disabled={saving}
              className="btn w-full border-none bg-amber-600 text-white hover:bg-amber-700"
            >
              {saving ? <span className="loading loading-spinner loading-sm" /> : <FiSave />}
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
