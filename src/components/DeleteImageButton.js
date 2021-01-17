import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const DeleteImageButton = (props) => {
  
  const { getAccessTokenSilently } = useAuth0();
  const { imageId, updateFlag, setUpdateFlag } = props;
  const [deleting, setDeleting] = useState(false);

  const deleteSelected = async () => {
    const token = await getAccessTokenSilently();

     axios.delete(process.env.REACT_APP_API_URL + '/api/v1/images/' + imageId, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then((results) => {
        // Successfully deleted all images byt id
        setUpdateFlag(!updateFlag);
        setDeleting(false);
      })
      .then((error) => {
        console.log(error);
      });
  }

  const handleDelete = async () => {
    setDeleting(true);
    await deleteSelected();
  }

  return (
    <div>
      { !deleting &&
      <button onClick={handleDelete} class='bg-white text-red-500 border-2 border-white hover:border-red-500 font-bold py-2 px-4 mx-2 rounded focus:outline-none'>
        Delete
      </button>
      }
      { deleting &&
      <button 
      class='bg-red-500 text-white border-2 border-red-500 font-bold py-2 px-4 mx-2 rounded focus:outline-none cursor-not-allowed'
      >
        <span class="mr-2">
          <FontAwesomeIcon icon={faCircleNotch} size='1x' spin/>
        </span>
        Deleting
      </button>
      }
    </div>
  );
};

export default DeleteImageButton;