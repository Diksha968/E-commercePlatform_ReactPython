"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../../contexts/ThemeContext"

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    site_name: "Grow-Well Marketplace",
    site_description: "Your one-stop shop for quality products from trusted vendors.",
    contact_email: "info@growwell.com",
    contact_phone: "+91 9371009066",
    address: "Pune, India",
    shipping_fee: 50,
    free_shipping_threshold: 500,
    tax_rate: 18,
    currency: "INR",
    currency_symbol: "₹",
    enable_vendor_registration: true,
    auto_approve_vendors: false,
    auto_approve_products: false,
    maintenance_mode: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const theme = useTheme()

  useEffect(() => {
    // In a real application, you would fetch settings from the API
    // For now, we'll use the default settings
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // In a real application, you would save settings to the API
      // await api.put('/admin/settings/', settings);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess(true)
      setLoading(false)

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("Error saving settings:", err)
      setError("Failed to save settings. Please try again later.")
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Settings saved successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {/* General Settings */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="site_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  id="site_name"
                  name="site_name"
                  value={settings.site_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="site_description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Site Description
                </label>
                <input
                  type="text"
                  id="site_description"
                  name="site_description"
                  value={settings.site_description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label
                  htmlFor="contact_email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={settings.contact_email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact_phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Contact Phone
                </label>
                <input
                  type="text"
                  id="contact_phone"
                  name="contact_phone"
                  value={settings.contact_phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Commerce Settings */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Commerce Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="shipping_fee"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  id="shipping_fee"
                  name="shipping_fee"
                  value={settings.shipping_fee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  min="0"
                  step="1"
                />
              </div>

              <div>
                <label
                  htmlFor="free_shipping_threshold"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Free Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  id="free_shipping_threshold"
                  name="free_shipping_threshold"
                  value={settings.free_shipping_threshold}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  min="0"
                  step="1"
                />
              </div>

              <div>
                <label htmlFor="tax_rate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  id="tax_rate"
                  name="tax_rate"
                  value={settings.tax_rate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  min="0"
                  max="100"
                  step="0.01"
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                >
                  <option value="INR">Indian Rupee (INR)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="currency_symbol"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Currency Symbol
                </label>
                <input
                  type="text"
                  id="currency_symbol"
                  name="currency_symbol"
                  value={settings.currency_symbol}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  maxLength="3"
                />
              </div>
            </div>
          </div>

          {/* Vendor Settings */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Vendor Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enable_vendor_registration"
                  name="enable_vendor_registration"
                  checked={settings.enable_vendor_registration}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="enable_vendor_registration"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Enable Vendor Registration
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto_approve_vendors"
                  name="auto_approve_vendors"
                  checked={settings.auto_approve_vendors}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="auto_approve_vendors" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Auto-approve New Vendors
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="auto_approve_products"
                  name="auto_approve_products"
                  checked={settings.auto_approve_products}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="auto_approve_products" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Auto-approve New Products
                </label>
              </div>
            </div>
          </div>

          {/* Maintenance Settings */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Maintenance Settings</h2>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenance_mode"
                name="maintenance_mode"
                checked={settings.maintenance_mode}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Enable Maintenance Mode
              </label>
            </div>

            {settings.maintenance_mode && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-md">
                <p className="text-yellow-800 dark:text-yellow-200">
                  Warning: Enabling maintenance mode will make the site inaccessible to regular users. Only
                  administrators will be able to access the site.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdminSettings

