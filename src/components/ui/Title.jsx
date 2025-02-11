import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: ${(props) => {
    switch (props.as) {
      case "h1":
        return "calc(3.2rem + 0.7vw)";
      case "h2":
        return "calc(2.8rem + 0.5vw)";
      case "h3":
        return "calc(2.4rem + 0.4vw)";
      case "h4":
        return "calc(2rem + 0.2vw)";
      case "h5":
        return "calc(1.6rem + 0.2vw)";
      case "h6":
        return "calc(1rem + 0.1vw)";
      default:
        return "calc(1rem + 0.2vw)";
    }
  }};
`;

function Title({ tag = "h1", children }) {
  return <StyledTitle as={tag}>{children}</StyledTitle>;
}

export default Title;
