import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header hasSearchbar={false} />

      <div className="px-5 pt-6 md:hidden">
        <Search isHomePage={false} />
      </div>

      <div className="hidden items-center overflow-hidden md:flex md:h-[21.25rem] md:bg-[#EA1D2C] md:py-2 lg:h-[25.25rem]">
        <div className="flex items-center lg:container md:w-full md:flex-col lg:flex-row lg:justify-between lg:gap-20 xl:gap-48 ">
          <div className="w-full flex-col justify-center md:w-2/4 md:max-w-[41.25rem]">
            <h1 className="text-5xl font-bold text-white ">Está com fome?</h1>
            <p className="py-6 text-lg text-white">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você.
            </p>

            <div className="md:rounded-md md:bg-white md:p-6">
              <Search isHomePage={true} />
            </div>
          </div>

          <div className="hidden rounded-full shadow-[-100px_100px_80px_rgba(0,0,0,0.3)] md:-mb-40 lg:block lg:h-[22rem] lg:w-[22rem] lg:self-end">
            <Image
              src={"/hero-banner.png"}
              alt="Foods"
              height={400}
              width={400}
              className=" hidden lg:block"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col gap-8 py-6 lg:container lg:gap-10">
        <div className="px-5 pt-6 lg:mt-2">
          <CategoryList />
        </div>

        <div className="px-5 pt-6 lg:hidden">
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold lg:text-xl">Pedidos recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="products/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1">
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas"
              className="hidden w-0 flex-1 lg:block"
            />
          </div>

          <div className="flex flex-1">
            <PromoBanner
              src="/promo-banner-02.png"
              alt="Apartir de R$19,90 em lanches"
              className="w-0 flex-1 px-5"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-5">
            <h2 className="font-semibold lg:text-xl">
              Restaurantes recomendados
            </h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
              asChild
            >
              <Link href="/restaurants/recommended">
                Ver todos
                <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default Home;
