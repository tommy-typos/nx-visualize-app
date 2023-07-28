import { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nx Visualize</title>
      </Head>
      <main className="flex h-full w-full">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
