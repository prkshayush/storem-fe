import { FaHome } from "react-icons/fa";

function Navbar({title}) {
  return (
    <div className='flex justify-between items-center px-4 py-3 bg-gray-100 shadow'>
    <div className='text-lg font-semibold uppercase'>{title}</div>
    <div><a className='text-xl' href="/"><FaHome /></a></div>
    </div>
  )
}

export default Navbar