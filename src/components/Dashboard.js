import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';
import Loading from './Loading';
import UploadImageButton from './UploadImageButton';
import DeleteImageButton from './DeleteImageButton';
import ViewImageButton from './ViewImageButton';
import ImageTableRow from './ImageTableRow';

export default function Dashboard() {

    const { isLoading } = useAuth0();
    const [checkedImages, setCheckedImages] = useState([]);
    const [numCheckedImages, setNumCheckedImages] = useState(0);

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

    const dummyImage = {
        id: 1,
        filename: 'my-test-img',
        filetype: 'jpg',
        private: false,
        timestamp: '2020-04-23',
        objectId: 'user/my-test-img'
    };

    const images = [1, 2, 3, 4, 5, 6, 7, 8];

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
                        <h3 class="mt-6 text-xl py-2 px-4">My Images</h3>
                        <div class="flex flex-row space-x-2"> 
                            <h4 class="py-2 px-4">{numCheckedImages} Selected</h4>
                            <DeleteImageButton />
                            <UploadImageButton />
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
                                                return <ImageTableRow key={image.id} image={dummyImage} num={image} handleCheckButtonChange={handleCheckButtonChange}/>
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            
        </div>
    )
}