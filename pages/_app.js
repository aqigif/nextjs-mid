import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
import "../styles/globals.css";
import { useApollo } from "../libs/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>CodeClazz | Mengenal Dunia Coding Sejak Dini</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta
          name="title"
          content="CodeClazz | Mengenal Dunia Coding Sejak Dini"
        />
        <meta
          name="description"
          content="CodeClazz - Mengenal Dunia Coding Sejak Dini | Mulai belajar coding dan buat aplikasi pertamamu sekarang dengan kurikulum Teknologi Standar Internasional."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeclazz.com/" />
        <meta
          property="og:title"
          content="CodeClazz | Mengenal Dunia Coding Sejak Dini"
        />
        <meta
          property="og:description"
          content="CodeClazz - Mengenal Dunia Coding Sejak Dini | Mulai belajar coding dan buat aplikasi pertamamu sekarang dengan kurikulum Teknologi Standar Internasional."
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://codeclazz.com/" />
        <meta
          property="twitter:title"
          content="CodeClazz | Mengenal Dunia Coding Sejak Dini"
        />
        <meta
          property="twitter:description"
          content="CodeClazz - Mengenal Dunia Coding Sejak Dini | Mulai belajar coding dan buat aplikasi pertamamu sekarang dengan kurikulum Teknologi Standar Internasional."
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            maxSnack={3}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
