import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ViewImageButton from './ViewImageButton';

const ImageTableRow = (props) => {

    const { image, handleCheckButtonChange } = props;
  

    return (
        <tr class="transition-all hover:bg-gray-200 hover:shadow-lg">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex flex-col items-center">
                        <input type="checkbox" onChange={() => handleCheckButtonChange(image.object_key)}></input>
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
                <ViewImageButton objectKey={image.object_key}/>
            </td>
            <td>
                <button>
                    
                </button>
            </td>
        </tr>
    );
};

export default ImageTableRow;