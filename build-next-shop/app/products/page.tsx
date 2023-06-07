import { getAllProducts } from '../lib/shopify'
import Filters from '../components/Filters'

export default async function Page() {
  const products = await getAllProducts()
  

  return (
    <div className='bg-white'>
      <Filters products={products} />
     </div>
  )
}
