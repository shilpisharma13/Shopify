import SingleProduct from '@/app/components/SingleProduct'
import { getSingleProduct } from '../../utils/shopify'

const Page = async ({ params: { handle } }) => {
  const response = await getSingleProduct(handle)

  const product = response.productByHandle
 
  return <SingleProduct product={product} />
}

export default Page
