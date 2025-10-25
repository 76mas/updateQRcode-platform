"use client";

import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { use } from "react";

export const ExplainSteps = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [rotations, setRotations] = useState([]); // نخزن الدورانات الثابتة

  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // نثبت rotation لكل صورة أول ما يشتغل الكلَينت
  useEffect(() => {
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index] ?? 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index] ?? 0,
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index] ?? 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3
              dir={language === "ar" ? "rtl" : "ltr"}
              className="text-2xl font-bold text-white dark:text-white"
            >
              {testimonials[active].name}
            </h3>
            <p
              dir={language === "ar" ? "rtl" : "ltr"}
              className="text-sm text-gray-500 dark:text-neutral-500"
            >
              {testimonials[active].designation}
            </p>
            <motion.p
              dir={language === "ar" ? "rtl" : "ltr"}
              className="mt-8 text-lg text-gray-300 dark:text-neutral-300"
            >
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div
            dir={language === "ar" ? "rtl" : "ltr"}
            className="flex gap-4 pt-12 md:pt-0"
          >
            <button
              onClick={handlePrev}
              className="group/button flex  h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f6f6f626]  backdrop-blur-3xl"
            >
              {language === "ar" ? (
                <FaArrowRightLong className="h-5 w-4  text-gray-300 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
              ) : (
                <FaArrowLeftLong className="h-5 w-4  text-gray-300 transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
              )}
              {/* <FaArrowLeftLong className="h-5 w-4  text-gray-300 transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" /> */}
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f6f6f626] backdrop-blur-3xl"
            >
              {language === "ar" ? (
                <FaArrowLeftLong className="h-5 w-4  text-gray-300 transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
              ) : (
                <FaArrowRightLong className="h-5 w-4  text-gray-300 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
              )}

              {/* <FaArrowRightLong className="h-5 w-4  text-gray-300 transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
