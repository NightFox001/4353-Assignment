import { HomeHeader } from "../components/HomeHeader";
import { Login } from "../components/Login";
import { Register } from "../components/Register";

const Home = () => {
  return (
    <div className="bg-gray-400 bg-opacity-90 h-screen">
      <HomeHeader />
      <div className="flex m-6 mt-14 space-x-4">
        <div className="flex-1">
          <Login />
        </div>
        <div className="flex-1">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Home;
