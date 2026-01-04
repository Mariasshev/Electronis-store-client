import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

import BootstrapProvider from "../components/BootstrapProvider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = { title: "Cyber" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning>
      <AuthProvider>
        <BootstrapProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BootstrapProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
