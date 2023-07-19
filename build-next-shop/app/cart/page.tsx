'use client'

import Image from 'next/image'
import { formatter } from '../../utils/helpers'
import {
  TrashIcon,
  PlusSmallIcon,
  MinusSmallIcon,
} from '@heroicons/react/24/outline'
import { useShopContext } from '@/context/shopContext'

const CartPage = () => {
  const { cart, cartLoading, checkoutUrl } = useShopContext()
  return (
    <div className='bg-white flex px-4 flex-grow justify-between mt-10'>
      <div className='mx-2 px-5 py-5 basis-3/4'>
        <div className='flex justify-between border-b pb-2'>
          <h1 className='font-semibold text-2xl'>Your Cart</h1>
          <h2 className='text-gray-600 text-m'>3 Items in cart</h2>
        </div>
        {cart.map((product) => {
          return (
            <div
              key={product.id}
              className='flex justify-between hover:bg-gray-100  px-3 py-5'
            >
              <div>
                <div className='flex grow'>
                  <div className='relative flex-shrink-0 w-24 h-20 overflow-hidden border border-gray-200 rounded-md'>
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout='fill'
                      objectFit='cover'
                    />
                  </div>
                  <div className='flex flex-col  ml-4 flex-grow'>
                    <span className='font-bold text-sm'>{product.title}</span>
                    <span className='text-gray-500 text-m'>
                      {product.variantTitle}
                    </span>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-3'>
                <div>
                  <button
                    className='px-2'
                    onClick={() => decrementCartItem(product)}
                    disabled={cartLoading}
                  >
                    -
                  </button>
                </div>
                <div>
                  <span className='px-2 border-l border-r'>
                    {product.variantQuantity}
                  </span>
                </div>
                <div>
                  <button
                    className='px-2'
                    onClick={() => incrementCartItem(product)}
                    disabled={cartLoading}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>{formatter.format(product.variantPrice)}</div>
              <div>
                <TrashIcon className='ml-3 w-5' />
              </div>
            </div>
          )
        })}
      </div>

      <div
        id='summary'
        className='mx-3 px-8 py-8 border rounded-lg bg-gray-600'
      >
        <h1 className='font-semibold text-2xl text-white'>Order Summary</h1>
        <div className='flex justify-between mt-10 mb-2 text-white'>
          <span className='font-semibold text-sm uppercase'>Total</span>
          <span className='font-semibold text-sm'>590$</span>
        </div>
        <div className='flex justify-between mt-5 mb-2 text-white'>
          <span className='font-semibold text-sm uppercase'>Shipping</span>
          <span className='font-semibold text-sm'>$10</span>
        </div>

        <div className='border-t mt-4'>
          <div className='flex font-semibold justify-between py-6 text-sm uppercase text-white'>
            <span>Total cost</span>
            <span>$600</span>
          </div>
          <div className='grid grid-row2-2'>
            <button className=' items-center justify-center px-6 py-3 text-base font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 mb-2'>
              Checkout
            </button>
            <a
              className=' items-center justify-center px-6 py-3 text-base font-medium text-black bg-white border  rounded-md shadow-sm '
              href='/products'
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CartPage
