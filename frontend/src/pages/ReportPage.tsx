import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.get("https://backend-report-piracy.onrender.com/api/dashboard-form", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
})


function ReportPage() {

    const [dropdownOptions, setDropdownOptions] = useState<{ name: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [fullName, setFullName] = useState('');
    const [contentUrl, setContentUrl] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedOption || !contentUrl || !description) {
          toast.error("All fields are required");
          return;
        }

        if (!/^(https?:\/\/(t\.me|chat\.whatsapp\.com)\/[^\s]+)$/.test(contentUrl)) {
          toast.error("Please enter a valid link");
          return;
        }

        if (description.length < 10) {
          toast.error("Description must be at least 10 characters");
          return;
        }

        try {
            await axios.post("https://backend-report-piracy.onrender.com/api/report",
                {
                  creatorName: selectedOption,
                  contentUrl,
                  description,
                },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
        }
      );
      toast.success("Reported Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to report content");
    }
  };

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/");
      toast.success("Logged out");
    };


    useEffect(() => {
        axios.get('https://backend-report-piracy.onrender.com/api/me', {
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
    axios.get("https://backend-report-piracy.onrender.com/api/creators")
    .then(res => setDropdownOptions(res.data as { name: string }[]))
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
        </div>


      <div className="flex flex-col items-center justify-center p-6 sm:p-12 pt-28">
        <div className="w-full max-w-md space-y-6">
          
          <div className="mb-8 text-center mt-20">
            <div className="flex flex-col items-center gap-2 group">
                <div className="flex items-center justify-center transition-colors rounded-xl bg-white/10 px-2 py-2 mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-warning-icon lucide-message-square-warning text-red-500"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 15h.01"/><path d="M12 7v4"/></svg>
                </div>
                <h1 className="mt-2 text-2xl font-bold text-red-500">Report Pirated Content</h1>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block">
                <span className="text-slate-200 font-medium">Select Option</span>
              </label>
              <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="text-slate-50 bg-transparent w-full pl-7 py-3 rounded-md border border-zinc-500 mt-2 focus:outline-none focus:ring-0">
                <option value="" disabled>Name of Creator</option>
                {dropdownOptions.map((opt: { name: string }) => (
                  <option key={opt.name} value={opt.name}>{opt.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block">
                <span className="text-slate-200 font-medium">Link</span>
              </label>
              <div className="border border-zinc-500 mt-2 py-3 rounded-md relative">
                <div className="text-slate-50 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link-icon lucide-link size-5 text-base-content/40"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </div>
                <input type="text" value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} className="text-slate-50 bg-transparent w-full pl-10 focus:outline-none focus:ring-0" placeholder="Where you shown"/>
              </div>
            </div>

            <div>
              <label className="block">
                <span className="text-slate-200 font-medium">Description</span>
              </label>
              <div className="flex border border-zinc-500 mt-2 py-3 rounded-md relative">
                <div className="text-slate-50 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text-icon lucide-message-square-text size-5 text-base-content/40"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>
                </div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="text-slate-50 bg-transparent w-full h-15 pl-10 flex items-center justify-center text-center focus:outline-none focus:ring-0" placeholder="Details about content"/>
              </div>
            </div>

            <button type="submit" className="bg-indigo-400 hover:bg-indigo-300 rounded-md py-3 cursor-pointer text-black w-full">Report</button>

            </form>
        </div>
        <div className="text-center mt-5">
            <p className="text-slate-300">
              Back to dashboard? 
              <Link className="text-indigo-400 hover:text-indigo-500 underline underline-offset-1 px-2" to={"/dashboard"} data-discover="true">
                Click here
              </Link>
            </p>
          </div>
    </div>
</div>
)}

export default ReportPage