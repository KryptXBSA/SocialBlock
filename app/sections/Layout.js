import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({ children}) => {
  return (
    <>
      <Head>
        <title>Social Block</title>
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <div className="min-h-screen mx-auto  max-w-6xl  top-0 z-50 flex flex-col">
        <Header />
          {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
