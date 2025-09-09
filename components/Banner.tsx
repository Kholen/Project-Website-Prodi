"use client";

import { Image } from "@heroui/react";
import { fontHeading, fontNavbar, myFont } from "@/config/fonts";
import clsx from "clsx";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Banner = () => {
  const title = "Program Studi";
  const subtitleText = "Sistem Informasi";
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

  const [scopeTeknik, animateTeknik] = useAnimate();
  const [scopeSI, animateSI] = useAnimate();
  const isInViewTeknik = useInView(scopeTeknik, { once: true });
  const isInViewSI = useInView(scopeSI, { once: true });

  useEffect(() => {
    if (isInViewTeknik) {
      animateTeknik(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.09),
          ease: "easeInOut",
        }
      ).then(() => {
        if (isInViewSI) {
          animateSI(
            "span",
            {
              opacity: 1,
            },
            {
              duration: 0.3,
              delay: stagger(0.09),
              ease: "easeInOut",
            }
          );
        }
      });
    }
  }, [isInViewTeknik, isInViewSI]);

  const sloganVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.8 } },
  };

  const accreditationVariant = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { delay: 1.8, duration: 0.8 } },
  };
  const accreditationVariant2 = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { delay: 2.1, duration: 0.8 } },
  };

  const pathname = usePathname();
  const isHidden = pathname !== "/";
  return (
    <div className={`relative w-full ${isHidden && "hidden"}`}>
      <div className="min-h-screen w-full relative bg-black">
        <div className="min-h-screen w-full bg-[#0a0950] relative">
          <Image alt="Banner" src="/b.png" width={1444} height={600} className="rounded-none object-cover border-b-4 border-white" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center z-10 ">
        <div className="text-center">
          <motion.div
            ref={scopeTeknik}
            style={{ display: "flex", overflow: "hidden" }}
            className={clsx(
              "text-[60px] font-bold z-12 justify-end me-30 leading-[1.2]",
              isWhite ? "text-white" : "text-sky-900/10 text-stroke hover:text-white duration-500 ease-in-out",
              fontHeading.className
            )}
          >
            {title.split("").map((char, index) => (
              <motion.span style={{ opacity: 0 }} key={index}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            ref={scopeSI}
            style={{ display: "flex", overflow: "hidden" }}
            className={clsx(
              "text-[60px] font-bold z-12 justify-end me-20 leading-none",
              isWhite ? "text-white" : "text-sky-900/10 text-stroke hover:text-white duration-500 ease-in-out",
              fontHeading.className
            )}
          >
            {subtitleText.split("").map((char, index) => (
              <motion.span style={{ opacity: 0 }} key={index}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.p variants={sloganVariant} initial="hidden" animate="visible" className={clsx("text-lg m-0 text-white pb-0 text-right mb-30 me-38", myFont.className)}>
            {slogan}
          </motion.p>
        </div>
        <div className="absolute bottom-15 right-0 p-6">
          <motion.p
            variants={accreditationVariant}
            initial="hidden"
            animate="visible"
            className={clsx("text-md text-white text-right", fontNavbar.className)}
          >
            {accreditation}
          </motion.p>
          <motion.p
            variants={accreditationVariant2}
            initial="hidden"
            animate="visible"
            className={clsx("text-md text-white text-right ", fontNavbar.className)}
          >
            {accreditation2}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

