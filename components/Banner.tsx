"use client";

import { Image } from "@heroui/react";
import { fontHeading, myFont } from "@/config/fonts";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Banner = () => {
  const title = "Sistem Informasi";
  const slogan = "Unggul dalam Inovasi, Berkarakter dalam Aksi.";
  const accreditation = "Sudah Terakreditasi baik.";
  const accreditation2 = "xxxxxxxxx";

  const [isWhite, setIsWhite] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWhite(false);
    }, 3700);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const titleChar = {
    visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, x: -20, y: 10, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  const sloganVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: title.length * 0.08 + 0.5, duration: 0.8 } },
  };

  const accreditationVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: title.length * 0.08 + 1, duration: 0.8 } },
  };
  const accreditationVariant2 = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: title.length * 0.08 + 1.5, duration: 0.8 } },
  };

  return (
    <div className="relative w-full">
      <Image alt="Banner" src="/banner.png" width={1444} height={400} className="rounded-none " />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
        <div className="text-center">
          <motion.div
            style={{ display: "flex", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className={clsx(
              "text-[60px] font-bold z-12 pt-10 ",
              isWhite ? "text-white" : "text-blue-500/10 text-stroke hover:text-white duration-500 ease-in-out",
              fontHeading.className
            )}
          >
            {title.split("").map((char, index) => (
              <motion.span variants={titleChar} key={index}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.p variants={sloganVariant} initial="hidden" animate="visible" className={clsx("text-lg m-0 text-white pb-10", myFont.className)}>
            {slogan}
          </motion.p>
        </div>
        <div className="w-full max-w-8xl mx-auto px-6">
          <motion.p
            variants={accreditationVariant}
            initial="hidden"
            animate="visible"
            className={clsx("text-md mt-8 text-white text-left", myFont.className)}
          >
            {accreditation}
          </motion.p>
          <motion.p
            variants={accreditationVariant2}
            initial="hidden"
            animate="visible"
            className={clsx("text-md text-white text-left", myFont.className)}
          >
            {accreditation2}
          </motion.p>
        </div>
      </div>
    </div>
  );
};
