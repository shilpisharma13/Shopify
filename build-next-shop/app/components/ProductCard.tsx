import Link from 'next/link'
import Image from 'next/image'

const ProductCard = ({ product }) => {
  const { handle, title } = product.node

  const { altText, originalSrc } = product.node.images.edges[0].node

  const price = product.node.priceRange.minVariantPrice.amount

  return (
    <Link href={`/products/${handle}`}>
      <div className='w-full bg-gray-200 rounded-3xl overflow-hidden'>
        <div className='relative group-hover:opacity-75 h-72'>
          <Image
            src={originalSrc}
            alt={altText || ''}
            fill='fill'
            style='cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>
      </div>
      <h3 className='mt-4 text-lg font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-700'>{price}</p>
    </Link>
  )
}

export default ProductCard
