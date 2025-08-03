import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AnimatedWrapper = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "spring", duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] p-4"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
