/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import Head from 'next/head'

import c from '../styles/Branding.module.scss'

export default function Home({ credits }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT.ga - Branding Assets</title>
        <meta property="og:title" content="CRBT.ga - Branding Assets" />
        <meta name="description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Created by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>CRBT - Branding Assets</h1>
      <p>
      Hey our logo is fancy now, so use it like it was your born child: respectfully (<em>please</em>).
      </p>

      <section>
        <h2>Wordmark</h2>
        <p>
          You can try to transform, recolor, edit or change the CRBT logo,
          but it'll probably just end up looking like garbage so use these ones:
        </p>
        <div>
          
        </div>
      </section>

      <section>
        <h2>Logo Only</h2>
        <p>
          Same deal as the other one, but this one is just the CRBT face logo thingy.
        </p>
        <div>
          
        </div>
      </section>

      <section>
        <h2>Recommended usage</h2>
        <div>
          <div>DO</div>
          <p>Show the dark version of the logo when referring to the Discord bot</p>
          <img src="assets/example-logo-discord.png" alt="" />
        </div>
        <div>
          <div>DON'T</div>
          <p>Don't show the dark version of the logo when it has enough space to breathe</p>
          <img src="assets/example-logo-spacing-dark.png" alt="" />
        </div>
        <div>
          <div>DO</div>
          <p>Show the dark version of the logo when referring to the Discord bot</p>
          <img src="assets/example-logo-spacing-light.png" alt="" />
        </div>
      </section>

      <section>
        <h2>Colors</h2>
        <div>

        </div>
      </section>
    </div>
  )
}
