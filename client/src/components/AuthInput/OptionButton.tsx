import React from 'react';
import { twMerge } from "tailwind-merge";

// 📝 Define the interface for OptionButton props
interface OptionButtonProps {
  optionName: 'phone' | 'email'; // Strictly limit possible option names
  currentOption: 'phone' | 'email';
  onSelect: (newOption: 'phone' | 'email') => void; // Strictly type the handler
  baseClasses: string;
  bgClasses: { active: string; inactive: string };
  children: React.ReactNode; // Type for the icon component
}

const OptionButton: React.FC<OptionButtonProps> = ({
  optionName,
  currentOption,
  onSelect,
  baseClasses,
  bgClasses,
  children,
}) => {
  const isActive = currentOption === optionName;

  const finalClasses = twMerge(
    baseClasses,
    isActive ? bgClasses.active : bgClasses.inactive
  );

  return (
    <button
      className={finalClasses}
      onClick={() => onSelect(optionName)}
      aria-pressed={isActive}
    >
      {children}
    </button>
  );
};

export default OptionButton;