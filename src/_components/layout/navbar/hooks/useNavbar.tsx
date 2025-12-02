import { useState } from "react";

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleMenu };
};
