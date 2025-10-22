import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between p-2 mb-4 bg-purple-800 text-white">
      <div className="mx-4">
        <span className="font-bold text-xl">lsTodo</span>
      </div>
      <ul className="flex gap-5 mx-5">
        <li className="hover:cursor-pointer hover:font-bold">Home</li>
        <li className="hover:cursor-pointer hover:font-bold">Todo List</li>
      </ul>
    </nav>
  );
};

export default Navbar;
