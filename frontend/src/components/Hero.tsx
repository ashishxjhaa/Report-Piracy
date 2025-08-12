import { Link } from "react-router-dom"


function Hero() {

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-48 overflow-x-hidden px-16 max-md:pt-20 max-md:px-7">
        <div className="flex flex-col gap-28 items-center justify-center w-full max-md:pt-14">
            <div className="flex flex-col justify-center items-center">
                <div className="text-slate-50 px-3 py-1.5 rounded-full ring-1 ring-red-500/50 bg-red-500/10  flex justify-center items-center hover:bg-red-500/20 transition-all gap-1 mb-7 text-sm max-md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield text-red-600"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>
                    Quick Report
                </div>
                <h2 className="text-slate-50 text-8xl font-medium tracking-tighter max-md:text-[2.9rem] text-center">
                    Report Pirated Content<span className="block mt-5 mb-5 max-md:mt-2 bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent pb-2">Support Original Creator</span>
                </h2>
                <p className="font-normal text-gray-500 max-w-[700px] max-md:text-[0.7rem] text-center mt-1">
                    ReportPiracy connects users with creators to flag pirated content securely.
                </p>
           

                <div className="flex gap-5 mt-7 max-md:mt-5 max-md:gap-3">
                    <Link to={"/signup"}>
                        <button className="font-semibold text-slate-50 group bg-gray-600 hover:bg-gray-700 py-3 px-5 rounded-lg text-base max-md:py-2 max-md:px-3 max-md:text-[0.7rem] cursor-pointer">
                            Signup
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right group-hover:translate-x-1 transition-transform inline ml-2"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                        </button>
                    </Link>
                    <Link to={"/signin"}>
                        <button className="font-semibold text-slate-50 py-3 px-5 hover:bg-white/5 ring-2 ring-gray-600 rounded-lg text-base max-md:py-2 max-md:px-3 max-md:text-[0.7rem] cursor-pointer">
                            Signin
                        </button>
                    </Link>
                </div>

                <div className="w-full pt-32 pb-20 flex flex-col justify-center items-center space-y-14 max-md:space-y-7 max-md:py-14">
                    <h2 className="text-6xl max-md:text-4xl font-medium bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <div className="flex gap-7 max-md:flex-col max-md:gap-5 flex-wrap justify-center">

                        <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
                            <div className="p-3 rounded-lg bg-gray-400/10 w-fit max-md:p-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5"></path></svg>
                            </div>
                            <h3>Anonymous Reporting</h3>
                            <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                                Report pirated content without sharing your personal details. We keep your identity private while passing reports to creators.
                            </p>
                        </div>

                        <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
                            <div className="p-3 rounded-lg bg-gray-400/10 w-fit max-md:p-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zM4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1zm13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4z"></path></svg>
                            </div>
                            <h3>Easy Reporting</h3>
                            <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                                Submit a piracy report in seconds with a simple form. Just add the link, describe the issue, and select a creator.
                            </p>
                        </div>

                        <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
                            <div className="p-3 rounded-lg bg-gray-400/10 w-fit max-md:p-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><circle cx="10" cy="9" r="4"></circle><path d="M16.39 15.56C14.71 14.7 12.53 14 10 14s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 2 18.22V21h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM20.05 2.41 18.64 1c-3.51 3.51-3.51 9.21 0 12.73l1.41-1.41c-2.73-2.74-2.73-7.18 0-9.91z"></path><path d="m22.88 5.24-1.41-1.41a5.003 5.003 0 0 0 0 7.07l1.41-1.41a3.012 3.012 0 0 1 0-4.25z"></path></svg>
                            </div>
                            <h3>Creator Support</h3>
                            <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                                Help creators protect their work. Your reports ensure pirated content is flagged and dealt with quickly.
                            </p>
                        </div>

                        <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
                            <div className="p-3 rounded-lg bg-gray-400/10 w-fit max-md:p-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"></path></svg>
                            </div>
                            <h3>Secure Platform</h3>
                            <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                                Your data is safe with us. We use strong security to protect your reports and keep everything confidential.
                            </p>
                        </div>

                        <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
                            <div className="p-3 rounded-lg bg-gray-400/10 w-fit max-md:p-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path></svg>
                            </div>
                            <h3>Creator Alerts</h3>
                            <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                                Creators get instant email alerts about reported piracy, so they can take action right away.
                            </p>
                        </div>

                        <div className="text-slate-50 p-6 bg-gray-500/20 border border-gray-100/10 flex flex-col rounded-xl gap-2 text-lg font-medium max-md:p-4 max-md:gap-2 max-md:text-base">
                            <div className="p-3 rounded-lg bg-gray-400/10 w-fit max-md:p-2">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></svg>
                            </div>
                            <h3>Quick Report</h3>
                            <p className="text-sm max-w-80 text-gray-500 max-md:text-[0.8rem] leading-snug">
                                Spot piracy? Report it fast with our straightforward process, no complicated steps needed.
                            </p>
                        </div>
            
                    </div>
                </div>

                <h3 className="text-3xl max-md:text-2xl font-bold tracking-wider bg-gradient-to-b from-red-400 to-red-600 bg-clip-text text-transparent">
                    READY TO REPORT 
                </h3>

                <div className="flex gap-5 mt-7 mb-10 max-md:mt-5 max-md:gap-3">
                    <Link to={"/signup"}>
                        <button className="text-slate-50 group bg-gray-600 hover:bg-gray-700 py-3 px-5 rounded-lg text-base max-md:py-2 max-md:px-3 max-md:text-[0.7rem] cursor-pointer">
                            Report Now
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right group-hover:translate-x-1 transition-transform inline ml-2"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                        </button>
                    </Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Hero

