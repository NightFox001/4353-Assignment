import { useRouter } from "next/router";

export const HomeHeader = () => {
  const router = useRouter();

  const goToHome = () => {
    // router.push('/')
  };
  const handlePlanning = () => {
    // router.push('/')
  };
  const goToDiagrams = () => {
    // router.push('/')
  };
  const goToAbout = () => {
    // router.push('/')
  };
  const goToReadMe = () => {
    // router.push('/')
  };

  return (
    <>
      <div className="text-white bg-gray-900 bg-opacity-80 w-full overflow-auto">
        <div className="text-7xl p-6">Fuel Source</div>
        <div className="flex bg-opacity-70 text-1xl bg-gray-500 overflow-auto">
          <button
            className="flex-1 hover:bg-gray-700 p-3 text-xl block w-full"
            onClick={goToHome}
          >
            Home
          </button>
          <button
            className="flex-1 hover:bg-gray-700 p-3 text-xl block w-full"
            onClick={goToAbout}
          >
            About
          </button>
          <button
            className="flex-1 hover:bg-gray-700 p-3 text-xl block w-full"
            onClick={handlePlanning}
          >
            Planning
          </button>
          <button
            className="flex-1 hover:bg-gray-700 p-3 text-xl block w-full"
            onClick={goToDiagrams}
          >
            Diagrams
          </button>
          <button
            className="flex-1 hover:bg-gray-700 p-3 text-xl block w-full"
            onClick={goToReadMe}
          >
            ReadMe
          </button>
        </div>
      </div>
    </>
  );
};
