## Especialização 3 - S1 C3

Para esta aula, trabalharemos no projeto do blog de receitas, adicionando imagens, layout, metadados e internacionalização de idiomas (i18n).

Começaremos a partir de um repositório que conterá algumas coisas já implementadas para economizar tempo e trabalharemos com cada um desses tópicos em particular.

Embora a ordem e a forma como pode ser trabalhada possa mudar e, em última análise, depender de cada professor, aqui fica uma sugestão de passos para poder realizar a explicação:

### Passo 1: Adicione os metadados

Nesta etapa, adicionaremos os metadados dentro do cabeçalho, tanto localmente (ou seja, para uma página específica) quanto globalmente.
Para fazer isso, vamos nos concentrar primeiro no favicon. Como o favicon será o mesmo em todo o aplicativo, vamos adicioná-lo a um head comum. Para isso, criaremos o arquivo _\_document.tsx_ dentro da pasta _pages_. Dentro dele, copiaremos a estrutura conforme indicado pela [documentação](https://nextjs.org/docs/advanced-features/custom-document), somente dentro da tag `<Head>` adicionaremos a tag correspondente para o favicon:

\__document.tsx_

```javascript
<Head>
  <link rel="shortcut icon" href="/logo.png" type="image/png" />
</Head>
```

Agora, vamos adicionar alguns metadados locais a cada uma das páginas. Primeiramente, faremos isso no arquivo _index.tsx_

```javascript
<Head>
  // Por enquanto podemos codificar esses valores, então vamos torná-lo dinâmico
  em //base para o idioma selecionado
  <title>ReceitApp</title>
  <meta name="description" content="Blog de receitas culinárias" />
</Head>
```

Fazemos o mesmo no arquivo _[id]_ dentro de _posts_

```javascript
<Head>
  <title>Detalhe da receita</title>
  <meta name="description" content="Aqui está o detalhe da receita." />
</Head>
```

### Passo 2: Imagens e estilos

Vamos adicionar a imagem da seção principal, que está localizada na pasta pública (chef.jpg). Para fazer isso, usaremos o componente `<Image>` fornecido por Next (se você quiser, pode primeiro tentar usar a tag `<img>` para ver como o linter marca o erro)
Para isso, dentro do arquivo _index.tsx_ adicionamos a imagem:

```javascript
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
//...
```

Agora, vamos adicionar o logotipo do aplicativo dentro do componente `<Layout>`

```javascript
{
  /* Ao clicar no logotipo voltamos sempre à página principal */
}
<Link href="/">
  <div className={styles.logo}>
    {/* Adicionamos o logotipo do aplicativo */}
    <Image
      src="/logo.png"
      alt="app-logo"
      width={50}
      height={50}
      layout="fixed"
    />
    <p className={styles.title}>ReceitApp</p>
  </div>
</Link>;
```

Também podemos aproveitar esse tempo para explorar os estilos encontrados dentro da pasta _styles_. Lá, encontraremos estilos globais que se aplicam a toda a aplicação (dentro do arquivo _globals.css_) e arquivos específicos para os componentes `<Home>` e `<Layout>`.

### Passo 3: Adicionamos o cabeçalho compartilhado (Layout)

Aqui vamos criar um Layout que será comum a todas as páginas, pois compartilharemos o cabeçalho entre todas elas.
Para fazer isso, usaremos o Layout Component encontrado na pasta _components_. No ponto de partida, esse componente é usado apenas na página principal, mas se navegarmos para uma página de receita ele desaparece (podemos mostrar isso aos alunos antes de fazer esta etapa). Para extraí-lo, precisaremos modificar o componente dentro de _\_app.tsx_ adicionando `<Layout>` como um wrapper:

```javascript
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Adicionamos o componente Layout para compartilhá-lo em qualquer página
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

Então é isso, podemos mostrar que agora o cabeçalho é sempre o mesmo, não importa se navegamos entre as páginas.

### Passo 4: Adicionando i18n

No ponto de partida, todos os textos estão no nível da página e em um único idioma. Mas o que buscamos é que nosso aplicativo suporte vários idiomas para que possamos expandir além da América Latina.
Para isso, vamos adicionar a possibilidade de "trocar" entre inglês e espanhol.
Dentro da pasta _locale_, temos dois arquivos que possuem as informações de nossas páginas em cada um desses idiomas. Devemos encontrar uma maneira de consumir um ou outro com base na seleção do usuário.

Primeiro, vamos adicionar a configuração necessária para o Next suportar i18n. Faremos isso dentro do arquivo _next.config.js_

```javascript
  i18n: {
    // Adicionamos a lista de idiomas que vamos suportar
    locales: ["en-US", "es-ES", "pt-BR"],
    // Escolhemos o valor padrão quando acessamos uma rota que não possui o valor de localidade definido
    defaultLocale: "pt-BR",
  },
```

Segundo, voltamos ao nosso componente `<Layout>` para adicionar os botões que nos permitirão alternar entre um idioma e outro.

```javascript
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import styles from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
import { localeNames, locales } from "../../locale/constants";

// Criamos um componente Layout para compartilhar o hader em todas as páginas
// do aplicativo
const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  // Buscamos as informações do idioma usando useRouter()
  const { locale, asPath } = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {/* Ao clicar no logotipo voltamos sempre à página principal */}
        <Link href="/">
          <div className={styles.logo}>
            {/* Adicionamos o logotipo do aplicativo */}
            <Image
              src="/logo.png"
              alt="app-logo"
              width={50}
              height={50}
              layout="fixed"
            />
            <p className={styles.title}>RecetApp</p>
          </div>
        </Link>
        {/* Adicionamos um switch para alternar o idioma */}
        <div className={styles.localeSwitch}>
          {/* Através do atributo locale indicamos ao Next qual idioma queremos usar ao fazer o
           redirecionamento
           */}
          <Link href={asPath} locale={locales.ES_ES}>
            <p className={locale === locales.ES_ES ? styles.active : ""}>
              <Image
                src="/spanish.png"
                alt="spanish"
                layout="fixed"
                width={20}
                height={20}
              />
              {localeNames[locales.ES_ES as keyof typeof localeNames]}
            </p>
          </Link>

          <Link href={asPath} locale={locales.PT_BR}>
            <p className={locale === locales.PT_BR ? styles.active : ""}>
              <Image
                src="/brazil.png"
                alt="usa"
                layout="fixed"
                width={20}
                height={20}
              />
              {localeNames[locales.PT_BR as keyof typeof localeNames]}
            </p>
          </Link>

          <Link href={asPath} locale={locales.EN_US}>
            <p className={locale === locales.EN_US ? styles.active : ""}>
              <Image
                src="/usa.png"
                alt="usa"
                layout="fixed"
                width={20}
                height={20}
              />
              {localeNames[locales.EN_US as keyof typeof localeNames]}
            </p>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
```

Após essa alteração, se clicarmos nos botões, veremos como o caminho muda na barra de navegação. No entanto, o texto na página permanece o mesmo. Para torná-lo dinâmico, temos que consumir as informações que estão dentro da pasta _locale_, dependendo do caso.

Vamos lidar com o arquivo _index.tsx_ primeiro. Até agora, os textos estão dentro dele. Precisamos buscá-los dinamicamente com base no idioma escolhido

```javascript
//...
import { useRouter } from "next/router";
import CONTENT_BY_LOCALE from "../locale";
import { defaultLocale } from "../locale/constants";
//...


  //Através do useRouter acessamos o idioma selecionado
  const { locale = defaultLocale } = useRouter();
  const localeContent =
    CONTENT_BY_LOCALE[locale as keyof typeof CONTENT_BY_LOCALE];

  // Extraímos as informações de acordo com o idioma selecionado
  const { appName, heroText, recipes, description } = localeContent.home;

  //...
```

Com esta informação podemos substituir o texto estático e veremos como a página muda quando modificamos o idioma selecionado.

Para finalizar, repetimos o processo dentro do arquivo _[id]_ localizado na pasta _posts_

```javascript
//...
import { useRouter } from "next/router";
import CONTENT_BY_LOCALE from "../../locale";

//...

  // Usando o hook useRouter podemos acessar o id da receita
  // que é dado pela url

  const { locale, query } = useRouter();
  const id = query.id;

  // Também obtemos as informações com base no idioma selecionado
  const localeContent =
    CONTENT_BY_LOCALE[locale as keyof typeof CONTENT_BY_LOCALE];

  // Extraímos as informações de acordo com o idioma selecionado
  const { title, description, content } = localeContent.recipePage;

  //...

```

Finalizado!
