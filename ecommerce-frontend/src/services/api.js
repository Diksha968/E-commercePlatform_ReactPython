import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

// Add a request interceptor to include the auth token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (token expired)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/auth/login"
    }
    return Promise.reject(error)
  },
)

// Update the mockData categories to use our new images
export const mockData = {
  categories: [
    {
      id: 1,
      name: "Food Products",
      slug: "food",
      description: "Fresh and packaged food items",
      image: "/images/category-food.png",
    },
    {
      id: 2,
      name: "Bakery Items",
      slug: "bakery",
      description: "Fresh baked goods",
      image: "/images/category-bakery.png",
    },
    {
      id: 3,
      name: "Spices",
      slug: "spices",
      description: "Organic spices and seasonings",
      image: "/images/category-spices.png",
    },
    {
      id: 4,
      name: "Herbal Products",
      slug: "herbal",
      description: "Natural herbal remedies",
      image: "/images/category-herbal.png",
    },
    {
      id: 5,
      name: "Cleaning Solutions",
      slug: "cleaning",
      description: "Eco-friendly cleaning products",
      image: "/images/category-cleaning.png",
    },
  ],
  featuredProducts: [
    {
      id: 1,
      name: "Organic Turmeric Powder",
      slug: "organic-turmeric-powder",
      description: "100% organic turmeric powder, freshly ground and packed.",
      price: 150,
      compare_price: 180,
      quantity: 100,
      is_featured: true,
      is_active: true,
      category: 3,
      category_name: "Spices",
      vendor: 1,
      vendor_details: {
        id: 1,
        name: "Spice World",
        logo: "/images/logo.png",
      },
      images: [{ id: 1, image: "/images/turmeric.png", alt_text: "Turmeric Powder", is_primary: true }],
      reviews: [],
      average_rating: 4.5,
      discount_percentage: 17,
    },
    {
      id: 2,
      name: "Whole Wheat Flour",
      slug: "whole-wheat-flour",
      description: "Stone-ground whole wheat flour, perfect for making chapatis and breads.",
      price: 120,
      compare_price: 140,
      quantity: 50,
      is_featured: true,
      is_active: true,
      category: 1,
      category_name: "Food Products",
      vendor: 2,
      vendor_details: {
        id: 2,
        name: "Organic Farms",
        logo: "/images/logo.png",
      },
      images: [{ id: 2, image: "/images/wheat-flour.png", alt_text: "Whole Wheat Flour", is_primary: true }],
      reviews: [],
      average_rating: 4.2,
      discount_percentage: 14,
    },
    {
      id: 3,
      name: "Herbal Tea",
      slug: "herbal-tea",
      description: "A blend of medicinal herbs that helps boost immunity and improve digestion.",
      price: 200,
      compare_price: 250,
      quantity: 30,
      is_featured: true,
      is_active: true,
      category: 4,
      category_name: "Herbal Products",
      vendor: 3,
      vendor_details: {
        id: 3,
        name: "Herbal Life",
        logo: "/images/logo.png",
      },
      images: [{ id: 3, image: "/images/herbal-tea.png", alt_text: "Herbal Tea", is_primary: true }],
      reviews: [],
      average_rating: 4.8,
      discount_percentage: 20,
    },
    {
      id: 4,
      name: "Fresh Cookies",
      slug: "fresh-cookies",
      description: "Freshly baked cookies made with whole wheat flour and jaggery.",
      price: 180,
      compare_price: 200,
      quantity: 20,
      is_featured: true,
      is_active: true,
      category: 2,
      category_name: "Bakery Items",
      vendor: 4,
      vendor_details: {
        id: 4,
        name: "Happy Bakery",
        logo: "/images/logo.png",
      },
      images: [{ id: 4, image: "/images/cookies.png", alt_text: "Fresh Cookies", is_primary: true }],
      reviews: [],
      average_rating: 4.6,
      discount_percentage: 10,
    },
  ],
  products: [
    // Include the featured products
    {
      id: 1,
      name: "Organic Turmeric Powder",
      slug: "organic-turmeric-powder",
      description: "100% organic turmeric powder, freshly ground and packed.",
      price: 150,
      compare_price: 180,
      quantity: 100,
      is_featured: true,
      is_active: true,
      category: 3,
      category_name: "Spices",
      vendor: 1,
      vendor_details: {
        id: 1,
        name: "Spice World",
        logo: "/images/logo.png",
      },
      images: [{ id: 1, image: "/images/turmeric.png", alt_text: "Turmeric Powder", is_primary: true }],
      reviews: [],
      average_rating: 4.5,
      discount_percentage: 17,
    },
    {
      id: 2,
      name: "Whole Wheat Flour",
      slug: "whole-wheat-flour",
      description: "Stone-ground whole wheat flour, perfect for making chapatis and breads.",
      price: 120,
      compare_price: 140,
      quantity: 50,
      is_featured: true,
      is_active: true,
      category: 1,
      category_name: "Food Products",
      vendor: 2,
      vendor_details: {
        id: 2,
        name: "Organic Farms",
        logo: "/images/logo.png",
      },
      images: [{ id: 2, image: "/images/wheat-flour.png", alt_text: "Whole Wheat Flour", is_primary: true }],
      reviews: [],
      average_rating: 4.2,
      discount_percentage: 14,
    },
    {
      id: 3,
      name: "Herbal Tea",
      slug: "herbal-tea",
      description: "A blend of medicinal herbs that helps boost immunity and improve digestion.",
      price: 200,
      compare_price: 250,
      quantity: 30,
      is_featured: true,
      is_active: true,
      category: 4,
      category_name: "Herbal Products",
      vendor: 3,
      vendor_details: {
        id: 3,
        name: "Herbal Life",
        logo: "/images/logo.png",
      },
      images: [{ id: 3, image: "/images/herbal-tea.png", alt_text: "Herbal Tea", is_primary: true }],
      reviews: [],
      average_rating: 4.8,
      discount_percentage: 20,
    },
    {
      id: 4,
      name: "Fresh Cookies",
      slug: "fresh-cookies",
      description: "Freshly baked cookies made with whole wheat flour and jaggery.",
      price: 180,
      compare_price: 200,
      quantity: 20,
      is_featured: true,
      is_active: true,
      category: 2,
      category_name: "Bakery Items",
      vendor: 4,
      vendor_details: {
        id: 4,
        name: "Happy Bakery",
        logo: "/images/logo.png",
      },
      images: [{ id: 4, image: "/images/cookies.png", alt_text: "Fresh Cookies", is_primary: true }],
      reviews: [],
      average_rating: 4.6,
      discount_percentage: 10,
    },
    // Add more products here...
    {
      id: 5,
      name: "Natural Floor Cleaner",
      slug: "natural-floor-cleaner",
      description: "Eco-friendly floor cleaner made with natural ingredients.",
      price: 250,
      compare_price: 300,
      quantity: 40,
      is_featured: false,
      is_active: true,
      category: 5,
      category_name: "Cleaning Solutions",
      vendor: 5,
      vendor_details: {
        id: 5,
        name: "Eco Clean",
        logo: "/images/logo.png",
      },
      images: [{ id: 5, image: "/images/floor-cleaner.png", alt_text: "Natural Floor Cleaner", is_primary: true }],
      reviews: [],
      average_rating: 4.3,
      discount_percentage: 17,
    },
    {
      id: 6,
      name: "Organic Honey",
      slug: "organic-honey",
      description: "Pure organic honey collected from forest beehives.",
      price: 350,
      compare_price: 400,
      quantity: 25,
      is_featured: false,
      is_active: true,
      category: 1,
      category_name: "Food Products",
      vendor: 2,
      vendor_details: {
        id: 2,
        name: "Organic Farms",
        logo: "/images/logo.png",
      },
      images: [{ id: 6, image: "/images/honey.png", alt_text: "Organic Honey", is_primary: true }],
      reviews: [],
      average_rating: 4.9,
      discount_percentage: 13,
    },
  ],
  orders: [
    {
      id: 1,
      order_number: "ORD12345",
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      },
      shipping_address_details: {
        address_line1: "123 Main St",
        address_line2: "Apt 4B",
        city: "Pune",
        state: "Maharashtra",
        postal_code: "411001",
        country: "India",
      },
      billing_address_details: {
        address_line1: "123 Main St",
        address_line2: "Apt 4B",
        city: "Pune",
        state: "Maharashtra",
        postal_code: "411001",
        country: "India",
      },
      status: "delivered",
      payment_status: "paid",
      payment_method: "card",
      subtotal: 650,
      shipping_cost: 0,
      tax: 117,
      discount: 0,
      total: 767,
      created_at: "2023-06-15T10:30:00Z",
      items: [
        {
          id: 1,
          product: 1,
          product_details: {
            id: 1,
            name: "Organic Turmeric Powder",
            image: "/images/turmeric.png",
          },
          vendor: 1,
          quantity: 2,
          price: 150,
          total: 300,
        },
        {
          id: 2,
          product: 3,
          product_details: {
            id: 3,
            name: "Herbal Tea",
            image: "/images/herbal-tea.png",
          },
          vendor: 3,
          quantity: 1,
          price: 200,
          total: 200,
        },
        {
          id: 3,
          product: 4,
          product_details: {
            id: 4,
            name: "Fresh Cookies",
            image: "/images/cookies.png",
          },
          vendor: 4,
          quantity: 1,
          price: 150,
          total: 150,
        },
      ],
    },
  ],
}

// Enhanced API methods with fallback to mock data
const enhancedApi = {
  ...api,
  get: async (url, config) => {
    try {
      const response = await api.get(url, config)
      return response
    } catch (error) {
      console.warn(`API request failed for ${url}. Using mock data instead.`, error)

      // Return mock data based on the URL
      if (url === "/products/featured/") {
        return { data: mockData.featuredProducts }
      } else if (url === "/products/categories/" || url === "/categories/") {
        return { data: mockData.categories }
      } else if (url === "/products/") {
        return { data: mockData.products }
      } else if (url.startsWith("/products/") && url !== "/products/featured/") {
        const productId = Number.parseInt(url.split("/")[2])
        const product = mockData.products.find((p) => p.id === productId)
        return { data: product || null }
      } else if (url === "/orders/") {
        return { data: mockData.orders }
      } else if (url.startsWith("/orders/")) {
        const orderId = Number.parseInt(url.split("/")[2])
        const order = mockData.orders.find((o) => o.id === orderId)
        return { data: order || null }
      }

      // If no mock data is available for this URL, rethrow the error
      throw error
    }
  },
}

// Export the enhanced API with mock data fallback
export default enhancedApi
