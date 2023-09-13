import Head from "next/head";

export default function Metadata({ title }) {
  return (
    <Head>
      <title>
        {title
          ? `HashCup - ${title}`
          : "HashCup - Simple Link to Your Crypto Wallet"}
      </title>
      <meta
        name="description"
        content="HashCup - Simple Link to Your Crypto Wallet."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="icon" href="/svg/logo.svg " /> */}
    </Head>
  );
}
