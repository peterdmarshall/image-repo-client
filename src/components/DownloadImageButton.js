import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const DownloadImageButton = (props) => {
  
    const { imageId, withText } = props;
    const { getAccessTokenSilently } = useAuth0();

    const downloadImage = async () => {
        const token = await getAccessTokenSilently();
        
        // Send get request to api with s3 object key to get presigned download URL
        axios.get(process.env.REACT_APP_API_URL + '/api/v1/images/' + imageId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            // If successful, send GET request to s3 
            console.log(response);

            var filename = response.data.filename;
            var filetype = response.data.filetype;
            var downloadUrl = response.data.url;

            axios({
                url: downloadUrl,
                method: 'GET',
                responseType: 'blob',
            })
            .then((response) => {
                console.log(response.data);
                var data = new Blob([response.data], {type: `image/${filetype}` });
                var blobURL = window.URL.createObjectURL(data);
                var tempLink = document.createElement('a');
                tempLink.href = blobURL;
                tempLink.setAttribute('download', filename);
                tempLink.click();
            })
            .then((error) => {
                console.log(error);
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <button class='text-indigo-600 color-indigo-600 border-2 border-white hover:text-indigo-900 font-bold py-1 px-1 rounded items-center focus:outline-none hover:border-indigo-800' onClick={downloadImage}>
            <div class="flex flex-row items-center">
            <svg class="w-5 h-5 fill-current text-indigo-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
            { withText && 
                <p class="ml-2">
                    Download
                </p>
            }
            </div>
        </button>
    );
};

export default DownloadImageButton;