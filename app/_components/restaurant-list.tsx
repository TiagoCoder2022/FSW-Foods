import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  //TODO: Pegar os restaurants com mais pedidod
  const restaurants = await db.restaurant.findMany({ take: 10 });
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 lg:gap-6 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant: any) => (
        <RestaurantItem restaurant={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RestaurantList;
