import type { IRootState } from "@/store";
import { createRazorpayOrder } from "@/utils/API";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Address = {
  pincode: string;
  city: string;
  state: string;
  house: string;
  road: string;
  landmark: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: {
    billData: any;
    members: string[];
    gotra: string;
    whatsapp: string;
    callingNumber: string;
    address?: Address | null;
  };
};

export default function ConfirmDetailsModal({
  open,
  onClose,
  onConfirm,
  data,
}: Props) {
  if (!open) return null;

  const {
    billData,
    members,
    gotra,
    whatsapp,
    callingNumber,
    address,
  } = data;
  const offringItems = Object.values(billData?.cartDate).map((item: any) => ({
    _id: item._id || item.id,
    qty: item.qty,
    price: item.price,
    name: item.name,
  }));
  const totalAmount = ((offringItems.reduce((sum: number, item: any) => sum + item.qty * item.price, 0) || 0) + (billData?.package.price || 0));
  const [transactionId, setTransactionId] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const authData = useSelector((state: IRootState) => state.userConfig);

  // const formData = {
  //   whatsappNumber: whatsapp,
  //   callingNumber: callingNumber ? callingNumber : whatsapp,
  //   members: members,
  //   gotra: gotra,
  //   address: address,
  // }

  // const orderData = {
  //   // ...paymentData,
  //   poojaId: paymentData?.poojaId,
  //   package: {
  //     packageId: paymentData?.package?.packageId,
  //     person: paymentData?.package?.person,
  //     price: paymentData?.package?.price,
  //   },
  //   offring: offringItems,
  //   amount: totalAmount,
  //   formData: {
  //     whatsappNumber: whatsapp,
  //     callingNumber: callingNumber ? callingNumber : whatsapp,
  //     members: members,
  //     gotra: gotra,
  //     address: address,
  //   },
  // };
  // console.log("orderData", orderData);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!(window as any).Razorpay) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // const plan = allPlans.find((p: any) => p._id == selected);

    // const orderData = {
    //   amount: totalAmount * 100,
    //   currency: "INR",
    //   receipt: `receipt_${Date.now()}`,
    //   orderItem: {
    //     chadhavaId,
    //     offering: Object.values(cart).map((item: any) => ({
    //       _id: item._id,
    //       qty: item.qty,
    //       price: item.price,
    //       name: item.name,
    //     })),
    //   },
    //   // planId: plan._id,
    //   userId: authData?._id,
    //   totalMrp: totalAmount,
    //   // totalDiscount: 0,
    //   // address: authData?.userdata?.city,
    //   // pincode: authData?.userdata?.pincode,
    //   paymentMethod: "Razorpay",
    //   transactionId: transactionId,
    //   fullName: `${authData?.username}`,
    //   email: authData?.email,
    //   mobileNo: authData?.mobile,
    // };
    const orderData = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      userId: authData?._id,
      totalMrp: totalAmount,
      paymentMethod: "Razorpay",
      transactionId: transactionId,
      fullName: `${authData?.username}`,
      email: authData?.email,
      mobileNo: authData?.mobile,
      orderItem: {
        poojaId: billData?.poojaId,
        package: {
          packageId: billData?.package?.packageId,
          person: billData?.package?.person,
          price: billData?.package?.price,
        },
        offring: offringItems,
        formData: {
          whatsappNumber: whatsapp,
          callingNumber: callingNumber ? callingNumber : whatsapp,
          members: members,
          gotra: gotra,
          address: address,
        }
      }
    };

    try {
      const order = await createRazorpayOrder(orderData);
      const { id: order_id, currency, amount } = order;
      const options = {
        key: import.meta.env.VITE_APP_RAZOR_PAY_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Srii Mandir",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response: any) {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount,
            cartData: {
              poojaId: billData?.poojaId,
              package: {
                packageId: billData?.package?.packageId,
                person: billData?.package?.person,
                price: billData?.package?.price,
              },
              offring: offringItems,
              formData: {
                whatsappNumber: whatsapp,
                callingNumber: callingNumber ? callingNumber : whatsapp,
                members: members,
                gotra: gotra,
                address: address,
              }
            },
          };

          try {
            const verifyResult = await verifyPayment(paymentData);
            if (verifyResult === "OK") {
              setTransactionId(response.razorpay_payment_id);
              try {
                // refreshAuthData();
                // toast("success").fire({
                //   icon: "success",
                //   title: "Payment Successfull",
                //   timer: 2000,
                //   showConfirmButton: false,
                // });
                message.success("Payment Successful");
                setIsModalVisible(true);
              } catch (error: any) {
                // toast("danger").fire({
                //   icon: "error",
                //   title:
                //     "An error occurred while processing your payment. Please try again.",
                //   timer: 2000,
                //   showConfirmButton: false,
                // });
                message.error("An error occurred while processing your payment. Please try again.");
              }
            } else {
              // toast("danger").fire({
              //   icon: "error",
              //   title: "Payment verification failed. Please try again.",
              //   timer: 2000,
              //   showConfirmButton: false,
              // });
              message.error("Payment verification failed. Please try again.");
            }
          } catch (error) {
            // toast("danger").fire({
            //   icon: "error",
            //   title: "Error verifying payment. Please try again.",
            //   timer: 2000,
            //   showConfirmButton: false,
            // });
            message.error("Error verifying payment. Please try again.");
          }
        },
        // prefill: {
        //   name: `${authData?.userdata?.firstName} ${authData?.userdata?.lastName}`,
        //   email: authData?.userdata?.email,
        //   contact: authData?.userdata?.phone,
        // },
        theme: {
          color: "#29c261",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      // throw error;
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Please confirm your details
          </h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        {/* Members */}
        <div className="mb-4">
          <h3 className="font-semibold">
            Members participating in the puja
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            Panditji will take these names along with gotra during the puja.
          </p>

          <ol className="list-decimal pl-5 space-y-1">
            {members.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ol>
        </div>

        <hr className="my-3" />

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Gotra</span>
            <span className="font-medium">{gotra}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Phone Number</span>
            <span className="font-medium">{callingNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">WhatsApp Number</span>
            <span className="font-medium">{whatsapp}</span>
          </div>
        </div>

        {/* Address */}
        {address && (
          <>
            <hr className="my-3" />
            <div>
              <h3 className="font-semibold mb-1">
                Address for Aashirwad Box delivery
              </h3>
              <p className="text-sm text-gray-700">
                {address.house}, {address.road}, {address.landmark},{" "}
                {address.city}, {address.state} – {address.pincode}
              </p>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-green-600 text-green-600 rounded-lg py-2 font-medium cursor-pointer hover:bg-green-50"
          >
            Edit Info
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-green-600 text-white! rounded-lg py-2 font-medium hover:bg-green-700  cursor-pointer"
          >
            Submit & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
