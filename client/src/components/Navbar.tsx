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
import { Loader2, Menu, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const { user, loading, logout } = useUserStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14 mx-20">
        <Link to="/">
          {" "}
          <h1 className="font-bold">EQPL</h1>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {user?.admin ? (
            <div className="flex items-center gap-20">
              <div className="space-x-6">
                <Link to="/">Home</Link>
                <Link to="/admin/upload-data">Upload</Link>
                <Link to="/admin/managepoi">ManagePOI</Link>
              </div>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    AdminMenu
                    <MenubarContent>
                      <Link to="/admin/dashboard">
                        <MenubarItem>Dashboard</MenubarItem>
                      </Link>
                      <Link to="/admin/data">
                        <MenubarItem>Data</MenubarItem>
                      </Link>
                      <Link to="/admin/logs">
                        <MenubarItem>Logs</MenubarItem>
                      </Link>
                      {/* <Link to="/admin/managepoi">
                        <MenubarItem>ManagePOI</MenubarItem>
                      </Link>
                      <Link to="/admin/upload-data">
                        <MenubarItem>Upload</MenubarItem>
                      </Link> */}
                    </MenubarContent>
                  </MenubarTrigger>
                </MenubarMenu>
              </Menubar>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-20 ">
                <div className="space-x-6">
                  <Link to="/">Home</Link>
                  <Link to="/searchpoi">SearchPOI</Link>
                  <Link to="/decrypt">Decrypt</Link>
                </div>
                {/* <Link to="/history">History</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/dashboard">Dashboard</Link> */}
                <div>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>
                        UserMenu
                        <MenubarContent>
                          <Link to="/history">
                            <MenubarItem>History</MenubarItem>
                          </Link>
                          <Link to="/profile">
                            <MenubarItem>Profile</MenubarItem>
                          </Link>
                          <Link to="/dashboard">
                            <MenubarItem>Dashboard</MenubarItem>
                          </Link>
                        </MenubarContent>
                      </MenubarTrigger>
                    </MenubarMenu>
                  </Menubar>
                </div>
              </div>
            </div>
          )}

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
                <Button onClick={logout}>Logout</Button>
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
import { useUserStore } from "@/store/useUserStore";
const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
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

        {user?.admin ? (
          <>
            <Link
              to="/"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User /> Home
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User /> Dashboard
            </Link>
            <Link
              to="/admin/data"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User /> Data
            </Link>
            <Link
              to="/admin/logs"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User /> Logs
            </Link>
            <Link
              to="/admin/managepoi"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User /> ManagePOI
            </Link>
            <Link
              to="/admin/upload-data"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User /> Upload
            </Link>
          </>
        ) : (
          <SheetDescription>
            <Link
              to="/"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              Home
            </Link>
            <Link
              to="/searchpoi"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              SearchPOI
            </Link>
            <Link
              to="/decrypt"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              Decrypt
            </Link>

            <Link
              to="/history"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              History
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              Profile
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              Dashboard
            </Link>
          </SheetDescription>
        )}

        <SheetFooter>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarFallback>cn</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">EPQL</h1>
          </div>

          <div>
            {loading ? (
              <Button>
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button onClick={logout}>Logout</Button>
            )}
          </div>

          <SheetClose></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
