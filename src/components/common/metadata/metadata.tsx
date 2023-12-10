import Head from "next/head";

interface MetadataProps {
  title?: string;
}

export default function Metadata({ title }: MetadataProps) {
  return (
    <Head>
      <title>
        {title
          ? `HashCup - ${title}`
          : "HashCup - Manage Your Multichain Assets in One Cup"}
      </title>
      <meta
        name="description"
        content="Your clean and simple crypto assets manager. Easily track your Ethereum, Binance Smart Chain (BSC), and Polygon network assets in one cup. Explore the smooth Pacoca alternative with HashCup."
      />
      <meta
        name="keywords"
        content="hashcup, multichain assets manager, metamask assets overview, pacoca alternative, ethereum assets manager, bsc assets manager, polygon assets manager, crypto assets tracker"
      />
      <meta name="author" content="salluthdev" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/img/favicon.ico " />
    </Head>
  );
}
