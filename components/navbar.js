import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(
  () => import('./theme-switch'),
  { ssr: false }
);

import { GlobalContext } from "../pages/_app";

// Navbar component
const Navbar = ({ categories }) => {

  // Get site name (get from the global object fetched from CMS)
  const globalContext = useContext(GlobalContext);
  const siteName = globalContext.siteName;

  // Create an array of custom navlinks to iterate over
  const customNavlinks = [
    {id: "0", name: "Despre blog", href: "/despre-blog"},
  ];

  // ===== Handle Menu Hamburger Button =====
  // Set state for menu button.
  const [menuButtonOpen, setMenuButtonOpen] = useState(false);

  // Create a handler for menu button state.
  const handleMenuButtonOnClick = useCallback(() => {
    setMenuButtonOpen((currentState) => !currentState), [];
  });

  // ----- Collapse Navbar when click outside menu button.
  // Create the reference object for clicking outside.
  const menuButton = useRef(null);

  // Handle the click outside events.
  const outsideMenuButtonClick = (ref) => {
    
    // React hook to add event listener
    useEffect(() => {

      // Changing menu button state to false when clicking outside event happens.
      const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setMenuButtonOpen(false);
        }
      };

      // Add event listener.
      document.addEventListener("click", handleOutsideClick);

      // Clean up the event listener
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };

    }, [ref]);
  };

  // Call the "click outside" function. -----
  outsideMenuButtonClick(menuButton);
  
  // Render navbar
  return (
    <nav className="flex flex-wrap items-center justify-between py-3 px-8 md:px-12 xl:px-40 2xl:px-56 bg-gray-200 dark:bg-gray-900">

      <Link href="/">
        <a className="mx-4 text-lg lg:text-xl text-primary-dark hover:text-primary dark:text-primary-light dark:hover:text-gray-100 tracking-wide">
            {siteName}
        </a>
      </Link>

      <button 
        id="menu-toggler" 
        aria-label="meniu hamburger"
        className="xl:hidden inline-flex rounded outline-none focus:outline-none text-primary-dark hover:bg-primary hover:text-white dark:text-primary-light dark:hover:text-primary dark:hover:bg-gray-100" 
        onClick={handleMenuButtonOnClick} 
        ref={menuButton}
      >
        <svg 
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='https://www.w3.org/2000/svg'
        >
          <path 
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>
      </button>

      <div className={`${menuButtonOpen ? '' : 'hidden'} w-full xl:flex xl:flex-row xl:max-w-xl xl:self-end`}>
      
        <ul className="flex flex-col xl:flex xl:flex-row my-2">
          
          {categories.map((category) => {
            return (
              <li key={`category__${category.slug}`} className="px-4 py-3 xl:py-1 text-lg lg:text-xl text-primary-dark dark:text-primary-light">
                <Link href="/categorie/[slug]" as={`/categorie/${category.slug}`}>
                  <a className="pb-1 border-b-2 border-transparent hover:border-primary dark:hover:border-gray-100 hover:text-primary dark:hover:text-gray-100">
                    {category.name}
                  </a>
                </Link>
              </li>
            );
          })}

          {customNavlinks.map((navlink) => {
            return (
              <li key={navlink.id} className="px-4 py-3 xl:py-1 text-lg lg:text-xl text-primary-dark dark:text-primary-light">
                <Link href={navlink.href} as={navlink.href}>
                  <a className="pb-1 border-b-2 border-transparent hover:border-primary dark:hover:border-gray-100 hover:text-primary dark:hover:text-gray-100">
                    {navlink.name}
                  </a>
                </Link>
              </li>
            );
          })}

          <li className="pl-4 pt-3 xl:pt-2 pb-1">
            <ThemeSwitch />
          </li>
          
        </ul>

      </div>

    </nav>
  );
};

export default Navbar;
