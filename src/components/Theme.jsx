import { useTheme } from "../hooks/useTheme.js";
import { Moon, Sun } from "lucide-react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
`;

const ThemeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  p {
    font-size: 1.4rem;
  }
`;

const Theme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Section>
      {theme !== "light" ? (
        <ThemeBox onClick={() => setTheme("light")}>
          <Sun size={18} />
          <p>Light theme</p>
        </ThemeBox>
      ) : (
        <ThemeBox onClick={() => setTheme("dark")}>
          <Moon size={18} />
          <p>Dark theme</p>
        </ThemeBox>
      )}
    </Section>
  );
};

export default Theme;
