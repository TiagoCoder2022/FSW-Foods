import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "../_lib/auth";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);
  //TODO: Pegar os restaurants com mais pedidod
  const restaurants = await db.restaurant.findMany({ take: 10 });

  const userFavoriteRestaurants = await db.userFavoriteRestaurants.findMany({
    where: { userId: session?.user?.id },
  });
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 lg:gap-6 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant: any) => (
        <RestaurantItem
          userFavoriteRestaurants={userFavoriteRestaurants}
          restaurant={restaurant}
          key={restaurant.id}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
