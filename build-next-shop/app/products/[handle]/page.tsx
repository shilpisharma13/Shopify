import { getSingleProduct } from '@/app/lib/shopify'
import SingleProduct from '../../components/SingleProduct'

// interface Props {
//   params: Reac
//   handle: string
// }

const Page = async ({ params: { handle } }) => {
  const product = await getSingleProduct()
  console.log(product)
  // const { title, description } = productByHandle

  return <h1>{handle}</h1>
}

export default Page
