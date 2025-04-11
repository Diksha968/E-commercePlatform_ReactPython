"use client"

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">Categories</h3>
      <div className="space-y-3">
        <div
          className={`cursor-pointer hover:text-primary px-3 py-2 rounded-md transition-colors ${!selectedCategory ? "text-primary font-medium bg-orange-50" : "text-gray-700 dark:text-gray-300"}`}
          onClick={() => onCategoryChange(null)}
        >
          All Categories
        </div>

        {categories.map((category) => (
          <div
            key={category.id}
            className={`cursor-pointer hover:text-primary px-3 py-2 rounded-md transition-colors ${selectedCategory === category.slug ? "text-primary font-medium bg-orange-50" : "text-gray-700 dark:text-gray-300"}`}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
