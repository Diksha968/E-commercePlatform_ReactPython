"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import api from "../../services/api"
import ProductCard from "../../components/customer/ProductCard"
import CategoryFilter from "../../components/customer/CategoryFilter"
import PriceFilter from "../../components/customer/PriceFilter"

const ProductListPage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: null,
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  })

  const location = useLocation()

  useEffect(() => {
    // Parse query parameters
    const searchParams = new URLSearchParams(location.search)
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")

    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }))
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/categories/")
        setCategories(response.data)
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
    fetchProducts(categoryParam, searchParam)
  }, [location.search])

  const fetchProducts = async (category = null, search = null) => {
    setLoading(true)
    try {
      let url = "/products/"
      const params = new URLSearchParams()

      if (category) {
        params.append("category", category)
      }

      if (search) {
        params.append("search", search)
      }

      if (filters.minPrice) {
        params.append("min_price", filters.minPrice)
      }

      if (filters.maxPrice) {
        params.append("max_price", filters.maxPrice)
      }

      if (filters.sort === "price-low-high") {
        params.append("ordering", "price")
      } else if (filters.sort === "price-high-low") {
        params.append("ordering", "-price")
      } else if (filters.sort === "newest") {
        params.append("ordering", "-created_at")
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await api.get(url)
      setProducts(response.data.results || response.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products. Please try again later.")
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
    fetchProducts(
      newFilters.category || filters.category,
      null,
      newFilters.minPrice || filters.minPrice,
      newFilters.maxPrice || filters.maxPrice,
      newFilters.sort || filters.sort,
    )
  }

  const handleSortChange = (e) => {
    const sortValue = e.target.value
    handleFilterChange({ sort: sortValue })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded mb-6">
          <p>{error}</p>
          <p className="mt-2">Make sure the Django backend server is running. You can start it with:</p>
          <pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-x-auto">
            cd backend python manage.py runserver
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Products</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>

            <CategoryFilter
              categories={categories}
              selectedCategory={filters.category}
              onCategoryChange={(category) => handleFilterChange({ category })}
            />

            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            <PriceFilter
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onPriceChange={(minPrice, maxPrice) => handleFilterChange({ minPrice, maxPrice })}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <p className="text-gray-600 dark:text-gray-400 font-medium">{products.length} products found</p>

            <div className="flex items-center">
              <label htmlFor="sort" className="mr-3 text-gray-600 dark:text-gray-400 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                value={filters.sort}
                onChange={handleSortChange}
                className="border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 px-4 py-2"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-10 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductListPage
