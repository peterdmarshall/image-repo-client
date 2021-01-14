import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import DownloadImageButton from './DownloadImageButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ImageTableRow = (props) => {

    const { image, handleCheckButtonChange, isChecked } = props;
    const { getAccessTokenSilently } = useAuth0();

    const [showPreview, setShowPreview] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const getImagePreview = async () => {
        const token = await getAccessTokenSilently();
        
        // Send get request to api with s3 object key to get image URL
        axios.get(process.env.REACT_APP_API_URL + '/api/v1/images/' + image.id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            // If successful, return image url
            console.log(response);

            setImagePreviewUrl(response.data.url);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.id === "close") {
            setShowPreview(false);
            setImagePreviewUrl(null);
        } else if (e.target.id === "copy-link") {
            console.log("Copy");
        } else {
            setShowPreview(true);
            getImagePreview();
        }
    }

    const copyUrlToClipboard = () => {
        // Create temporary textarea to use for clipboard copying
        const el = document.createElement('textarea');
        el.value = imagePreviewUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const formattedDate = (datetime) => {
        var months = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];

        var date = new Date(datetime);
        let month = date.getMonth();
        let formattedMonth = months[month];
        let day = date.getDate();
        let formattedDay = ("0" + day).slice(-2);
        let year = date.getFullYear();

        return `${formattedMonth} ${formattedDay}, ${year}`
    }

    return (
        <tr onClick={handleClick} class="transition-all hover:bg-gray-200 hover:shadow-lg cursor-pointer">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex flex-col items-center">
                        <input type="checkbox" checked={isChecked} onChange={() => handleCheckButtonChange(image.id)}></input>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-700">{image.filename}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500 uppercase">{image.filetype}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                { image.private ? (
                    <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full capitalize"
                    >
                    Private
                    </span>
                ) :
                (
                    <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full capitalize"
                    >
                    Public
                    </span>
                )
                }
                
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{image.created_at}</td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                <DownloadImageButton imageId={image.id} />
            </td>
            { showPreview &&
                <div>
                    <div class="justify-center items-center flex overflow-x-hidden h-3/4 overflow-y-auto fixed inset-x-0 top-20 z-50 bg-gray-200 bg-opacity-60">
                        <main class="container mx-auto max-w-screen-lg h-full border-2 border-gray-500 rounded-lg">
                        <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md">
                            <header class="pt-12 px-8 flex flex-row justify-between items-center">
                                <h2 class="text-2xl font-semibold whitespace-nowrap">
                                   {image.filename} 
                                </h2>
                                <h2 class="text-l font-semibold whitespace-nowrap">
                                    {formattedDate(image.created_at)}
                                </h2>
                            </header>
                            <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                            <ul class="flex flex-1 justify-center">
                                <img src={imagePreviewUrl} alt={image.filename} class="object-contain md:object-scale-down"></img>
                            </ul>
                            </section>
                
                            <footer class="flex justify-end px-8 pb-8 pt-4">
                                { image.public &&
                                <CopyToClipboard text={imagePreviewUrl}>
                                    <button id="copy-link" onClick={handleClick} class='text-indigo-600 color-indigo-600 border-2 border-white hover:text-indigo-900 font-bold py-2 px-4 mr-2 rounded items-center focus:outline-none hover:border-indigo-800'>
                                        <div class="flex flex-row items-center">
                                        <svg class="mr-2 stroke-current text-indigo-700" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 24 24" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg>
                                        <p>
                                            Share
                                        </p>
                                        </div>
                                    </button>
                                </CopyToClipboard>
                                }
                                <DownloadImageButton imageId={image.id} withText={true}/>
                                <button id="close" onClick={handleClick} class="ml-2 rounded-md px-4 py-2 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                    Close
                                </button>
                            </footer>
                        </article>
                        </main>
                    </div>
                </div>
            }
        </tr>
    );
};

export default ImageTableRow;