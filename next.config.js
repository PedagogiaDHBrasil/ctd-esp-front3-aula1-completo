/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Adicionamos o domínio externo do qual traremos as imagens das receitas
  images: {
    domains: ["cdn7.kiwilimon.com"],
  },
  i18n: {
    // Adicionamos a lista de idiomas que vamos suportar
    locales: ["en-US", "es-ES", "pt-BR"],
    // Escolhemos o valor padrão quando acessamos uma rota que não possui o valor de localidade definido
    defaultLocale: "pt-BR",
  },
};

module.exports = nextConfig;
