import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';


import Header from '../components/Header';
import Footer from '../components/Footer';
import BootstrapProvider from '../components/BootstrapProvider';

export const metadata = {
    title: 'Cyber',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <BootstrapProvider>
            <Header />
            <main>{children}</main>
            <Footer />
        </BootstrapProvider>
        </body>
        </html>
    );
}
