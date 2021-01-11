import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const DeleteImageButton = () => {
  

  return (
    <button class='bg-white text-red-500 border-2 border-red-500 font-bold py-2 px-4 rounded hover:bg-red-500 hover:text-white'>
      Delete Selected
    </button>
  );
};

export default DeleteImageButton;