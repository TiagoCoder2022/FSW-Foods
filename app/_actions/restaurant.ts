"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const toggleFavoriteRestaurant = async (
  userId: string,
  restaurantId: string,
) => {
  const isFavorite = await db.userFavoriteRestaurants.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (isFavorite) {
    await db.userFavoriteRestaurants.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });

    revalidatePath("/");
    return;
  }

  await db.userFavoriteRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath("/");
};
