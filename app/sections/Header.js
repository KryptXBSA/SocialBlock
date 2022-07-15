import Logo, { FixedLogo } from "../components/Logo";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";

const Header = () => {

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? 'dark' : 'dark';
    // const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (<><svg onClick={() => setTheme('light')} xmlns="http://www.w3.org/2000/svg" className=" cursor-pointer h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      </>
      )
    }

    else {
      return (
        <svg onClick={() => setTheme('dark')} xmlns="http://www.w3.org/2000/svg" className="h-8 cursor-pointer bg-transparent w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    }
  };

  return (
    <header className="h-15  dark:border-gray-700">
      <div className="container justify-between  py-4 flex  items-center">
        {/* Logo */}
        <div className="fixed">
          <FixedLogo />
        </div>
        <div className="invisible">
          <Logo />
        </div>
        <div className="  relative ">
          <div className=" -m-4  absolute">
            <div className="fixed">
              {/* {renderThemeChanger()} */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

