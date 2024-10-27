"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data, status } = useSession();
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  return (
    <div className="flex items-center justify-between px-5 py-4 lg:container">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="FSW Foods"
          width={0}
          height={0}
          sizes="100%"
          className=" h-8 w-auto sm:h-10"
        />
      </Link>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent "
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {status === "authenticated" ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image as string | undefined} />
                    <AvatarFallback>
                      {data.user?.name?.split(" ")[0][0]}
                      {data.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <p className="block text-xs text-muted-foreground">
                      {data.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon size={20} />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/">
                <HomeIcon size={18} />
                <span className="block">Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={18} />
                    <span className="block">Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                >
                  <HeartIcon size={18} />
                  <span className="block">Restaurantes favoritos</span>
                </Button>
              </>
            )}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              onClick={handleSignOutClick}
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <LogOutIcon size={18} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
