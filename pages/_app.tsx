import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return <>
    <div>
      <NavBar />
      <Component {...pageProps} />
      <div className="spacer" />
      <Footer />
    </div>
  </>
}

export default MyApp
