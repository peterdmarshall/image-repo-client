import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const DeleteManyImageButton = (props) => {
  
  const { getAccessTokenSilently } = useAuth0();
  const { selectedImageIds, setSelectedImageIds, setNumCheckedImages, updateFlag, setUpdateFlag } = props;
  const [deleting, setDeleting] = useState(false);

  const deleteSelected = async () => {
    console.log(selectedImageIds);
    const token = await getAccessTokenSilently();

    var data = {
      image_ids: selectedImageIds
    }

    axios.post(process.env.REACT_APP_API_URL + '/api/v1/batch/delete-images', data, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      // Successfully deleted all images by id
      console.log(response);
      setUpdateFlag(!updateFlag);
      setDeleting(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleDelete = async () => {
    setDeleting(true);
    await deleteSelected();
    setSelectedImageIds([]);
    setNumCheckedImages(0);
  }

  return (
    <div>
      { !deleting &&
      <button onClick={handleDelete} class='bg-white text-red-500 border-2 border-red-500 font-bold py-2 px-4 rounded hover:bg-red-500 hover:text-white focus:outline-none'>
        Delete Selected
      </button>
      }
      { deleting &&
      <button 
      class='bg-red-500 text-white border-2 border-red-500 font-bold py-2 px-4 rounded focus:outline-none cursor-not-allowed'
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

export default DeleteManyImageButton;