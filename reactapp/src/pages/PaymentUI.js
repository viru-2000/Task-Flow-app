import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentUI = () => {
  const navigate = useNavigate();
  const amount = 50000; // Amount in paisa (500 INR)
  const currency = "INR";
  const receiptId = "order_receipt_1";

  const paymentHandler = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency, receipt: receiptId }),
    });

    const order = await response.json();
    console.log(order);

    const options = {
      key: "rzp_test_BeE2yGNZvmgpZ0", // Replace with your Razorpay key
      amount,
      currency,
      name: "TaskFlow App",
      description: "Booking Payment",
      order_id: order.id,
      handler: async function (response) {
        console.log("Payment successful", response);

        const validateResponse = await fetch(
          "http://localhost:5000/order/validate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const validateData = await validateResponse.json();
        console.log(validateData);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
      },
      theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <button className="pay-btn" onClick={paymentHandler}>
        Pay Now
      </button>
      <button className="back-btn" onClick={() => navigate("/userhome")}>
        Back to Home
      </button>
    </div>
  );
};

export default PaymentUI;