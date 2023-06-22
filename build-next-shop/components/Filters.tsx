'use client'

import { useState } from 'react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import MobileFilters from './MobileFilters'
import SidebarFilter from './SidebarFilter'
import Sort from './Sort'
import GridView from './GridView'
import ListView from './ListView'

export default function Filters({ products }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [gridView, setGridView] = useState(true)

  return (
    <div className='bg-white'>
      <div>
        {/* Mobile filter dialog */}
        <MobileFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        {/* Heading */}
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
         

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Wide-Screen Filters */}

              <SidebarFilter />

              {/* Product grid */}

              {products.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
