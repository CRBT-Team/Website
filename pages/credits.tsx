import Link from 'next/link'

import Head from 'next/head'
import NavBar from '../components/NavBar'

import c from '../styles/Credits.module.scss'

export default function Home({ credits }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <h1>Credits</h1>

      <main className={c.content}>
        {
          Object.entries(credits).map(([name, contents]) => {
            return <div>
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
                    return <Link href={url}>
                    <a className={c.card}>
                      {contents}
                    </a>
                  </Link>;
                  } else {
                    return <div className={c.card}>
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