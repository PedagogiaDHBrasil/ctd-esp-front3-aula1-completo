import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import CONTENT_BY_LOCALE from "../../locale";

// Criamos uma página dinâmica que nos permitirá
// mostra a receita escolhida pelo usuário.
const Recipe: NextPage = () => {
  // Usando o hook useRouter podemos acessar o id da receita
  // que é dado pela url

  const { locale, query } = useRouter();
  const id = query.id;

  // Também obtemos as informações com base no idioma selecionado
  const localeContent =
    CONTENT_BY_LOCALE[locale as keyof typeof CONTENT_BY_LOCALE];

  // Extraímos as informações de acordo com o idioma selecionado
  const { title, description, content } = localeContent.recipePage;

  return (
    <>
      {/* Podemos criar um Head diferente para esta página, para alterar o título */}
      <Head>
        <title>{`${title}: ${id}`} </title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <h3>{title}</h3>
        <p>
          {content} #{id}
        </p>
      </div>
    </>
  );
};

export default Recipe;
