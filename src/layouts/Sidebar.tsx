import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-50 border-l border-gray-300 p-10 flex flex-col justify-between text-lg">
      <ul className="space-y-5">
        <li>
          <Link to="/dashboard" className="text-2xl">
            CoinView
          </Link>
        </li>
        <li className="hover:text-gray-600 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="hover:text-gray-600 cursor-pointer">
          <Link to="/portfolios">Portfolios</Link>
        </li>
        <li className="hover:text-gray-600 cursor-pointer">Watchlist</li>
        <li className="hover:text-gray-600 cursor-pointer">Alerts</li>
        <li className="hover:text-gray-600 cursor-pointer">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <ul>
        <li className="hover:text-red-600 cursor-pointer mt-10">Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
