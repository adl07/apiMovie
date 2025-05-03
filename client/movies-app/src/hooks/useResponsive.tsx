import { useState, useEffect } from 'react';

export default function useResponsive(breakpoint: number = 400) {
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= breakpoint);
    };

    window.addEventListener('resize', handleResize);

    // Verificamos al montar
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isResponsive;
}