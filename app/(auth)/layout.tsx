"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRegister = pathname === "/register";

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{
            x: isRegister ? 300 : -300,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: isRegister ? -300 : 300,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: [0.83, 0, 0.17, 1], // premium easing
          }}
          className="w-full flex items-center justify-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}