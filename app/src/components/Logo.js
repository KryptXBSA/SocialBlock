import { LightningBoltIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
        <a className="my-2 flex items-center space-x-1 text-sky-500">
          {/* <LightningBoltIcon  className="h-8 w-8 flex-shrink-0 mr-3"/> */}
          <span className="font-bold text-3xl font-sans tracking-tight whitespace-nowrap">Social Block</span>
        </a>      
        </Link>
    )
}
export const FixedLogo = () => {
    return (
        <Link href="/">
        <a className="my-2  flex items-center space-x-1 text-sky-400 dark:text-sky-500">
          {/* <LightningBoltIcon  className="h-8 w-8 flex-shrink-0 mr-1"/> */}
          <span className="font-bold text-3xl font-mono whitespace-nowrap">SOCIAL<span className="ml-1">BLOCK</span></span>
        </a>      
        </Link>
    )
}
export default Logo;
