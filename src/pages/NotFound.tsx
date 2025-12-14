import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="font-sans-serif flex flex-col items-center pt-32 space-y-10">
      <Link to="/dashboard" className="text-2xl">
        CoinView
      </Link>
      <h2 className="text-9xl font-medium">404</h2>
      <p className="text-4xl">Oops!</p>
      <p>The page you’re looking for could not be found.</p>
      <Link to="/dashboard">
        <button className="bg-[#212529] text-[#F8F9FA] py-2.5 px-5">
          Go back home
        </button>
      </Link>
    </div>
  );
}
