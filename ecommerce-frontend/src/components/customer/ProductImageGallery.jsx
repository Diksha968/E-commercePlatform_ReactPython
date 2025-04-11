"use client"

import { useState } from "react"

const ProductImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images && images.length > 0 ? images[0] : null)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
        <span className="text-gray-500 dark:text-gray-400">No Images Available</span>
      </div>
    )
  }

  return (
    <div>
      {/* Main Image */}
      <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white">
        <img
          src={selectedImage.image || "/placeholder.svg"}
          alt={selectedImage.alt_text || "Product Image"}
          className="w-full h-96 object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                selectedImage === image ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.image || "/placeholder.svg"}
                alt={image.alt_text || `Product Image ${index + 1}`}
                className="w-20 h-20 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery
