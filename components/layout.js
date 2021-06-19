import dynamic from 'next/dynamic';
const Navbar = dynamic(
  () => import('./navbar')
);
const Footer = dynamic(
  () => import('./footer')
);

const Layout = ({ children, categories }) => {
  return (
    <div className="bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300">

      <header className="md:sticky top-0 z-50">
        <Navbar categories={categories} />
      </header>

      {children}

      <Footer />

    </div>
  );
};

export default Layout;