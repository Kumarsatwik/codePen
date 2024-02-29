import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`w-full h-screen flex flex-col justify-center items-center text-white gap-4 ${
        isVisible ? "animate-fade-in" : ""
      }`}
    >
      <h1 className="text-6xl font-bold text-center">Welcome to CodePen</h1>
      <p className="text-lg text-center max-w-md mb-8">
        A platform to compile HTML, CSS, and JavaScript code on the go and share
        it with your friends.
      </p>
      <Link to="/compiler" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
