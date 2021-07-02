import Head from 'next/head'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

import c from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={c.header}>
        <div className={c.banner} />
        <NavBar />
        <h1>The Discord companion made for you.</h1>
        <p>
          Quit the hassle and ditch all of your different bots. <br />
          CRBT is easy, powerful and efficient.
        </p>
        <a href='/invite' className={c.inviteButton}>Invite</a>
      </header>

      <h1 className={c.why}>
        Why CRBT?
      </h1>

      <section className={c.section1}>
        <div className={c.text}>
          <h2>It's complete and rich in features</h2>
          <p>
            CRBT has a lot of commands, all made to be packed with smartly designed features and organized commands.
            It has a ton of useful commands to get any kind of information, set reminders, do math, and much more!
            It has smart music commands, which makes it super easy to manage your tracks and listen along with your friends, right on Discord.
            It has an original and complete economy system, which allow for cool profile combinations and endless fun!
          </p>
        </div>
        <div className={c.spacer} />
        <div className={c.img}>
          <img src="/assets/logos/crbt.png" alt="" />
        </div>
      </section>

      <section className={c.section2}>
        <div className={c.text}>
          <h2>It's made to be easy, yet powerful</h2>
          <p>
            Whether you simply want to get someone's avatar, or set up a whole profile with badges and CRBTscript-fueled fields, CRBT is snappy, doesn't need much learning and always has its handy help command and error messages to help you accomplish whatever you want to do!
          </p>
        </div>
        <div className={c.spacer} />
        <div className={c.img}>
          <img src="/assets/logos/crbt.png" alt="" />
        </div>
      </section>

      <section className={c.section1}>
        <div className={c.text}>
          <h2>Looks great, and behaves how you'd like</h2>
          <p>
            CRBT was made to look just right with its gorgeous UI and its ton of customization so you can tune it to look, feel, and behave however you prefer it to for not only your server, but also you.
          </p>
        </div>
        <div className={c.spacer} />
        <div className={c.img}>
          <img src="/assets/logos/crbt.png" alt="" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
