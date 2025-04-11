import ProductCard from "./ProductCard"

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-2xl font-bold mb-8">Related Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
