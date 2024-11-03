"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Restaurant, UserFavoriteRestaurants } from "@prisma/client";
import { searchForRestaurants } from "@/app/restaurants/_actions/search";
import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurants[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;

      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header hasSearchbar={true} />

      <Separator className="hidden md:block" />

      <div className="lg:px-30 px-5 py-6 md:px-20">
        <div className="mb-6 inline-flex items-center  justify-center">
          <div className="hidden md:block">
            <Button
              className=" rounded-full 
            border border-solid border-muted-foreground bg-[#F4F4F4]  text-foreground shadow-sm"
              size="icon"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>
          </div>

          <h2 className="pl-0 text-lg font-semibold md:pl-4 ">
            Restaurantes Encontrados
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:flex lg:flex-row lg:flex-wrap lg:object-center">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
