import Head from 'next/head'

import c from '../../styles/Markdown.module.scss'

export default function Home({ source }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT Blog</title>
        <meta property="og:title" content="CRBT Blog" />
        <meta name="description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={c.content}>
        <h1>CRBT Blog</h1>
      </div>
    </div>
  )
}
