import { graphQLClient } from '../../utils/shopify'
import { gql } from 'graphql-request'

export default async function page(req, res, next) {
  console.log(req)
  const {
    searchParams: { id },
  } = req

  const getVariantInventory = async (id) => {
    const getVariantQuantity = gql`
      query GetProductVariantQuantity($id: ID!) {
        product(id: $id) {
          variants(first: 15) {
            edges {
              node {
                id
                availableForSale
              }
            }
          }
        }
      }
    `

    const variables = { id: id }

    try {
      const response = await graphQLClient.request(
        getVariantQuantity,
        variables
      )
      // const product = response.product ? response.product : []
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  const response = await getVariantInventory(id)
  // const data = await res.json(response)
  console.log(response)
  // return data
  // res.send({ response })
  // res.json({ response })
  return response
}
