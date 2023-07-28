import { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css';
import GithubCorner from 'react-github-corner';
import { twColors } from '../utils/twTheme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nx Visualize</title>
      </Head>
      <main className="flex h-full w-full">
        <GithubCorner
          direction="left"
          bannerColor={twColors.fuchsia[950]}
          svgStyle={{ mixBlendMode: 'darken' }}
          size={100}
          href="https://github.com/tommy-typos/nx-visualize-app"
        />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
