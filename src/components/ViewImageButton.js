import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ViewImageButton = (props) => {
  
    const { objectId } = props;

    const viewImage = () => {
        console.log("Load image with s3 id: " + objectId);
    }

    return (
        <button class='text-indigo-600 hover:text-indigo-900 font-bold py-2 px-4 rounded' onClick={viewImage}>
        View
        </button>
    );
};

export default ViewImageButton;