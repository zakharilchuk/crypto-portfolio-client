import { useEffect, useState } from "react";

const DESKTOP_MIN_WIDTH = 1024;

export function useDeviceSupport() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_MIN_WIDTH);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isDesktop;
}
