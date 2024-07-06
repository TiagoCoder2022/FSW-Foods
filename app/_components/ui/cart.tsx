import { CartContex } from "@/app/_context/cart";
import { useContext } from "react";
import CartItem from "../cart-item";
import { Card, CardContent } from "./card";
import { format } from "path";
import { formatCurrency } from "@/app/_helpers/price";
import { Separator } from "./separator";
import { Button } from "./button";

const Cart = () => {
  const {
    products,
    subtotalPrice,
    totalPrice,
    totalDiscounts,
    totalPriceWithDeliveryFee,
  } = useContext(CartContex);

  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="space-y-4 p-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotalPrice)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Descontos</span>
              <span>{formatCurrency(totalDiscounts)}</span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Entrega</span>
              <span>
                {Number(products[0]?.restaurant?.deliveryFee) === 0 ? (
                  <span className="uppercase text-primary">Grátis</span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </span>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Total</span>
              <span>{formatCurrency(totalPriceWithDeliveryFee)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-6 w-full">Finalizar pedido</Button>
    </div>
  );
};

export default Cart;
