import React, { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const MoreOptionsButton = (props) => {
  
    const { imageId, isPrivate } = props;
    const [menuOpen, setMenuOpen] = useState(false);
    const container = useRef(null);


    const { getAccessTokenSilently } = useAuth0();

    const updateStatus = async () => {
        const token = await getAccessTokenSilently();
        
    }

    const openMenu = (e) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    }

    return (
        <div ref={container} className="relative">
            <button id="more-options" onClick={openMenu} class='text-indigo-600 color-indigo-600 border-2 border-white hover:text-indigo-900 font-bold py-1 px-1 rounded items-center focus:outline-none hover:border-indigo-800'>
                <div class="flex flex-row items-center">
                <svg class="w-5 h-5 fill-current text-indigo-700" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
                </div>
            </button>
            { menuOpen && 
            <div className="origin-top-right absolute bg-gray-200 right-0 py-2 mt-1 bg-white rounded shadow-md z-50 border-2 border-indigo-600 flex flex-col">
                <button class="text-indigo-600">
                    <a className="block px-4 py-2 hover:bg-green-100 hover:text-green-600">
                    {`Set ${isPrivate ? 'Public' : 'Private'}`}
                    </a>
                </button>
                <button class="text-indigo-600">
                    <a className="block px-4 py-2 hover:bg-red-100 hover:text-red-600">
                    Delete
                    </a>
                </button>
            </div>
            }
        </div>
    );
};

export default MoreOptionsButton;