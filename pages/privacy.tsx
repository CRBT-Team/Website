import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { readFile } from 'fs-extra';
import Head from 'next/head'
import NavBar from '../components/NavBar'

import c from '../styles/Policy.module.scss'

export default function Home({ source }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <main className={c.content}>
        <MDXRemote {...source}/>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const source = (await readFile('policy-old.md')).toString();
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}
