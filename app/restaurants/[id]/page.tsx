import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/ui/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import { Separator } from "@/app/_components/ui/separator";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const session = await getServerSession(authOptions);

  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <>
      <div className="hidden md:block ">
        <Header hasSearchbar={true} />
      </div>

      <Separator className="hidden md:block" />

      <div className="mt-0 pb-5 lg:container md:mt-7">
        <div className="flex flex-col gap-0 md:flex-row md:gap-6 md:px-5">
          <div className="md:w-1/2">
            <RestaurantImage
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          </div>

          <div className=" rounded-lg border border-solid shadow-sm md:w-1/2 md:py-6">
            <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
              <div>
                <div className="flex items-center gap-[0.375rem]">
                  <div className="relative h-8 w-8">
                    <Image
                      src={restaurant.imageUrl}
                      alt={restaurant.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <span className="text-xl font-semibold">
                    {restaurant.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>

            <div className="px-5">
              <DeliveryInfo restaurant={restaurant} />
            </div>

            <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
                >
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 px-5">
              <h3 className="font-semibold lg:text-lg">Sobre</h3>
              <p className="pb-5 text-xs text-muted-foreground md:pb-0 lg:text-sm">
                {`Descubra no ${restaurant.name} uma experiência gastronômica única em um ambiente acolhedor, 
              onde tradição e inovação se encontram para criar sabores inesquecíveis. 
              Com ingredientes frescos e uma equipe dedicada, proporcionamos momentos 
              especiais para cada cliente. Perfeito para encontros, celebrações ou 
              simplesmente para apreciar uma refeição de qualidade incomparável.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4" key={category.id}>
            <h2 className="px-5 font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
