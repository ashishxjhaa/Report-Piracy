import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

axios.get("http://localhost:3001/api/report", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})

type Report = {
  _id: string;
  creatorName: string;
  contentUrl: string;
  description: string;
  createdAt: string;
};



function ContentPage() {
    const [fullName, setFullName] = useState('');
    const [reports, setReports] = useState<Report[]>([]);
    
    const navigate = useNavigate();

    
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

    useEffect(() => {
        axios.get<{ reports: Report[] }>("http://localhost:3001/api/report", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => setReports(res.data.reports))
        .catch(err => console.error(err));
    }, []);


  return (
    <div className="min-h-screen bg-neutral-900">
        <div className="fixed top-0 w-full h-25 border-b border-white/10 backdrop-blur-xl p-3 z-50">
            <div className="text-lime-500 rounded-xl bg-white/20 px-5 py-4 container mx-auto flex justify-between items-center relative">
                <Link to={'/me'}>
                    <div className="rounded-xl bg-white/30 px-2 py-2 hover:bg-white/20 text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                </Link>
                <div className="text-stone-50 text-xl font-medium pr-8 pr-8 md:absolute md:left-1/2 md:-translate-x-1/2 md:text-center">
                    See Your Content 
                    <span className="font-normal pl-2 text-green-300">
                        {fullName}
                    </span>
                </div>
                <div onClick={handleLogout} className="text-slate-200 flex justify-center items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                    <span className="ml-2">Logout</span>
                </div>
            </div>
        </div>


      <div className="flex flex-col items-center justify-center p-6 sm:p-12 pt-28">
        <div className="w-full max-w-md space-y-6">
          
          <div className="mb-8 text-center mt-20">
            <div className="flex flex-col items-center gap-2 group">
                <h1 className="mt-2 text-2xl font-bold text-red-500">Reported Content</h1>
            </div>
          </div>

            <div className="space-y-4">
                {reports.length === 0 ? (
                    <p className="text-slate-300 text-center">No content found.</p>
                    ) : (
                    reports.map((report) => (
                        <div key={report._id} className="border border-zinc-500 p-4 rounded-md bg-white/10 text-slate-200">
                            <p><span className="font-semibold">Creator:</span> {report.creatorName}</p>
                            <p><span className="font-semibold">URL:</span> {report.contentUrl}</p>
                            <p><span className="font-semibold">Description:</span> {report.description}</p>
                            <p className="text-sm text-slate-400">Reported on: {new Date(report.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>

        <Link to={'/dashboard'}>
            <div className="font-semibold px-7 py-3 mt-10 text-black text-center bg-indigo-400 hover:bg-indigo-300 rounded-md cursor-pointer w-full">
              Back to dashboard
            </div>
          </Link>
    </div>
</div>
)}

export default ContentPage