import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Car, Sun, Moon, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Buy a car", href: "/cars" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };
  return <header
    className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      {
        "bg-background/80 backdrop-blur-md shadow-md": scrolled,
        "bg-transparent": !scrolled && location.pathname === "/",
        "bg-background": !scrolled && location.pathname !== "/"
      }
    )}
  ><div className="container mx-auto px-4 py-4"><div className="flex items-center justify-between"><Link
    to="/"
    className="flex items-center gap-2 text-2xl font-black"
    onClick={closeMenu}
  ><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20"><Car className="h-6 w-6" /></span><span className="text-slate-950 dark:text-white">
              AutoVista
            </span></Link>{
    /* Desktop Navigation */
  }<nav className="hidden md:flex items-center space-x-1">{navItems.map((item) => <Link
    key={item.href}
    to={item.href}
    className={cn(
      "px-4 py-2 rounded-md text-sm font-medium transition-colors",
      location.pathname === item.href ? "text-blue-700 dark:text-blue-400" : "text-foreground/80 hover:text-blue-700 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
    )}
  >{item.label}</Link>)}{
    /* Auth Section */
  }<div className="flex items-center gap-2 ml-4">{user ? <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="relative h-8 w-8 rounded-full"><Avatar className="h-8 w-8"><AvatarImage src={user.avatar} alt={user.name} /><AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback></Avatar></Button></DropdownMenuTrigger><DropdownMenuContent className="w-56" align="end" forceMount><DropdownMenuLabel className="font-normal"><div className="flex flex-col space-y-1"><p className="text-sm font-medium leading-none">{user.name}</p><p className="text-xs leading-none text-muted-foreground">{user.email}</p></div></DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem onClick={() => navigate("/auth/profile")}><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem><DropdownMenuItem onClick={() => navigate("/settings")}><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" /><span>Sign out</span></DropdownMenuItem></DropdownMenuContent></DropdownMenu> : <div className="flex items-center gap-2"><Button variant="ghost" asChild><Link to="/auth/signin">Sign In</Link></Button><Button className="bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700" asChild><Link to="/auth/signup">Sign Up</Link></Button></div>}<Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="ml-2"
  >{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}<span className="sr-only">Toggle theme</span></Button></div></nav>{
    /* Mobile Menu Button */
  }<div className="flex items-center md:hidden"><Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="mr-2"
  >{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}<span className="sr-only">Toggle theme</span></Button><Button
    variant="ghost"
    size="icon"
    onClick={toggleMenu}
    className="text-foreground"
  >{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}<span className="sr-only">Toggle menu</span></Button></div></div></div>{
    /* Mobile Navigation */
  }{isMenuOpen && <nav className="md:hidden bg-background py-4 px-4 shadow-lg"><div className="flex flex-col space-y-3">{navItems.map((item) => <Link
    key={item.href}
    to={item.href}
    className={cn(
      "px-4 py-3 rounded-md text-base font-medium transition-colors",
      location.pathname === item.href ? "text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50" : "text-foreground/80 hover:text-blue-700 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
    )}
    onClick={closeMenu}
  >{item.label}</Link>)}{user ? <div className="pt-3 border-t border-border"><div className="flex items-center gap-3 px-4 py-2"><Avatar className="h-8 w-8"><AvatarImage src={user.avatar} alt={user.name} /><AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback></Avatar><div><p className="text-sm font-medium">{user.name}</p><p className="text-xs text-muted-foreground">{user.email}</p></div></div><Link
    to="/auth/profile"
    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground/80 hover:text-blue-700 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-950/50 rounded-md"
    onClick={closeMenu}
  ><User className="h-5 w-5" />
                  Profile
                </Link><button
    onClick={() => {
      handleSignOut();
      closeMenu();
    }}
    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-foreground/80 hover:text-red-700 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950/50 rounded-md w-full text-left"
  ><LogOut className="h-5 w-5" />
                  Sign out
                </button></div> : <div className="pt-3 border-t border-border space-y-2"><Button variant="ghost" className="w-full justify-start" asChild onClick={closeMenu}><Link to="/auth/signin">Sign In</Link></Button><Button className="w-full bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700" asChild onClick={closeMenu}><Link to="/auth/signup">Sign Up</Link></Button></div>}</div></nav>}</header>;
}
export {
  Header as default
};
