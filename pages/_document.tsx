import { Html, Head, Main, NextScript } from "next/document";

// Adicionamos um documento personalizado para colocar o favicon dentro da tag head.
// Como o favicon é o mesmo em todas as páginas, fazemos
// neste arquivo global
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
