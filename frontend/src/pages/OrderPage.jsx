import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/orderApiSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "../components/Loader";

const OrderPage = () => {
  const { id: orderID } = useParams();

  const { userInfo } = useSelector((store) => store.userInfo);

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderID);

  const [payOrder, { isLoading: payLoading, error: payError }] =
    usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScirpt = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });

        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScirpt();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApproveTest = async () => {
    try {
      await payOrder({ orderID, details: { payer: {} } });
      refetch();
      toast.success("Payment Successfull");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderID, details });
        refetch();
        toast.success("Payment Successfull");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    });
  };

  const onError = async (error) => {
    toast.error(error?.data?.message);
  };

  const createOrder = async (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return (
    <div>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <p>{error?.data?.message}</p>
      ) : (
        <div className="container m-auto grid gap-5 p-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-xl lg:text-3xl font-bold mb-5">
              Order: {orderID}
            </h1>
            <div className="py-5 border border-b-gray-300 border-white">
              <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
              <p className="mb-5">
                <strong>Name: </strong>
                {userInfo.name}
              </p>
              <p className="mb-5">
                <strong>Email: </strong>
                {userInfo.email}
              </p>
              <p className="mb-5">
                <strong>Address: </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},
                {order.shippingAddress.postalcode},
                {order.shippingAddress.country}
              </p>
            </div>
            <div className="py-5 border border-b-gray-300 border-white">
              <h1 className="text-2xl font-semibold mb-4">Payment</h1>
              <p className="mb-4">
                <strong>Payment Method: </strong>
                {order.paymentMethod}
              </p>

              {order?.isPaid ? (
                <p className="bg-green-500 w-[300px] text-white p-4 rounded-md">
                  Paid
                </p>
              ) : (
                <p className="bg-red-500 w-[300px] text-white p-4 rounded-md">
                  Not Paid
                </p>
              )}
            </div>
            <div className="py-5">
              <h1 className="text-2xl font-semibold mb-4">Ordered Items</h1>
              <p className="mb-4">
                <strong>items: </strong>
              </p>
              {order.orderItems.map((item, index) => {
                return (
                  <div className="border border-gray-300 p-5" key={index}>
                    <div
                      className="w-full lg:w-[400px] grid grid-cols-4 mb-5"
                      key={index}
                    >
                      <div className="w-[50px] h-[50px]">
                        <img
                          src={item.img}
                          className="w-full h-full rounded-md"
                          alt=""
                        />
                      </div>
                      <div className="col-span-2">
                        <p className="w-full text-start text-lg text-gray-500">
                          {item.name}
                        </p>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border border-gray-300 h-[600px]">
            <div className="py-5 px-5 pb-10 border border-b-gray-400 border-white">
              <h1 className="text-3xl font-semibold">Order Summary</h1>
            </div>
            <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
              <div>
                <p>items</p>
              </div>
              <div>
                <p>${order.itemsPrice}</p>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
              <div>
                <p>Shipping</p>
              </div>
              <div>
                <p>${order.shippingPrice}</p>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
              <div>
                <p>Tax</p>
              </div>
              <div>
                <p>${order.taxPrice}</p>
              </div>
            </div>
            <div className="p-5 grid grid-cols-2 items-center border border-b-gray-400 border-white">
              <div>
                <p>Total</p>
              </div>
              <div>
                <p>${order.totalPrice}</p>
              </div>
            </div>

            {!order.isPaid && (
              <div>
                {isPending ? (
                  <Loader></Loader>
                ) : (
                  <div className="p-5">
                    <button
                      className="text-white bg-red-500 px-4 py-2 rounded-md mb-5"
                      onClick={onApproveTest}
                    >
                      Test Pay
                    </button>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>

                    {payLoading && <Loader></Loader>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
