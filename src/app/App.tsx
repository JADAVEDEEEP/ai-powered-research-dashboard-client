import { MotionConfig } from "motion/react";
import Home from "../pages/Home";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain bg-atmosphere min-h-screen text-foreground font-sans">
        <Home />
      </div>
    </MotionConfig>
  );
}
