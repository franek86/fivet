import { useSelector } from "react-redux";

export default function Subscribe() {
  const userId = useSelector((state) => state.auth.user.id);
  const handleSubscribe = async (plan) => {
    const res = await fetch("http://localhost:5000/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, plan }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error creating checkout session");
      console.error(data);
    }
  };

  return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <h1>Test payments</h1>
      <button
        onClick={() => handleSubscribe("STANDARD")}
        style={{
          margin: "1rem",
          padding: "1rem 2rem",
          backgroundColor: "#635BFF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Subscribe STANDARD
      </button>

      <button
        onClick={() => handleSubscribe("PREMIUM")}
        style={{
          margin: "1rem",
          padding: "1rem 2rem",
          backgroundColor: "#ff5b5b",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Subscribe PREMIUM
      </button>
    </div>
  );
}
