import { Outlet } from "react-router";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  max-width: 40rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const FormSection = styled.section`
  flex: 1;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const WakupStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
  font-size: 3rem;
`;

function AuthLayout() {
  /*
   ** Test on Render. Only for testing mode, Backend must be on live server in this case on Render.
   ** Render free tier goes to sleep after inactivity, and the “cold start” can take a few minutes.
   ** Need to "wake up server"
   ** Remove on production or comment
   */
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch(`https://fivet.onrender.com/health`)
      .then(() => setIsReady(true))
      .catch(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <WakupStyle>Waking up server... ⏳</WakupStyle>;
  }

  return (
    <Wrap>
      <FormSection>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Outlet />
        </motion.div>
      </FormSection>
    </Wrap>
  );
}

export default AuthLayout;
