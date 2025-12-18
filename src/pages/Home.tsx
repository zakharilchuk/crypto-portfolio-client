import Navbar from "../components/Navbar";
import coinsHomeImg from "../assets/coins-home.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

function Home() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  if (user) {
    navigate("/dashboard");
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="flex flex-col items-center text-center gap-12 py-32">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl">Track crypto activity.</h1>
            <p className="text-2xl text-gray-500">
              View crypto data and portfolio changes.
            </p>
          </div>
          <img src={coinsHomeImg} alt="Coins" />
          <Link
            to="/signup"
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
