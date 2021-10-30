import Link from 'next/link'
import Image from 'next/image'

import Head from 'next/head'

import c from '../styles/Credits.module.scss'

import credits from '../credits';

export default function Home() {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT - Credits</title>
        <meta property="og:title" content="CRBT - Credits" />
        <meta name="description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className={c.content}>
        <h1>Credits</h1>
        {
          Object.entries(credits.credits).map(([name, contents]) => {
            return <div key={name}>
              <h2>{name}</h2>
              <div className={c.group}>
                {contents.map((username) => {
                  const { url, discord, avatar } = credits.userData[username];
                  
                  const img = avatar || '/placeholder-image.png';

                  const contents = <>
                    <Image src={img} width={50} height={50} alt={`${username}`} className={c.img} />
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
      </div>
    </div>
  )
}
