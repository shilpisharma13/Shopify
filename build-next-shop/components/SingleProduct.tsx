'use client'

import Image from 'next/image'
import { useState } from 'react'
import ProductVariantOptions from './ProductVariantOptions'

const SingleProduct = ({ product }) => {
  const {
    id,
    handle,
    title,
    images,
    description,
    priceRange,
    variants,
    options,
  } = product
  console.log(options)
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
    }
  })
  console.log(allVariantOptions)

  const defaultValues = {}
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  return (
    <div className='bg-white'>
      <div className='pt-6'>
        {/* Image gallery */}

        <div className='grid grid-cols-2'>
          <div>
            <Image
              src={images.edges[0].node.url}
              alt={images.edges[0].node.altText || ''}
              width={500}
              height={200}
              sizes=''
            />
            <div className='grid grid-cols-5 gap-1'>
              {images.edges.map((image, index) => {
                return (
                  <Image
                    key={index}
                    src={image.node.url}
                    alt={image.node.altText || ''}
                    // fill='fill'
                    // style='cover'
                    width={50}
                    height={20}
                  />
                )
              })}
            </div>
          </div>
          {/* Product info */}
          <div className='mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6  lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16'>
            <div className='lg:col-span-2  lg:pr-8'>
              <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
                {title}
              </h1>
            </div>

            {/* Options */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <h2 className='sr-only'>Product information</h2>
              <p className='text-3xl tracking-tight text-gray-900'>
                {`${priceRange.minVariantPrice.currencyCode} $${priceRange.minVariantPrice.amount}`}
              </p>
              {product.options.map(({ name, values }) => (
                <ProductVariantOptions
                  key={`key-${name}`}
                  name={name}
                  values={values}
                  selectedOptions={selectedOptions}
                  selectedVariant={selectedVariant}
                />
              ))}
              <div className='py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6'>
                {/* Description and details */}
                <div>
                  <h3 className='sr-only'>Description</h3>
                  <div className='space-y-6'>
                    <p className='text-base text-gray-900'>{description}</p>
                  </div>
                </div>
                <button
                  type='submit'
                  className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Add to bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
