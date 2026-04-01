import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

const stripePromise = loadStripe("pk_test_51R8FfSFwNCmx1WSbZTu0keGb5i5i705GshbTySIXY82cbfHnCvpFqosX0aGYg66TcR1iPzWaYAYiE44wVYWzoszy00JoOXPT2l");

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("in");
  const [address, setAddress] = useState("");
  const [paymentRequest, setPaymentRequest] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const course = location.state?.course;

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "IN",
      currency: "inr",
      total: {
        label: "Total",
        amount: course.price * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe, course]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (paymentMethod === "card") {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod: pm } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: fullName,
          address: {
            country: country,
            line1: address,
          },
        },
      });

      if (error) {
        console.error(error);
        return;
      }

      const response = await fetch("http://localhost:8000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: course.price * 100,
          course: { id: "course-id", title: course.title },
          image : course.image,
          paymentMethod: "card",
        }),
      });

      const data = await response.json();
      console.log("Payment intent response:", data);

      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        console.error("Missing clientSecret in response");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: pm.id,
      });

      if (result.error) {
        console.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        navigate("/success");
      }
    } else if (paymentMethod === "googlepay" && paymentRequest) {
      const { error } = await stripe.confirmPayment(paymentRequest);
      if (error) {
        console.error(error.message);
      } else {
        console.log("Google Pay payment succeeded!");
        navigate("/success");
      }
    }
  };

  if (!course) return <div className="text-white text-center mt-20">No course selected.</div>;

  return (
    <>
      <Header />
      <div className="flex flex-col max-w-full mx-auto p-8 bg-zinc-900 shadow-xl text-white mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-10">
          {/* Course Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#FACC15] text-center">{course.title}</h1>
            <img src={course.image} alt="Course" className="w-full rounded-xl shadow-md" />
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-[#FACC15]">${course.price}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{course.description}</p>
          </div>

          {/* Payment Form */}
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Select Payment Method</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Choose Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border border-gray-600 rounded-md w-full p-3 bg-zinc-700 text-white"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="netbanking">Net Banking</option>
                <option value="googlepay">Google Pay</option>
              </select>
            </div>

            <form onSubmit={handleSubmit}>
              <h3 className="text-xl mb-4">Shipping Information</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-600 rounded-md w-full p-3 bg-zinc-700 text-white"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Country</label>
                <input
                  type="text"
                  value={country}
                  readOnly
                  className="border border-gray-600 rounded-md w-full p-3 bg-zinc-700 text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-600 rounded-md w-full p-3 bg-zinc-700 text-white"
                  placeholder="Enter your address"
                  required
                />
              </div>

              {/* Conditional rendering of payment details */}
              {paymentMethod === "card" && (
                <>
                  <h3 className="text-xl mb-4">Pay with Card</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Card Information
                    </label>
                    <CardElement
                      className="border border-gray-600 rounded-md w-full p-3 bg-zinc-700 text-white"
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            color: "#fff",
                            fontSize: "16px",
                            "::placeholder": { color: "#aab7c4" },
                          },
                          invalid: { color: "#ff6b6b" },
                        },
                      }}
                    />
                  </div>
                </>
              )}

              {paymentMethod === "netbanking" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Select Your Bank
                  </label>
                  <select
                    className="border border-gray-600 rounded-md w-full p-3 bg-zinc-700 text-white"
                    required
                  >
                    <option value="">Select a bank</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === "googlepay" && paymentRequest && (
                <div className="mb-4">
                  <PaymentRequestButtonElement options={{ paymentRequest }} />
                </div>
              )}

              <div className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" id="billingSameAsShipping" />
                <label htmlFor="billingSameAsShipping" className="text-sm text-gray-300">
                  Billing info is the same as shipping
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4F46E5] text-white font-bold py-3 rounded-lg hover:bg-[#3B37C9] transition-all"
              >
                Pay
              </button>
            </form>
          </div>
        </div>
        <footer className="mt-8 text-center text-sm text-gray-400">
          Powered by Stripe | Terms | Privacy
        </footer>
      </div>
    </>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default CheckoutPage;
