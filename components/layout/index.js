import Header from "../../modules/header";
import Footer from "../../modules/footer";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full">
      {router.pathname.split("/")[1] !== "login" &&
        router.pathname.split("/")[1] !== "register" && <Header />}
      <main className="flex flex-col flex-grow pt-5 pb-20 sm:pb-15 px-5 sm:px-10 md:px-12 lg:px-14 text-font-color-dark">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
