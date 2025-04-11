"use client"

import { useState } from "react"

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }) => {
  const [min, setMin] = useState(minPrice)
  const [max, setMax] = useState(maxPrice)

  const handleApply = () => {
    onPriceChange(min, max)
  }

  return (
    <div>
      <h3 className="text-base font-semibold mb-4">Price Range</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="min-price" className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Min Price
            </label>
            <input
              type="number"
              id="min-price"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              placeholder="₹0"
              min="0"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max-price" className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Max Price
            </label>
            <input
              type="number"
              id="max-price"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              placeholder="₹10000"
              min="0"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleApply}
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  )
}

export default PriceFilter
