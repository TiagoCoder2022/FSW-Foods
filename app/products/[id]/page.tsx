import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "../_components/product-image";
import ProductDetails from "../_components/product-details";
import Header from "@/app/_components/header";
import ProductList from "@/app/_components/product-list";
import { Separator } from "@/app/_components/ui/separator";

interface ProductPageProps {
  params: {
    id: string;
  };
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }
  return (
    <>
      <div className="hidden md:block ">
        <Header hasSearchbar={true} />
      </div>

      <Separator className="hidden md:block" />

      <div className="lg:container">
        <div className="flex flex-col gap-4 p-0 lg:container md:flex-row md:gap-10 md:p-5 md:px-10">
          <div className="w-full rounded-lg md:w-3/6 ">
            <ProductImage product={product} />
          </div>

          <div className="flex w-full flex-col rounded-lg border border-solid shadow-sm md:w-3/6 md:p-6">
            <div className="flex-grow">
              <ProductDetails
                product={product}
                complementaryProducts={juices}
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block md:px-5 lg:py-6">
          <h3 className="px-5 font-semibold lg:text-xl">Recomendados</h3>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
