import Sort from '@/components/Sort'
import {
  getCategoriesList,
  getCollectionsList,
  getProducts,
} from '../../utils/shopify'
import ProductCard from '@/components/ProductCard'
import SidebarFilter from '@/components/SidebarFilter'

export default async function Page() {
  const response = await getProducts()
  const allProducts = response.products.edges ? response.products.edges : []

  const collectionsResponse = await getCollectionsList()
  const collectionsList = collectionsResponse.collections.edges

  const categoriesResponse = await getCategoriesList()
  const categoriesList = new Set(
    categoriesResponse.products.nodes.map((item) => item.productType)
  )

  return (
    <div className='bg-white'>
      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-5 flex items-baseline justify-end border-b border-gray-200 pb-4 pt-24'>
            <Sort />
          </div>
          <div className='col-span-1 pr-3'>
            <SidebarFilter />
          </div>
          <div className='col-span-4'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {allProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// sm md lg xl 2xl
