import React, { createContext, useContext, useState, useEffect } from 'react';

type AccessibilityContextType = {
  highContrast: boolean;
  toggleHighContrast: () => void;
  largeText: boolean;
  toggleLargeText: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType>({
  highContrast: false,
  toggleHighContrast: () => {},
  largeText: false,
  toggleLargeText: () => {},
});

export const useAccessibility = () => useContext(AccessibilityContext);

export default function AccessibilityWrapper({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const toggleHighContrast = () => setHighContrast(!highContrast);
  const toggleLargeText = () => setLargeText(!largeText);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
  }, [highContrast, largeText]);

  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast, largeText, toggleLargeText }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
