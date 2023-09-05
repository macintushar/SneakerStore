import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLoginBtn from './buttons/loginBtn';
import AdminLogoutBtn from './buttons/logoutBtn';

function AdminNavbar( {login} ) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  let button;

  if (login === false) {
      button = <AdminLoginBtn />
  } else {
      button = <AdminLogoutBtn />
  }

  return (
    <nav className="bg-green-100 py-4 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex-1 flex justify-between items-center">
                <Link to="/admin">
                    <img style={{"width":"45%", "paddingTop":"10px"}} src="https://res.cloudinary.com/dhzdzjgtd/image/upload/v1677169600/SneakerStreet/logos/Sneaker-Street-Logo-Long-transparent.png" alt="Sneaker Street" />
                </Link>
            </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/admin/manage/products/" className="text-black hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">Manage Products</Link>
              <Link to="/admin/manage/orders/" className="text-black hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">Manage Orders</Link>
              <Link to="/admin/manage/inventory/" className="text-black hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">Manage Inventory</Link>
              <Link to="/admin/manage/sellers/" className="text-black hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">Manage Sellers</Link>
              {button}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button type="button" className="bg-green-100 inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black" aria-controls="mobile-menu" aria-expanded={isOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              {/* Heroicon name: menu */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Heroicon name: x */}
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      </nav>
  );
}

export default AdminNavbar;