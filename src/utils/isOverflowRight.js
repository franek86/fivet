export function adjustDropdownAlignment(element, setAlignRight) {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const overflowsRight = rect.left + rect.width > window.innerWidth;
  const overflowsLeft = rect.left < 0;

  if (overflowsRight) {
    setAlignRight(true);
  } else if (overflowsLeft) {
    setAlignRight(false);
  }
}
