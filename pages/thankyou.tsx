import Head from 'next/head'
import Link from 'next/link'

import c from '../styles/Markdown.module.scss'

export default function Home({ source }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT - Thank You</title>
        <meta property="og:title" content="CRBT - Thank You" />
        <meta name="description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={c.content} style={{ textAlign: 'center' }}>
        <h1>Thanks for adding CRBT <br />to your server!</h1>
        <br />
        <p>Here are some quick links you can make use of:</p>

        <div>
          <Link href="/discord"><a className={c.Button}>Join our Discord server</a></Link>
        </div>
        <div>
          <Link href="/vote"><a className={c.Button}>Vote for us on Top.gg!</a></Link>
        </div>
        <div>
          <Link href="/vote2"><a className={c.Button}>Visit CRBT on Discord Bots</a></Link>
        </div>
      </main>
    </div>
  )
}
