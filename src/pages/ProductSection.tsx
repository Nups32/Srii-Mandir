import { Link } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  tag?: string;
};

type Props = {
  title: string;
  subtitle: string;
  products: Product[];
  link: string;
};

export function ProductSection({
  title,
  subtitle,
  products,
  link,
}: Props) {
  return (
    <div>
      {/* SECTION HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 mt-1">{subtitle}</p>
        </div>

        <Link
          to={link}
          className="text-sm font-medium text-orange-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5"
          >
            <div className="relative">
              {/* {product.tag && (
                <span className="absolute top-3 left-3 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              )} */}

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-contain rounded-xl"
              />
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-orange-700 font-semibold">
                {product.price}
              </p>

              <button className="w-full mt-3 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
