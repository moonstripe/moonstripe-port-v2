
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "fresh/runtime.ts";
import { AppProps } from "fresh/server.ts";

export default function App(props: AppProps) {
  
  return (
    <>
      <Head>
        <title>moonstripe design</title>

        {/* Robots.txt */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}

        <meta property="og:type" content="website" />

        <meta property="og:title" content="moonstripe design" />

        <meta property="og:description" content="web development, out of this world." />

        <meta property="og:image" content="/kojin-logo.png" />

        <meta property="og:image:secure_url" content="/kojin-logo.png" />

        <meta property="og:url" content="www.moonstripe.com/" />

        <meta property="og:site_name" content="moonstripe design" />

        <meta property="og:image:type" content="image/png" />

        <meta property="og:image:alt" content="A moon covered by clouds." />

        {/* Twitter */}

        <meta name="twitter:title" content="moonstripe design" />

        <meta name="twitter:description" content="web development, out of this world." />

        <meta name="twitter:image" content="/kojin-logo.png"/>

        <meta name="twitter:site" content="@moonstripe_____" />

        <meta name="twitter:creator" content="@moonstripe_____" />

        {/* Canonical */}

        <link rel="canonical" href="https://www.moonstripe.com/" />

        {/* <link rel="canonical" href="https://www.moonstripe.com/" /> */}


        <link rel="stylesheet" href="./styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <props.Component />
    </>
  );
}