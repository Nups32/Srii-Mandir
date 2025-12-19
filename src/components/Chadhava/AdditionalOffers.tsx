// import { chadhavaData } from "../../../details";

type Offer = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

type Props = {
  onAdd: (offer: Offer) => void;
};

export default function AdditionalOffers({ onAdd }: Props) {
  const offers = [
    {
      id: "1",
      name: "Tarpan with Milk, Black Sesame & Kush",
      price: 151,
      image: "/assets/offer1.png",
    },
    {
      id: "2",
      name: "Pitru Stotra Mantra Chanting",
      price: 201,
      image: "/assets/offer2.png",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Add more offering items</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white border rounded-xl p-4 flex gap-4"
          >
            <img
              src={offer.image}
              className="w-20 h-20 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h4 className="text-sm font-semibold">{offer.name}</h4>

              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-semibold">
                  ₹{offer.price}
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
