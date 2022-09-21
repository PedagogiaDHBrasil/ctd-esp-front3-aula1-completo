import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import CONTENT_BY_LOCALE from "../locale";
import { defaultLocale } from "../locale/constants";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // Através do useRouter acessamos o idioma selecionado
  const { locale = defaultLocale } = useRouter();
  const localeContent =
    CONTENT_BY_LOCALE[locale as keyof typeof CONTENT_BY_LOCALE];

  // Extraímos as informações de acordo com o idioma selecionado
  const { appName, heroText, recipes, description } = localeContent.home;

  return (
    <>
      {/* Adicionamos um Head específico com conteúdo para esta página */}
      <Head>
        <title>{appName}</title>
        <meta name="description" content={description} />
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.description}>{heroText}</h1>
          <figure>
            {/* Adicionamos a imagem do chef que está dentro da pasta public */}
            <Image
              src="/chef.jpg"
              alt="app-logo"
              width={400}
              height={400}
              layout="fixed"
            />
          </figure>
        </div>
        <div className={styles.grid}>
          {/* Nós iteramos sobre a lista de receitas */}
          {recipes.map((recipe) => (
            // Adicionamos o componente Link para navegar até a página
            // que contém o detalhe do post com a receita
            <Link href={recipe.link} key={recipe.id}>
              <div className={styles.card}>
                <h3>{recipe.name}</h3>
                {/* Adicionamos o componente Image com a imagem do prato que obtemos de uma URL externa
                IMPORTANTE: Devemos adicionar a URL dentro dos domínios permitidos no arquivo next.config.js
               */}
                <Image
                  src={recipe.image.src}
                  alt={recipe.image.alt}
                  width={recipe.image.width}
                  height={recipe.image.height}
                />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
