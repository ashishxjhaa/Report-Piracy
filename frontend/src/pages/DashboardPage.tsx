import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

axios.get("http://localhost:3001/api/dashboard", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})


function DashboardPage() {
  const [fullName, setFullName] = useState('');
  const [reports, setReports] = useState<{ _id: string }[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

 

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

  const fetchReports = () => {
    axios.get<{ reports: { _id: string }[] }>('http://localhost:3001/api/report', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => setReports(res.data.reports))
    .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReports();
  }, [location]);


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
          <div onClick={handleLogout} className="text-slate-200 flex justify-center items-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
            <span className="ml-2">Logout</span>
          </div>
        </div>


        <div className="w-full flex flex-col justify-center md:items-center items-center space-y-4 max-md:space-y-7 max-md:py-14 pt-10 pb-20">
          <div className="flex gap-7 max-md:flex-col max-md:gap-5 flex-wrap justify-center">
            <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
              <div className="flex p-8 w-fit max-md:p-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
                <h3 className="pl-4 text-slate-300">Total Reported Content</h3>
              </div>
              <div className="text-lg max-w-80 text-slate-50 mb-4 text-center">
                {reports.length}
              </div>
              <Link to={'/view-content'}>
                <div className="mt-2 mb-2 text-black text-center bg-indigo-400 hover:bg-indigo-300 rounded-md py-2 cursor-pointer w-full">
                  View Content
                </div>
              </Link>
            </div>
          </div>

          <Link to={'/dashboard-form'}>
            <div className="font-bold mt-3 md:mt-7 mb-2 text-black text-center bg-red-500 hover:bg-red-400 rounded-md py-4 px-16 cursor-pointer w-full">
              Report Pirated Content
            </div>
          </Link>

        </div>

        
      </div>
    </div>
  )
}

export default DashboardPage