"use client"

import { useState, useEffect } from "react"
import { useTheme } from "../../contexts/ThemeContext"
import { useAuth } from "../../contexts/AuthContext"
import api from "../../services/api"

const VendorProfile = () => {
  const { currentUser } = useAuth()
  const theme = useTheme()

  const [profile, setProfile] = useState({
    business_name: "",
    business_description: "",
    logo: null,
    gst_number: "",
    pan_number: "",
    bank_account_name: "",
    bank_account_number: "",
    bank_ifsc: "",
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/vendor-profile/")
      setProfile(response.data)
      if (response.data.logo) {
        setLogoPreview(response.data.logo)
      }
      setLoading(false)
    } catch (err) {
      console.error("Error fetching profile:", err)
      setError("Failed to load profile data. Please try again later.")
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfile((prev) => ({ ...prev, logo: file }))

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // Create a FormData object to handle file upload
      const formData = new FormData()
      Object.keys(profile).forEach((key) => {
        if (profile[key] !== null) {
          formData.append(key, profile[key])
        }
      })

      await api.put("/auth/vendor-profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setSuccess(true)
      setSaving(false)

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err.response?.data?.message || "Failed to update profile. Please try again later.")
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vendor Profile</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>Profile updated successfully!</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Business Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="business_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Business Name *
                </label>
                <input
                  type="text"
                  id="business_name"
                  name="business_name"
                  value={profile.business_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="business_description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Business Description
                </label>
                <textarea
                  id="business_description"
                  name="business_description"
                  value={profile.business_description || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                ></textarea>
              </div>

              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Business Logo
                </label>
                <div className="flex items-center space-x-4">
                  {logoPreview && (
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Business Logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      onChange={handleLogoChange}
                      accept="image/*"
                      className="w-full text-sm text-gray-500 dark:text-gray-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-secondary file:text-white
                        hover:file:bg-secondary-dark"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF up to 2MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="gst_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GST Number
                </label>
                <input
                  type="text"
                  id="gst_number"
                  name="gst_number"
                  value={profile.gst_number || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="pan_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  PAN Number
                </label>
                <input
                  type="text"
                  id="pan_number"
                  name="pan_number"
                  value={profile.pan_number || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Bank Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="bank_account_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Account Holder Name
                </label>
                <input
                  type="text"
                  id="bank_account_name"
                  name="bank_account_name"
                  value={profile.bank_account_name || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label
                  htmlFor="bank_account_number"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="bank_account_number"
                  name="bank_account_number"
                  value={profile.bank_account_number || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="bank_ifsc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  id="bank_ifsc"
                  name="bank_ifsc"
                  value={profile.bank_ifsc || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <p className="text-gray-900 dark:text-gray-100">{currentUser.name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <p className="text-gray-900 dark:text-gray-100">{currentUser.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <p className="text-gray-900 dark:text-gray-100">{currentUser.phone || "Not provided"}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Account Status
                </label>
                <p className="text-gray-900 dark:text-gray-100">
                  {profile.is_approved ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending Approval
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VendorProfile

