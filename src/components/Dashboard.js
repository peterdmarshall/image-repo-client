import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import Loading from './Loading';
import UploadImageButton from './UploadImageButton';
import DeleteImageButton from './DeleteImageButton';
import ImageTableRow from './ImageTableRow';
import axios from 'axios';
import Pagination from './Pagination';

export default function Dashboard() {

    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    
    const [uploadProgress, setUploadProgress] = useState(0);

    // State for images list and pagination
    const [images, setImages] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [imageCount, setImageCount] = useState(null);

    const [checkedImages, setCheckedImages] = useState([]);
    const [numCheckedImages, setNumCheckedImages] = useState(0);

    const [updateFlag, setUpdateFlag] = useState(false);

    const [filesToUpload, setFilesToUpload] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();

            // Request images from server
            axios.get(process.env.REACT_APP_API_URL + '/api/v1/images', {
                params: {
                    limit: limit,
                    offset: offset
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response);
                setImages(response.data.images);
                setImageCount(response.data.image_count);
            })
            .catch((error) => {
                console.log(error);
            })
        })();
      }, [updateFlag, uploadedFiles, user, limit, offset]);


    const handleCheckButtonChange = (objectId) => {
        let index = checkedImages.indexOf(objectId);
        if (index > -1) {
            let newCheckedImages = checkedImages;
            newCheckedImages.splice(index, 1);
            console.log(newCheckedImages);
            setCheckedImages(newCheckedImages);
            setNumCheckedImages(checkedImages.length);
        } else {
            let newCheckedImages = checkedImages;
            newCheckedImages.push(objectId);
            console.log(newCheckedImages);
            setCheckedImages(newCheckedImages);
            setNumCheckedImages(checkedImages.length);
        }
    }

    // Returns true if button is checked
    const isChecked = (checkedImageId) => {
        if(checkedImages.includes(checkedImageId)) {
            return true;
        }
        return false;
    }


    // Takes an array of images and uploads them one at a time
    // Step 1: GET request to api to retrieve signed URL
    // Step 2: PUT request to signed URL to upload image to s3
    // Step 3: POST request to api to confirm upload and create
    //         image record
    const uploadImages = async (files) => {
        setFilesToUpload(files.length);
        setUploadedFiles(false);
        const token = await getAccessTokenSilently();
        
        await Promise.all(files.map( async (file) => {

            // GET signed URL
            // Strip the file extension from filename
            var filename = file.name;
            var filetype = file.type;

            try {
                // Request presigned url from API
                var signedUrlResponse = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/presigned-url', {
                    params: {
                        filename: filename
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const object_key = signedUrlResponse.data.object_key;
                const url = signedUrlResponse.data.presigned_url;

                // Upload image to s3
                const uploadResponse = await axios({
                    method: 'PUT',
                    url: url,
                    data: file,
                });

                console.log(uploadResponse);
                // Format image record data for API
                const data = {
                    image: {
                        object_key: object_key,
                        filename: filename,
                        filetype: filetype.split("/")[1],
                        private: true
                    }
                }

                if(uploadResponse) {
                    // Post image record to API
                    await axios.post(process.env.REACT_APP_API_URL + '/api/v1/images', data, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }
            } catch(error) {
                console.log(error);
            }
        }));

        setFilesToUpload(0);
        setUploadedFiles(true);
    }

    return (
        <div class="flex h-screen overflow-y-hidden bg-white">
            <div class="flex flex-col flex-1 h-full overflow-hidden">
                <header class="flex-shrink-0 border-b">
                    <div class="flex items-center justify-between p-2">
                        <div class="flex items-center space-x-3">
                            <span class="p-2 text-xl font-semibold tracking-wider uppercase">Image Repo</span>
                        </div>
                        <LogoutButton></LogoutButton>
                    </div>
                </header>
                <main class="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll">
                    <div
                        class="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row"
                    >
                        <h1 class="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
                    </div>

                    <div class="flex items-center flex-row justify-between p-2">
                        <h3 class="text-xl py-2 px-4">My Images</h3>
                        <div class="flex flex-row space-x-2">
                            <h4 class="py-2 px-4">{numCheckedImages} Selected</h4>
                            <DeleteImageButton selectedImageIds={checkedImages} setSelectedImageIds={setCheckedImages} setNumCheckedImages={setNumCheckedImages} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag}/>
                            <UploadImageButton uploadImages={uploadImages} filesToUpload={filesToUpload}/>
                        </div>
                    </div>
                    
                    <div class="flex flex-col mt-6">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                                    <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                        <tr>
                                            <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                            File Name
                                            </th>
                                            <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                            File Type
                                            </th>
                                            <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                            Status
                                            </th>
                                            <th
                                            scope="col"
                                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                            >
                                            Timestamp
                                            </th>
                                            <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">
                                                View
                                            </span>
                                            </th>
                                            
                                        </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            { images && images.map(image => {
                                                return <ImageTableRow key={image.id} image={image} isChecked={isChecked(image.id)} handleCheckButtonChange={handleCheckButtonChange}/>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination offset={offset} setOffset={setOffset} limit={limit} imageCount={imageCount}/>
                </main>
            </div>
            
        </div>
    )
}