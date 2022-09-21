import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import styles from "../../styles/Layout.module.css";
import { useRouter } from "next/router";
import { localeNames, locales } from "../../locale/constants";

// Este Layout pode ser usado para compartilhar o hader em todas as páginas
// do aplicativo
const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  // Devemos buscar as informações do idioma usando useRouter()
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
