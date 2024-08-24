import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { I18nextProvider } from "react-i18next";
// import i18n from "../i18n";
import { ErrorBoundary } from "../providers/errorBoundary";
import ErrorFallback from "../components/Error";

const App = ({ Component, pageProps }: AppProps) => {
  const AnyComponent = Component as any;

  return (
    <SessionProvider session={pageProps.session}>
      {/* <I18nextProvider i18n={i18n}> */}
      <ErrorBoundary fallback={<ErrorFallback />}>
        <AnyComponent {...pageProps} />
      </ErrorBoundary>
      {/* </I18nextProvider> */}
    </SessionProvider>
  );
};

export default App;
