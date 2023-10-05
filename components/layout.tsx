import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import NavMenu from './nav-menu'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
        <NavMenu/>
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
