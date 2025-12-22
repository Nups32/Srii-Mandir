import ReviewBooking from "./ReviewBooking";
import AdditionalOffers from "./AdditionalOffers";
import BottomBar from "./BottomBar";
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import { createRazorpayOrder, verifyPayment } from "@/utils/API";
import { message } from "antd";
import { useLocation } from "react-router-dom";
import type { IRootState } from "@/store";
import { useSelector } from "react-redux";

export default function ChadhavaCart() {
  const { cart, addOrUpdateItem } = useCart();
  const [transactionId, setTransactionId] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const chadhavaId: string = location.state?.chadhavaId;
  const chadhavaSlug: string = location.state?.slug;
  const authData = useSelector((state: IRootState) => state.userConfig);
  console.log("Cart contents:", cart);

  const totalCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);
  // const orderItem = {
  //   chadhavaId,
  //   offering: Object.values(cart).map((item: any) => ({
  //     _id: item._id,
  //     qty: item.qty,
  //     price: item.price,
  //     name: item.name,
  //   })),
  // }

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

    const orderData = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      orderItem: {
        chadhavaId,
        offering: Object.values(cart).map((item: any) => ({
          _id: item._id,
          qty: item.qty,
          price: item.price,
          name: item.name,
        })),
      },
      // planId: plan._id,
      userId: authData?._id,
      totalMrp: totalAmount,
      // totalDiscount: 0,
      // address: authData?.userdata?.city,
      // pincode: authData?.userdata?.pincode,
      paymentMethod: "Razorpay",
      transactionId: transactionId,
      fullName: `${authData?.username}`,
      email: authData?.email,
      mobileNo: authData?.mobile,
    };

    try {
      const order = await createRazorpayOrder(orderData);
      const { id: order_id, currency, amount, point } = order;
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
            point,
            cartData: {
              chadhavaId,
              offering: Object.values(cart).map((item: any) => ({
                _id: item._id,
                qty: item.qty,
                price: item.price,
                name: item.name,
              })),
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
    <section className="min-h-screen bg-gray-50 pb-24 px-4">
      {/* <div className="max-w-3xl mx-auto space-y-6 pt-6"> */}
      <div className="max-w-7xl mx-auto pt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <ReviewBooking updateQty={updateQty} /> */}
        <div>
          <ReviewBooking cart={cart} updateQty={(_id, delta) => addOrUpdateItem({ ...cart[_id], _id }, delta)} />
        </div>
        {/* <BillDetails cart={cart} totalAmount={totalAmount} /> */}
        <div>
          {/* <AdditionalOffers onAdd={(offer) => addOffer(offer.id, offer)} /> */}
          <AdditionalOffers slug={chadhavaSlug} cart={cart} onAdd={(offer) => addOrUpdateItem({
            ...offer,
            qty: 0
          })} />
        </div>

        {/* <ReviewBooking cart={cart} updateQty={(id, delta) => addOrUpdateItem({ ...cart[id], id }, delta)} />
        <AdditionalOffers cart={cart} onAdd={(offer) => addOrUpdateItem({
          ...offer,
          qty: 0
        })} /> */}
      </div>
      {totalCount > 0 && <BottomBar handlePayment={handlePayment} count={totalCount} amount={totalAmount} />}
    </section>
  );
}
