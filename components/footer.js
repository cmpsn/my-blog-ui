import Link from 'next/link';
import { useContext } from 'react';
import { GlobalContext } from "../pages/_app";

const Footer = () => {

  // Get the site name (get from the global object fetched from CMS)
  const globalContext = useContext(GlobalContext);
  const siteName = globalContext.siteName;

  // Create an array of footer links to iterate over
  const footerlinks = [
    {id: "0", name: "Termeni și condiții", href: "/termeni-si-conditii"}, 
    {id: "2", name: "Cookies", href: "/politica-de-cookies"}, 
    {id: "1", name: "Confidențialitate", href: "/politica-de-confidentialitate"},
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <nav className="w-full pt-12 pb-6 bg-gray-200 dark:bg-gray-900">
        <ul className="flex flex-col md:flex-row place-items-center justify-center text-base lg:text-lg">
          {footerlinks.map((footerlink) => {
            return (
              <li key={footerlink.id} className="md:mx-10 my-2 text-primary-dark dark:text-primary-light">
                <Link href={footerlink.href} as={footerlink.href}>
                  <a className="hover:text-primary dark:hover:text-gray-100">
                    {footerlink.name}
                  </a>
                </Link>
            </li>
            );
          })}
        </ul>

        <div className="py-2 flex flex-row justify-center text-base lg:text-lg">
          <p className="text-primary-dark dark:text-primary-light">
            <span>&copy;{currentYear} </span>
            <Link href="/">
              <a className="hover:text-primary dark:hover:text-gray-100">
                {siteName}
              </a>
            </Link>
          </p>
        </div>
      </nav>

    </footer>
  );
};

export default Footer;