import React from "react";
import { NavLink } from "react-router-dom";

const gamingAdda = [
  {
    name: "Tic Tac Toe",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg",
    link: "/tic-tac-toe",
  },
  {
    name: "Sudoku",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Sudoku-by-L2G-20050714.svg",
    link: "/sudoku",
  },
  {
    name: "Memory Match",
    image: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png",
    link: "/memory-match",
  },
  {
    name: "Whack-a-Mole",
    image: "https://cdn-icons-png.flaticon.com/512/3488/3488435.png",
    link: "/whack-a-mole",
  },
  {
    name: "2048",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/2048_logo.svg",
    link: "/2048",
  },
];

function Games() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Gaming Adda 🎮</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {gamingAdda.map((game, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-48 object-contain p-4"
            />
            <div className="p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
              <NavLink
                to={game.link}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Play
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
