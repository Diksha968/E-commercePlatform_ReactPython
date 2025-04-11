"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import api from "../../services/api"

const ProductReviews = ({ reviews, productId }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating })
  }

  const handleCommentChange = (e) => {
    setNewReview({ ...newReview, comment: e.target.value })
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setError("You must be logged in to submit a review")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await api.post(`/products/${productId}/review/`, newReview)
      setSuccess(true)
      setNewReview({ rating: 5, comment: "" })
      setShowReviewForm(false)

      // Reload the page to show the new review
      window.location.reload()
    } catch (err) {
      console.error("Error submitting review:", err)
      setError(err.response?.data?.detail || "Failed to submit review. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Check if user has already reviewed this product
  const hasReviewed = isAuthenticated && reviews.some((review) => review.user === currentUser?.id)

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      {/* Review Summary */}
      <div className="flex flex-col md:flex-row gap-10 mb-10">
        <div className="md:w-1/3">
          <div className="bg-orange-50 rounded-lg p-6 text-center">
            <div className="text-5xl font-bold mb-4 text-primary">
              {reviews.length > 0
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                : "N/A"}
            </div>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${
                    reviews.length > 0 &&
                    star <= reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Rating Distribution */}
          {reviews.length > 0 && (
            <div className="mt-6 space-y-3 px-4">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((review) => review.rating === rating).length
                const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0

                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-12">
                      <span>{rating}</span>
                      <svg className="w-4 h-4 ml-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="w-full ml-4">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div className="h-2 bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                    <div className="w-12 text-right text-xs text-gray-600 dark:text-gray-400">{percentage}%</div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Write Review Button */}
          {isAuthenticated && !hasReviewed && !showReviewForm && (
            <button type="button" className="mt-6 w-full btn btn-primary py-3" onClick={() => setShowReviewForm(true)}>
              Write a Review
            </button>
          )}

          {isAuthenticated && hasReviewed && (
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 p-3 rounded-lg">
              You have already reviewed this product
            </div>
          )}

          {!isAuthenticated && (
            <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 bg-gray-100 p-3 rounded-lg">
              Please log in to write a review
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleRatingChange(rating)}
                      >
                        <svg
                          className={`w-8 h-8 ${rating <= newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Review
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={newReview.comment}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                    placeholder="Share your experience with this product..."
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="font-medium text-lg">{review.user_name}</p>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductReviews
