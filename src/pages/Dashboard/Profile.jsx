import { useState } from "react";
import toast from "react-hot-toast";
import { FiImage, FiLock, FiMail, FiSave, FiUpload, FiUser } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateUserProfile, updatePassword } = useAuth();
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.photoURL || "");
  const [photoValue, setPhotoValue] = useState(user?.photoURL || "");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result?.toString() || "";
      setPhotoPreview(result);
      setPhotoValue(result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const photo = photoValue.trim();

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
      .catch((error) => toast.error(error.message || "Failed to update profile"))
      .finally(() => setSaving(false));
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setPasswordSaving(true);

    updatePassword(currentPassword, newPassword)
      .then(() => {
        toast.success("Password updated successfully");
        form.reset();
      })
      .catch((error) => toast.error(error.message || "Failed to update password"))
      .finally(() => setPasswordSaving(false));
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
            src={photoPreview || "https://i.ibb.co/4pDNDk1/avatar.png"}
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
            Changes will update your BookCourier account profile.
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
                Profile Image
              </label>
              <div className="grid gap-3">
                <label className="input input-bordered flex items-center gap-2">
                  <FiImage className="text-base-content/40" />
                  <input
                    id="profile-photo"
                    type="url"
                    value={photoValue}
                    onChange={(event) => {
                      setPhotoValue(event.target.value);
                      setPhotoPreview(event.target.value);
                    }}
                    placeholder="https://example.com/photo.jpg"
                    required
                    className="grow"
                  />
                </label>
                <label className="btn btn-outline justify-start">
                  <FiUpload />
                  Upload Image
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
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

      <form
        onSubmit={handlePasswordUpdate}
        className="mt-6 rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm"
      >
        <h3 className="flex items-center gap-2 text-2xl font-black">
          <FiLock />
          Update Password
        </h3>
        <p className="mt-1 text-sm text-base-content/60">
          Password must include uppercase, lowercase, and at least 6 characters.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New password"
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            className="input input-bordered w-full"
          />
        </div>

        <button
          disabled={passwordSaving}
          className="btn mt-5 border-none bg-slate-900 text-white hover:bg-slate-800"
        >
          {passwordSaving ? <span className="loading loading-spinner loading-sm" /> : <FiSave />}
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
