import Head from 'next/head'

import c from '../styles/Policy.module.scss'

export default function Home({ source }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT.ga - Thank You</title>
        <meta property="og:title" content="CRBT.ga - Thank You" />
        <meta name="description" content="The Discord companion made for you. Made by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Made by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={c.content}>
        <h1>Thanks for adding CRBT <br />to your server</h1>
      </main>
    </div>
  )
}
