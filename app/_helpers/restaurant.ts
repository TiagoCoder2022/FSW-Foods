import { UserFavoriteRestaurants } from "@prisma/client";

export const isRestaurantFavorited = (
  restaurantId: string,
  userFavoriteRestaurants: UserFavoriteRestaurants[],
) => userFavoriteRestaurants?.some((fav) => fav.restaurantId === restaurantId);
