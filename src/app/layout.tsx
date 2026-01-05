import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import BootstrapProvider from "../components/BootstrapProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata = { title: "Cyber" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning>
      <AuthProvider>
          <WishlistProvider>
            <BootstrapProvider>
              <Header />
              <main>{children}</main>
                <Toaster position="bottom-right" reverseOrder={false} />
              <Footer />
            </BootstrapProvider>
          </WishlistProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
