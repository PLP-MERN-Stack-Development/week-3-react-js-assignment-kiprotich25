import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-700 px-4 py-2 flex items-center justify-between" >
   
        <p className="font-bold text-3xl"></p><ThemeToggle />
    
    </nav>
  );
}