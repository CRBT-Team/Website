import Head from 'next/head'
import NavBar from '../components/NavBar'

import c from '../styles/Policy.module.scss'

export default function Home() {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <header className={c.header}>
        <h1>hello</h1>
      </header>
    </div>
  )
}
