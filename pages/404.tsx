/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'

import c from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={c.root} style={{marginBottom: 140}}>
      <Head>
        <title>CRBT - Not Found</title>
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Page Not Found!</h1>
      <p>
        We're sorry, but the page you were looking for does not exist.
      </p>
      <p>
        <Link href='/'><a className={c.inviteButton}>Home Page</a></Link>
      </p>
    </div>
  )
}
