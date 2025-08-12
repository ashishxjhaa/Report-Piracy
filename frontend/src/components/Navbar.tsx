import { Link } from "react-router-dom"


function Navbar({ showSpecialButton = true }) {

  return (
      <nav className="fixed top-0 w-full h-20 border-b border-white/10 backdrop-blur-xl p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/' className="text-stone-50 text-xl font-extrabold cursor-pointer">
            Report<span className="text-red-500">Piracy</span>
          </Link>
          <Link to='/signup'>
          {showSpecialButton && (
            <button className="font-bold text-white bg-gray-600 hover:bg-gray-700 py-3 px-5 rounded-md text-base max-md:py-2 max-md:px-3 max-md:text-[0.7rem] cursor-pointer">
                Report Now
            </button>
          )}
          </Link>
        </div>
      </nav>
  )
}

export default Navbar