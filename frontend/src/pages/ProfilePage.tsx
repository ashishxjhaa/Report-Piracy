import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profile, setProfile] = useState<{ fullName: string; email: string; createdAt: string } | null>(null);

  useEffect(() => {
    axios.get<{ fullName: string; email: string; createdAt: string }>('https://backend-report-piracy.onrender.com/api/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!profile) return <div className="min-h-screen bg-neutral-900 text-white flex justify-center items-center text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-2xl font-medium mb-4 text-center text-red-500">Profile Details</h1>
      <div className="pl-18 space-y-2 border border-zinc-500 p-4 rounded-md bg-white/10 max-w-md mx-auto">
        <div><strong>Name:</strong> {profile.fullName}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>Account Created:</strong> {new Date(profile.createdAt).toLocaleString()}</div>
      </div>

      <Link to={'/dashboard'}>
        <div className="max-w-md mx-auto font-semibold px-7 py-3 mt-10 text-black text-center bg-indigo-400 hover:bg-indigo-300 rounded-md cursor-pointer w-full">
          Back to dashboard
        </div>
      </Link>

    </div>
  );
}

export default ProfilePage;
