import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import c from '../styles/Policy.module.scss'
import { readFile } from 'fs-extra';

export default function Policy({ mdx }) {
  return (
    <div className={c.root}>
      <Head>
        <title>CRBT.ga - Privacy Policy</title>
        <meta property="og:title" content="CRBT.ga - Privacy Policy" />
        <meta name="description" content="The Discord companion made for you. Made by Clembs." />
        <meta property="og:description" content="The Discord companion made for you. Made by Clembs." />
        <meta property="og:image" content="/assets/logos/crbt-small.png" />
        <meta name='theme-color' content='#F17188' />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={c.content}>
        <MDXRemote {...mdx} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const policyMd = (await readFile('policy-old.md')).toString();
  console.log(policyMd);
  const policyMdx = await serialize(policyMd);

  console.log(policyMdx);

  return {
    props: {
      mdx: policyMdx,
    }
  };
}
