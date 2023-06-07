const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

const ShopifyData = async (query: string) => {
  const URL = `https://${domain}/api/2023-04/graphql.json`

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json()
    })

    return data
  } catch (error) {
    throw new Error('Products not fetched')
  }
}

export const getAllProducts = async () => {
  const query = `
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

  const response = await ShopifyData(query)

  const allProducts = response.data.products.edges
    ? response.data.products.edges
    : []

  return allProducts
}

export const getSingleProduct = async () => {
  const query = `query GetProductByProductHandle($handle:String!){
  productByHandle(handle : $handle) {
    id
    handle
    title
    productType
    description
    vendor
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
}`

  const variables = { handle: 'vans-authentic-multi-eyelets-gradient-crimson' }

  const response = await fetch(`https://${domain}/api/2023-04/graphql.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  }).then((response) => response.json())

  const product = response.data.productByHandle
  return product
}

// export async function getSingleProduct(handle: string) {
//   const query = `{
//   productByHandle(handle: $handle) {
//     id
//     handle
//     title
//     productType
//     description
//     vendor
//     priceRangeV2 {
//       minVariantPrice {
//         amount
//         currencyCode
//       }
//       maxVariantPrice {
//         amount
//         currencyCode
//       }
//     }
//   }
// }`

//   const response = await ShopifyData(query)
//   const product = response.data?.productByHandle
//   // const { data } = await ShopifyData(query)
//   // // console.log(response)
//   // const { productByHandle } = data
//   return product
// }
