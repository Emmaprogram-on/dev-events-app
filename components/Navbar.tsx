import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
const Navbar = () => {
  return (
   <header>
          <nav>
              <div className="flex flex-row items-center gap-8">
                <Link href="/" className="logo">
                  <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                  <p>DevEvents</p>
              </Link>
              <SearchBar />
              </div>
              
              <ul>
                  <Link href="/">Home</Link>
                  <Link href="/events">Events</Link>
                  <Link href="/">Create Events</Link>
                  </ul>
         </nav>
   </header>
  )
}

export default Navbar
