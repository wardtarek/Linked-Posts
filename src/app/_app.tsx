// _app.tsx
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

// Dynamically import the Layout component with SSR disabled
const Layout = dynamic(() => import("@/app/layout"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
