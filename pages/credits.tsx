import Link from 'next/link'

import Head from 'next/head'
import NavBar from '../components/NavBar'

import c from '../styles/Credits.module.scss'
import Footer from '../components/Footer'

export default function Home({ credits }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT.ga - Credits</title>
        <meta property="og:title" content="CRBT.ga - Credits" />
        <meta name="description" content="The Discord companion made for you. Made by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Made by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Credits</h1>

      <main className={c.content}>
        {
          Object.entries(credits).map(([name, contents]) => {
            return <div key={name}>
              <h2>{name}</h2>
              <div className={c.group}>
                {Object.entries(contents).map(([username, { url, discord }]) => {
                  const contents = <>
                    <div className={c.img}>
                    </div>
                    <span>
                      {username}
                    </span>
                  </>;

                  if (url) {
                    return <Link href={url} key={discord}>
                    <a className={c.card}>
                      {contents}
                    </a>
                  </Link>;
                  } else {
                    return <div className={c.card} key={discord}>
                      {contents}
                    </div>;
                  }
                })}
              </div>
            </div>
          })
        }
      </main>
    </div>
  )
}

import credits from '../credits';

export function getStaticProps() {
  return {
    props: {
      credits
    }
  }
}