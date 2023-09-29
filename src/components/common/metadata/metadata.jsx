import Head from "next/head";

export default function Metadata({ title }) {
  return (
    <Head>
      <title>
        {title
          ? `HashCup - ${title}`
          : "HashCup - Manage Your Multichain Assets in One Cup"}
      </title>
      <meta
        name="description"
        content="Your clean and transparent crypto assets manager. Easily track your Ethereum, Binance Smart Chain (BSC), and Polygon network assets in one cup. Explore the smooth Pacoca alternative with HashCup and dive into our open-source code on GitHub."
      />
      <meta
        name="keywords"
        content="multiple assets manager, multichain assets management, crypto assets manager, pacoca alternative, ethereum assets manager, bsc assets manager, polygon assets manager, cryptocurrency assets tracking"
      />
      <meta name="author" content="salluthdev" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/img/hashcup-logo-dummy.png " />
    </Head>
  );
}
