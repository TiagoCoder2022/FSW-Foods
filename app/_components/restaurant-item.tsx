"use client";
import { Restaurant, UserFavoriteRestaurants } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { useSession } from "next-auth/react";
import { isRestaurantFavorited } from "../_helpers/restaurant";
import useToggleFavoriteRestaurant from "../_hooks/use-toggle-favorite-restaurant";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
  userId?: string;
  userFavoriteRestaurants: UserFavoriteRestaurants[];
}
const RestaurantItem = ({
  restaurant,
  className,
  userFavoriteRestaurants,
}: RestaurantItemProps) => {
  const { data } = useSession();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  return (
    <div
      className={cn(
        "min-w-[266px] max-w-[266px] lg:min-w-[381px] lg:max-w-[381px]",
        className,
      )}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full lg:h-[165px]">
          <Link href={`/restaurants/${restaurant.id}`}>
            <Image
              src={restaurant.imageUrl}
              fill
              sizes="100%"
              className="rounded-lg object-cover"
              alt={restaurant.name}
            />

            <div className="absolute left-2 top-2 flex gap-[2px] rounded-full bg-white px-2 py-[2px]">
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold">5.0</span>
            </div>
          </Link>

          {data?.user.id && (
            <Button
              size="icon"
              className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
              onClick={handleFavoriteClick}
            >
              <HeartIcon size={16} className="fill-white" />
            </Button>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold lg:text-base">
            {restaurant.name}
          </h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground lg:text-sm">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground lg:text-sm">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
