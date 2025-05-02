import React from 'react'

const CardLoader = () => {
  return (
    <div className="bg-[#1D1D1D] shadow-md rounded-lg overflow-hidden relative h-full">
    <div className="animate-pulse">
        <div className="bg-gray-700 w-full h-40"></div>
        <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            <div className="h-9 bg-gray-700 rounded mt-4"></div>
        </div>
    </div>
</div>
  )
}

export default CardLoader
