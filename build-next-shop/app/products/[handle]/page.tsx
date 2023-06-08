import { getSingleProduct } from '../../utils/shopify'

const Page = async ({ params: { handle } }) => {
  const response = await getSingleProduct(handle)
  console.log(response)
  return <h1>{handle}</h1>
}

export default Page
