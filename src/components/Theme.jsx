import { useTheme } from "../hooks/useTheme.js";
import { Moon, Sun } from "lucide-react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
`;

const ThemeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Theme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Section>
      {theme !== "light" ? (
        <ThemeBox onClick={() => setTheme("light")}>
          <Sun />
          <p>Light theme</p>
        </ThemeBox>
      ) : (
        <ThemeBox onClick={() => setTheme("dark")}>
          <Moon />
          <span>Dark theme</span>
        </ThemeBox>
      )}
    </Section>
  );
};

export default Theme;
