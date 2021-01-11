import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUploadPreview from './ImageUploadPreview';
import axios from 'axios';


const UploadImageButton = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const hiddenInput = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const token = getAccessTokenSilently();
    if(token) {
      setAccessToken(token);
    }
  }, [user]);

  const uploadImages = () => {
    setShowModal(false);
  }

  const getSignedUrl = (file, callback) => {

    const params = {
      objectName: file.name,
      contentType: file.type
    };

    axios.get(process.env.REACT_APP_API_URL + '/images/presigned-url', { params })
      .then(data => {
        callback(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const hasFiles = ({ dataTransfer: { types = [] } }) => {
    return types.indexOf("Files") > -1
  }

  const dropHandler = (e) => {
    e.preventDefault();
    let newFiles = [];
    for(var i = 0; i < e.dataTransfer.files.length; i++) {
      newFiles.push(e.dataTransfer.files[i]);
    }
    
    setFiles([...files, ...newFiles]);
    console.log(files);
  }

  const dragOverHandler = (e) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  }

  const dragLeaveHandler = (event) => {

  }

  const dragEnterHandler = (event) => {

  }

  const handleChooseFileClick = (event) => {
    hiddenInput.current.click();
  }

  const handleFileChange = (e) => {
    let newFiles = [];
    for(var i = 0; i < e.target.files.length; i++) {
      newFiles.push(e.target.files[i]);
    }
    setFiles([...files, ...newFiles]);
  }

  const deleteFile = (fileName) => {
    setFiles(files.filter((file, index, arr) => {
      return file.name !== fileName;
    }))
  }

  return (
    <div>
      <button 
        class='bg-green-400 text-white border-2 border-green-400 font-bold py-2 px-4 rounded hover:bg-green-500 hover:border-green-900 hover:text-green-900'
        onClick={() => setShowModal(true)}
      >
        Upload
      </button>
      { showModal &&
        <div>
          <div class="justify-center items-center flex overflow-x-hidden h-3/4 overflow-y-auto fixed inset-x-0 top-20 z-50 bg-gray-200 bg-opacity-60">
            <main class="container mx-auto max-w-screen-lg h-full border-2 border-gray-500 rounded-lg">
              <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onDragEnter={dragEnterHandler}>
      
                <section class="h-full overflow-auto p-8 w-full h-full flex flex-col">
                  <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                    <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                      <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                    </p>
                    <input ref={hiddenInput} onChange={handleFileChange} type="file" multiple class="hidden" />
                    <button onClick={handleChooseFileClick} class="mt-2 rounded-md px-4 py-2 bg-green-200 hover:bg-green-300 focus:shadow-outline focus:outline-none">
                      Select a file
                    </button>
                  </header>
      
                  <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                    To Upload
                  </h1>
      
                  <ul class="flex flex-1 flex-wrap -m-1">
                    { !files &&
                      <li id="empty" class="h-full w-full text-center flex flex-col items-center justify-center items-center">
                        <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                        <span class="text-small text-gray-500">No files selected</span>
                      </li>
                    }
                    { files && files.map(file => {
                        return <ImageUploadPreview file={file} deleteFile={deleteFile}></ImageUploadPreview>;
                    })}
                  </ul>
                </section>
      
                <footer class="flex justify-end px-8 pb-8 pt-4">
                  <button id="submit" class="rounded-md px-4 py-2 bg-green-400 hover:bg-green-700 text-white focus:shadow-outline focus:outline-none">
                    Upload now
                  </button>
                  <button onClick={() => setShowModal(false)} class="ml-3 rounded-md px-4 py-2 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                    Cancel
                  </button>
                </footer>
              </article>
            </main>
          </div>

          <template id="file-template">
            <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
              <article tabIndex="0" class="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
                <img alt="upload preview" class="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed" />
      
                <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                  <h1 class="flex-1 group-hover:text-blue-800"></h1>
                  <div class="flex">
                    <span class="p-1 text-blue-800">
                      <i>
                        <svg class="fill-current w-4 h-4 ml-auto pt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                        </svg>
                      </i>
                    </span>
                    <p class="p-1 size text-xs text-gray-700"></p>
                    <button class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800">
                      <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                      </svg>
                    </button>
                  </div>
                </section>
              </article>
            </li>
          </template>
      
          <template id="image-template">
            <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
              <article tabIndex="0" class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
                <img alt="upload preview" class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" />
      
                <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                  <h1 class="flex-1"></h1>
                  <div class="flex">
                    <span class="p-1">
                      <i>
                        <svg class="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                        </svg>
                      </i>
                    </span>
      
                    <p class="p-1 size text-xs"></p>
                    <button class="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                      <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                      </svg>
                    </button>
                  </div>
                </section>
              </article>
            </li>
          </template>
        </div>
      }
    </div>
  );
};

export default UploadImageButton;