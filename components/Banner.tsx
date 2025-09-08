"use client";

import { Image } from "@heroui/react";
import clsx from "clsx";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { fontHeading, myFont } from "@/config/fonts";

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

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.09),
          ease: "easeInOut",
        },
      );
    }
  }, [isInView]);

  const sloganVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.8 } },
  };

  const accreditationVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 1.8, duration: 0.8 } },
  };
  const accreditationVariant2 = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 2.1, duration: 0.8 } },
  };

  const pathname = usePathname();
  const isHidden = pathname !== "/";

  return (
    <div className={`relative w-full ${isHidden && "hidden"}`}>
      <Image
        alt="Banner"
        className="rounded-none object-cover "
        height={600}
        src="/banner.png"
        width={1444}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 ">
        <div className="text-center">
          <motion.div
            ref={scope}
            className={clsx(
              "text-[60px] font-bold z-12 pt-20 ",
              isWhite
                ? "text-white"
                : "text-sky-900/10 text-stroke hover:text-white duration-500 ease-in-out",
              fontHeading.className,
            )}
            style={{ display: "flex", overflow: "hidden" }}
          >
            {title.split("").map((char, index) => (
              <motion.span key={index} style={{ opacity: 0 }}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            animate="visible"
            className={clsx("text-lg m-0 text-white pb-0", myFont.className)}
            initial="hidden"
            variants={sloganVariant}
          >
            {slogan}
          </motion.p>
        </div>
        <div className="w-full max-w-8xl mx-auto px-6">
          <motion.p
            animate="visible"
            className={clsx(
              "text-md mt-8 text-white text-left",
              myFont.className,
            )}
            initial="hidden"
            variants={accreditationVariant}
          >
            {accreditation}
          </motion.p>
          <motion.p
            animate="visible"
            className={clsx("text-md text-white text-start", myFont.className)}
            initial="hidden"
            variants={accreditationVariant2}
          >
            {accreditation2}
          </motion.p>
        </div>
      </div>
    </div>
  );
};
