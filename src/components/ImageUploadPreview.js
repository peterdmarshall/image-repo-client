import React from 'react';

const ImageUploadPreview = (props) => {

    const { file, deleteFile } = props;
  
    const formatFileSize = (fileSize) => {
      return fileSize > 1024
        ? fileSize > 1048576
          ? Math.round(fileSize / 1048576) + "mb"
          : Math.round(fileSize / 1024) + "kb"
        : fileSize + "b";
    }

    const url = window.URL.createObjectURL(file);

    console.log(file);

  
    return (
        <li class="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
            <article tabIndex="0" class="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm">
                <img src={url} alt="upload preview" class="img-preview w-full h-full sticky object-cover rounded-md bg-fixed" />
        
                <section class="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                    <h1 class="flex-1">{file.name}</h1>
                    <div class="flex">
                        <span class="p-1">
                            <i>
                            <svg class="fill-current w-4 h-4 ml-auto pt-" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                            </svg>
                            </i>
                        </span>
            
                        <p class="p-1 text-xs">{formatFileSize(file.size)}</p>
                        <button onClick={() => deleteFile(file.name)} class="ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                            <svg class="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path class="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                            </svg>
                        </button>
                    </div>
                </section>
            </article>
        </li>
    );
}

export default ImageUploadPreview;