import React, { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageUploadPreview from './ImageUploadPreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';


const UploadImageButton = (props) => {

  const { uploadImages, filesToUpload } = props;

  const [showModal, setShowModal] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const hiddenInput = useRef(null);
  const [files, setFiles] = useState([]);


  const hasFiles = ({ dataTransfer: { types = [] } }) => {
    return types.indexOf("Files") > -1
  }

  const dropHandler = (e) => {
    e.preventDefault();
    let newFiles = [];
    let allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    for(var i = 0; i < e.dataTransfer.files.length; i++) {
      if(allowedTypes.includes(e.dataTransfer.files[i].type.split('/')[1])) {
        newFiles.push(e.dataTransfer.files[i]);
      }
    }
    
    setFiles([...files, ...newFiles]);
    console.log(files);
  }

  const dragOverHandler = (e) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  }

  const handleChooseFileClick = (event) => {
    hiddenInput.current.click();
  }

  const handleFileChange = (e) => {
    let newFiles = [];
    let allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    for(var i = 0; i < e.target.files.length; i++) {
      if(allowedTypes.includes(e.target.files[i].type.split('/')[1])) {
        newFiles.push(e.target.files[i]);
      }
    }
    setFiles([...files, ...newFiles]);
  }

  const deleteFile = (fileName) => {
    setFiles(files.filter((file, index, arr) => {
      return file.name !== fileName;
    }))
  }

  const cancelUpload = () => {
    setShowModal(false);
    setFiles([]);
  }

  const handleUpload = async () => {
    setShowModal(false);
    uploadImages(files);
    setFiles([]);
  }

  return (
    <div>
      { (filesToUpload === 0) && 
      <button 
        class='bg-green-400 text-white border-2 border-green-400 font-bold py-2 px-4 rounded hover:bg-green-500 hover:border-green-900 hover:text-green-900 focus:outline-none'
        onClick={() => setShowModal(true)}
      >
        Upload
      </button>
      }
      { (filesToUpload > 0) && 
        <button 
          class='bg-green-500 text-white border-2 border-green-500 font-bold py-2 px-4 rounded focus:outline-none cursor-not-allowed'
        >
          <span class="mr-2">
            <FontAwesomeIcon icon={faCircleNotch} size='1x' spin/>
          </span>
          Uploading
        </button>
      }
      { showModal &&
        <div>
          <div class="justify-center items-center flex overflow-x-hidden h-3/4 overflow-y-auto fixed inset-x-0 top-20 z-50 bg-gray-200 bg-opacity-60">
            <main class="container mx-auto max-w-screen-lg h-full border-2 border-gray-500 rounded-lg">
              <article aria-label="File Upload Modal" class="relative h-full flex flex-col bg-white shadow-xl rounded-md" onDrop={dropHandler} onDragOver={dragOverHandler}>
      
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
                  <button onClick={handleUpload} class="rounded-md px-4 py-2 bg-green-400 hover:bg-green-700 text-white focus:shadow-outline focus:outline-none">
                    Upload Now
                  </button>
                  <button onClick={cancelUpload} class="ml-3 rounded-md px-4 py-2 hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                    Cancel
                  </button>
                </footer>
              </article>
            </main>
          </div>
        </div>
      }
    </div>
  );
};

export default UploadImageButton;