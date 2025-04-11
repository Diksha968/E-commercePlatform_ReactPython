"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import api from "../../services/api"

const ProfilePage = () => {
  const { currentUser } = useAuth()

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
  })

  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  })

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [profileResponse, addressesResponse] = await Promise.all([
          api.get("/auth/me/"),
          api.get("/auth/addresses/"),
        ])

        setProfile({
          name: profileResponse.data.name,
          email: profileResponse.data.email,
          phone: profileResponse.data.phone || "",
          date_of_birth: profileResponse.data.customer_profile?.date_of_birth || "",
        })

        setAddresses(addressesResponse.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setError("Failed to load profile data. Please try again later.")
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleEditAddress = (address) => {
    setNewAddress(address)
    setEditingAddressId(address.id)
    setIsAddingAddress(true)
  }

  const handleSaveProfile = async () => {
    try {
      await api.put("/auth/me/", profile)
      setIsEditingProfile(false)
      setSuccessMessage("Profile updated successfully")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Failed to update profile. Please try again later.")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleSaveAddress = async () => {
    try {
      if (editingAddressId) {
        await api.put(`/auth/addresses/${editingAddressId}/`, newAddress)
      } else {
        await api.post("/auth/addresses/", newAddress)
      }

      // Refresh addresses
      const response = await api.get("/auth/addresses/")
      setAddresses(response.data)

      // Reset form
      setNewAddress({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "India",
        is_default: false,
      })

      setIsAddingAddress(false)
      setEditingAddressId(null)
      setSuccessMessage(editingAddressId ? "Address updated successfully" : "Address added successfully")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      console.error("Error saving address:", err)
      setError("Failed to save address. Please try again later.")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleDeleteAddress = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await api.delete(`/auth/addresses/${id}/`)

        // Refresh addresses
        const response = await api.get("/auth/addresses/")
        setAddresses(response.data)

        setSuccessMessage("Address deleted successfully")
        setTimeout(() => setSuccessMessage(null), 3000)
      } catch (err) {
        console.error("Error deleting address:", err)
        setError("Failed to delete address. Please try again later.")
        setTimeout(() => setError(null), 3000)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button
                type="button"
                className="text-primary hover:text-primary-dark"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
              >
                {isEditingProfile ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="input"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="input"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date_of_birth"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={profile.date_of_birth}
                    onChange={handleProfileChange}
                    className="input"
                  />
                </div>

                <button type="button" className="btn btn-primary w-full" onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full Name</p>
                  <p className="font-medium">{profile.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone Number</p>
                  <p className="font-medium">{profile.phone || "Not provided"}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Date of Birth</p>
                  <p className="font-medium">
                    {profile.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString() : "Not provided"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Addresses */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Addresses</h2>
              {!isAddingAddress && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setNewAddress({
                      address_line1: "",
                      address_line2: "",
                      city: "",
                      state: "",
                      postal_code: "",
                      country: "India",
                      is_default: false,
                    })
                    setEditingAddressId(null)
                    setIsAddingAddress(true)
                  }}
                >
                  Add New Address
                </button>
              )}
            </div>

            {isAddingAddress ? (
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingAddressId ? "Edit Address" : "Add New Address"}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="address_line1"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="address_line1"
                      name="address_line1"
                      value={newAddress.address_line1}
                      onChange={handleAddressChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address_line2"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      id="address_line2"
                      name="address_line2"
                      value={newAddress.address_line2}
                      onChange={handleAddressChange}
                      className="input"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="postal_code"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={newAddress.postal_code}
                      onChange={handleAddressChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Country *
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={newAddress.country}
                      onChange={handleAddressChange}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_default"
                      checked={newAddress.is_default}
                      onChange={handleAddressChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Set as default address</span>
                  </label>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    onClick={() => {
                      setIsAddingAddress(false)
                      setEditingAddressId(null)
                    }}
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveAddress}>
                    {editingAddressId ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </div>
            ) : null}

            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {address.address_line1}
                          {address.address_line2 && `, ${address.address_line2}`}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{address.country}</p>
                        {address.is_default && (
                          <span className="inline-block mt-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                            Default Address
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          className="text-primary hover:text-primary-dark text-sm"
                          onClick={() => handleEditAddress(address)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">You don't have any saved addresses.</p>
                <button type="button" className="btn btn-primary" onClick={() => setIsAddingAddress(true)}>
                  Add New Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
