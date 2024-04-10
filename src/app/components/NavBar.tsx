import Link from "next/link"
import logo from '@static/logo.png';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className = "bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h16 items-center justify-between">
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* logo */}
            <div className="flex flex-shrink-0 items-center">
              <Image src={logo} alt="company logo" style={{ width:40, height:'auto'}}/>
            </div>

            {/* Pages */}
            <div className="flex space-x-3">
        <Link href='/' className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
        <Link href="/ImportData" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Import Data</Link>
        <Link href="/Visualizations" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Visualizations</Link>
        </div>
        </div>
        </div>
      </div>
    </nav>
  );
}