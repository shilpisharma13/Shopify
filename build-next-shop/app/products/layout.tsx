import Filters from '../components/Filters'
import HeaderSection from '../components/HeaderSection'

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <HeaderSection />
      {/* <Filters /> */}
      {children}
    </div>
  )
}
