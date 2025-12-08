import { Outlet } from "react-router";
import { motion } from "framer-motion";
import styled from "styled-components";

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

function AuthLayout() {
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
