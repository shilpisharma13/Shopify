import Filters from '../../components/Filters'
import {
  getCategoriesList,
  getCollectionsList,
  getProducts,
} from '../../utils/shopify'

export default async function Page() {
  // const products = await getAllProducts()

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
      <Filters
        products={allProducts}
        collectionsList={collectionsList}
        categoriesList={categoriesList}
      />
    </div>
  )
}
