'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import ProductVariantOptions from './ProductVariantOptions'
import { getVariantInventory } from '@/utils/shopify'

// const fetcher = (url, id) => {
//   return axios
//     .get(url, {
//       params: { id: id },
//     })
//     .then((res) => res.data)
//     .then((data) => data)
// }

// const disableCache = (useSWRNext) => {
//   return (key, fetcher, config) => {
//     const swr = useSWRNext(key, fetcher, config)
//     const { data, isValidating } = swr
//     return Object.assign({}, swr, {
//       data: isValidating ? undefined : data,
//     })
//   }
// }
const ProductForm = ({ product, productInventory }) => {
 

  // const { data: productInventory } = useSWR(['/api', product.id], ([url, id]) =>
  //   fetcher(url, id)
  // )

  console.log(productInventory)
  const allVariantOptions = product.variants.edges.map((variant) => {
    const allOptions = {}

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value
    })

    return {
      id: variant.node.id,
      image: variant.node.image.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.price.amount,
      variantQuantity: 1,
    }
  })

  const defaultValues = {}
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)
  const [inStock, setInStock] = useState(true)

  const setOptions = (name, value) => {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value }
    })
    const selection = {
      ...selectedOptions,
      [name]: value,
    }
    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  // console.log(selectedVariant)
  // console.log(productInventory?.product.variants.edges)
  // console.log(allVariantOptions)

  useEffect(() => {
    if (productInventory) {
      const selectedItem = productInventory?.product?.variants?.edges.filter(
        (item) => item.node.id === selectedVariant.id
      )
      console.log(selectedItem)
      const isAvailable = selectedItem[0].node?.availableForSale

      if (isAvailable) {
        setInStock(true)
      } else {
        setInStock(false)
      }
    }
  }, [productInventory, selectedVariant])

  return (
    <>
      <div>
        {product.options.map(({ name, values }) => (
          <ProductVariantOptions
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            inStock={inStock}
            setOptions={setOptions}
          />
        ))}
      </div>
      {inStock ? (
        <button
          type='submit'
          className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Add to bag
        </button>
      ) : (
        <button className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 cursor-not-allowed'>
          Sold Out!
        </button>
      )}
    </>
  )
}
export default ProductForm
