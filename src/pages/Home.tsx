import Navbar from "../components/Navbar";
import coinsHomeImg from "../assets/coins-home.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="flex flex-col items-center text-center gap-12 py-32">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl">Track crypto. Stay ahead</h1>
            <p className="text-2xl text-gray-500">
              Stay updated with the latest trends and insights in the
              cryptocurrency market.
            </p>
          </div>
          <img src={coinsHomeImg} alt="Coins" />
          <Link
            to="/"
            className="bg-black text-white px-4 py-2 cursor-pointer hover:opacity-85"
          >
            Get started
          </Link>
        </section>
      </main>
    </>
  );
}

export default Home;
