import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Devemos adicionar o componente Layout para compartilhá-lo em qualquer página
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
