import React from "react";

const Pagination = (props) => {
  
    const { offset, setOffset, limit, setLimit, imageCount } = props;

    const paginationText = (imageCount !== 0) ?
                            (imageCount > offset + limit) ? `${offset + 1} to ${offset + limit} of ${imageCount}` : `${offset + 1} to ${imageCount} of ${imageCount}`
                            : `0 to 0 of 0`;

    const handlePrevClick = () => {
        if(offset !== 0) {
            setOffset(offset - limit);
        }
    }

    const handleNextClick = () => {
        if(offset + limit < imageCount) {
            setOffset(offset + limit);
        }
    }

    return (
        <div class="flex items-center flex-row justify-end p-2">
            <h3 class="text-s py-2 px-4 text-gray-800">{paginationText}</h3>
            <div class="flex flex-row"> 
                <button 
                    class='bg-white text-green-400 rounded-r-none border-r-0 border-2 border-green-400 font-bold py-2 px-4 rounded hover:bg-green-500 hover:border-green-900 hover:text-green-900 focus:outline-none'
                    onClick={handlePrevClick}
                >
                    Prev
                </button>
                <button 
                    class='bg-white text-green-400 border-2 rounded-l-none border-l-1 border-green-400 font-bold py-2 px-4 rounded hover:bg-green-500 hover:border-green-900 hover:text-green-900 focus:outline-none'
                    onClick={handleNextClick}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;