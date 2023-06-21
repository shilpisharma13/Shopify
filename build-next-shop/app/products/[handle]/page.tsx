
import SingleProduct from '../../../components/SingleProduct'
import { getSingleProduct } from '../../../utils/shopify'

const Page = async ({ params: { handle } }) => {
  const response = await getSingleProduct(handle)
  
  const product = response.productByHandle

  
  
  return (
    <h1>
      <SingleProduct product={product} />
    </h1>
  )
}

export default Page
