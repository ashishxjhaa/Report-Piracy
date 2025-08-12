import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

axios.get("http://localhost:3001/api/dashboard", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})


function DashboardPage() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFullName((res.data as unknown as any).fullName)
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-900">
      <div className="fixed top-0 w-full h-25 border-b border-white/10 backdrop-blur-xl p-3 z-50">
        <div className="text-lime-500 rounded-xl bg-white/20 px-5 py-4 container mx-auto flex justify-between items-center relative">
        <Link to={'/me'}>
          <div className="rounded-xl bg-white/30 px-2 py-2 hover:bg-white/20 text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </Link>
          <div className="text-stone-50 text-xl font-medium pr-8 pr-8 md:absolute md:left-1/2 md:-translate-x-1/2 md:text-center">
            Welcome 
            <span className="font-normal pl-2 text-green-300">
              {fullName}
            </span>
          </div>
        </div>
        <div className="text-slate-50 mt-8">
        Hi
      </div>
      </div>
    </div>
  )
}

export default DashboardPage