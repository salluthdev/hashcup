import Head from "next/head";

export default function Metadata({ title }) {
  return (
    <Head>
      <title>
        {title
          ? `HashCup - ${title}`
          : "HashCup - Manage Your Multiple Assets in One Cup"}
      </title>
      <meta
        name="description"
        content="HashCup - Manage Your Multiple Assets in One Cup."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/img/hashcup-logo-dummy.png " />
    </Head>
  );
}
