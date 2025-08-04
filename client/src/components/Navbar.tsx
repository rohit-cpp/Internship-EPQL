import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  Divide,
  Loader2,
  Menu,
  Moon,
  ShoppingCart,
  Sun,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const admin = true;
  const loading = false;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14 mx-20">
        <Link to="/">
          {" "}
          <h1 className="font-bold">EQPL</h1>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>

            {admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    Dashboard
                    <MenubarContent>
                      <Link to="/admin/resturant">
                        <MenubarItem>Resturant</MenubarItem>
                      </Link>

                      <Link to="/admin/resturant">
                        <MenubarItem>Menu</MenubarItem>
                      </Link>
                      <Link to="/admin/resturant">
                        <MenubarItem>Order</MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarTrigger>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Light</DropdownMenuItem>
                  <DropdownMenuItem>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Link to="/cart" className="relative cursor-pointer">
                <ShoppingCart />
              </Link>
            </div>
            <div>
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button>
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button>Logout</Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* Mobile responsive */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-6">
          <SheetTitle>EPQL</SheetTitle>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Light</DropdownMenuItem>
                <DropdownMenuItem>Dark</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetHeader>
        <Separator></Separator>
        <SheetDescription>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User /> Profile
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User /> Order
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
          >
            <User /> Cart
          </Link>
        </SheetDescription>
        <SheetFooter>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarFallback>cn</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">EPQL</h1>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Logout
            </Button>
          </div>

          <SheetClose></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
