import React from 'react';
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Hexagon size={24} />
          <span className="text-xl font-bold">Lục Hào Bói Toán</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-indigo-200">Trang chủ</Link></li>
            <li><Link to="/database" className="hover:text-indigo-200">Quản lý dữ liệu</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;