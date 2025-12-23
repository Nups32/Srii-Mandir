import { useEffect, useState } from "react";
import type { CartItem } from "./CartContext";
import { getChadhavaBySlug } from "@/utils/API";
import { message } from "antd";

type Offer = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

type Props = {
  slug: string;
  cart: Record<string, CartItem>;
  onAdd: (offer: Offer) => void;
};

export default function AdditionalOffers({ slug, cart, onAdd }: Props) {
  const cartIds = new Set(Object.keys(cart));

  const [chadhava, setChadhava] = useState<any>([]);

  const fetchProduct = async () => {
    // setLoading(true);
    try {
      if (slug) {
        const response = await getChadhavaBySlug(slug || "");
        if (response.data.status) {
          setChadhava(response.data.data);
        }
      }
    } catch (error) {
      message.error("Network error. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const availableOffers = chadhava?.offering?.filter((offer: any) => !cartIds.has(offer?._id))?.slice(0, 3);

  console.log("availableOffers", availableOffers)  
  // if (availableOffers.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Add more offering items</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {availableOffers?.map((offer: any) => (
          <div
            key={offer?._id}
            className="bg-white border rounded-xl p-4 flex gap-4"
          >
            {/* Image only if available */}
            {offer?.image && (
              <img
                src={`${import.meta.env.VITE_APP_Image_URL}/chadhava/${offer?.image}`}
                alt={offer?.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
            )}

            <div className="flex-1">
              <h4 className="text-sm font-semibold">{offer?.name}</h4>

              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-semibold">
                  ₹{offer?.price}
                </span>

                <button
                  onClick={() => onAdd(offer)}
                  className="border border-green-600 text-green-600 px-4 py-1 rounded-md text-sm hover:bg-green-50"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
