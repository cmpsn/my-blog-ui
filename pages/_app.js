import App from 'next/app';

import { createContext, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

import { getGlobalData } from '../lib/api';
import '../styles/globals.css';

// Store Strapi Global object in Context
export const GlobalContext = createContext({});

// ---- Render my App ----
const MyApp = ({ Component, pageProps }) => {

  const { global } = pageProps;

  // Add lang attribute to html root element
  useEffect(() => {
    document.documentElement.lang = 'ro';
  }, []);

  return (
    <GlobalContext.Provider value={global}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

// getInitialProps() disables automatic static optimization for pages 
// that don't have getStaticProps().
MyApp.getInitialProps = async (ctx) => {

  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);

  // Fetch global site settings from Strapi
  const global = await getGlobalData();

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
