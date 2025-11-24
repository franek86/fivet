import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "./ui/Button.jsx";
import PremiumSticker from "./ui/PremiumSticker.jsx";

const cardData = [
  {
    title: "Starter plan",
    subTitle: "Perfect for starter, small business and personal use.",
    content: {
      price: 2.99,
      currency: "€",
      description: "Description here",
    },
    subscription: "STARTER",
  },

  {
    title: "Premium plan",
    subTitle: "Perfect for medium business and corparations.",
    content: {
      price: 14.99,
      currency: "€",
      description: "Description here",
    },
    subscription: "PREMIUM",
  },
];

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const CardHeader = styled.header`
  width: 100%;
  position: relative;
  padding: 3rem 2.2rem;
  background-color: ${({ $disabled }) => ($disabled ? "var(--color-grey-200)" : "var(--color-brand-500)")};
  color: var(--color-grey-0);
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
`;

const CurrentSticker = styled.span`
  font-size: 1rem;
  position: absolute;
  top: -1rem;
  right: 0;
  background-color: var(--color-grey-700);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-lg);
  text-transform: uppercase;
`;

const CardTitle = styled.h2`
  color: var(--color-brand-100);
  margin-bottom: 1.2rem;
`;

const CardPrice = styled.h4`
  font-size: 3rem;
  font-weight: 600;
  padding-top: 1.8rem;
`;

const CardContent = styled.div`
  padding: 2.8rem;
`;

const Card = styled.div`
  opacity: ${({ $disabled }) => ($disabled ? "0.6" : "1")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  background-color: var(--color-grey-0);
  border-end-start-radius: var(--border-radius-md);
  border-end-end-radius: var(--border-radius-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: var(--shadow-md);
  padding-bottom: 3rem;
`;

export default function BillingCard({ planUrlParam }) {
  const userId = useSelector((state) => state.auth?.user?.id);
  const userSubscription = useSelector((state) => state.auth?.subscription);

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

  const displayPlans = planUrlParam ? cardData.filter((plan) => plan.subscription === planUrlParam) : cardData;

  console.log(displayPlans);
  return (
    <Wrapper>
      {displayPlans?.map((d) => {
        const isCurrent = userSubscription === d.subscription;
        const shouldDisable = !planUrlParam && isCurrent;

        return (
          <Card key={d.subscription} $disabled={shouldDisable}>
            <CardHeader>
              {isCurrent && <CurrentSticker>Current plan</CurrentSticker>}
              {d.subscription === "PREMIUM" && userSubscription !== "PREMIUM" && <PremiumSticker text='Upgrade now' />}
              <CardTitle>{d.title}</CardTitle>
              <p>{d.subTitle}</p>
              <CardPrice>
                {d.content.price} {d.content.currency}
              </CardPrice>
            </CardHeader>
            <CardContent>{d.content.description}</CardContent>
            <Button $size='medium' onClick={() => handleSubscribe(`${d.subscription}`)}>
              {d.subscription} Plan - {planUrlParam}
            </Button>
          </Card>
        );
      })}
    </Wrapper>
  );
}
