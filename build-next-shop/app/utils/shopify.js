import { gql, GraphQLClient } from 'graphql-request'
const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const endpoint = `https://${domain}/api/2023-04/graphql.json`

const graphQLClient = new GraphQLClient(endpoint, {
  method: 'POST',
  headers: {
    'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    Accept: 'application/json',
    'content-Type': 'application/json',
  },
})

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    return await graphQLClient.request(getAllProductsQuery)
  } catch (error) {
    throw new Error(error)
  }
}

export const getSingleProduct = async (handle) => {
  const getSingleProductQuery = gql`
    query getSingleProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `

  const variables = { handle: handle }

  try {
    const data = await graphQLClient.request(getSingleProductQuery, variables)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
