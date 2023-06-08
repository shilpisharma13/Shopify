import { getAllProducts } from '../lib/shopify'
import Filters from '../components/Filters'
import { getProducts } from '../utils/shopify'

export default async function Page() {
  // const products = await getAllProducts()

  const response = await getProducts()
  const allProducts = response.products.edges
    ? response.products.edges
    : []

  return (
    <div className='bg-white'>
      <Filters products={allProducts} />
    </div>
  )
}
