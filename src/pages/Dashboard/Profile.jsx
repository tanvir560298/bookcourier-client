import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    updateUserProfile(name, photo)
      .then(() => {
        toast.success("Profile updated successfully");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-base-200 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <img
            src={user?.photoURL || "https://i.ibb.co.com/4pDNDk1/avatar.png"}
            alt="user"
            className="w-32 h-32 rounded-full object-cover border-4 border-amber-500"
          />

          <h2 className="text-4xl font-extrabold mt-5">
            {user?.displayName || "No Name"}
          </h2>

          <p className="text-gray-500 mt-2">{user?.email}</p>
        </div>

        <div className="divider my-8">Update Profile</div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || ""}
              placeholder="Enter your name"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              defaultValue={user?.photoURL || ""}
              placeholder="Enter photo URL"
              required
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn bg-amber-600 text-white border-none w-full">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;