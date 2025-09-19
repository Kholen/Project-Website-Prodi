"use client";

import { Image } from "@heroui/react";
import { fontHeading, fontNavbar, myFont } from "@/config/fonts";
import clsx from "clsx";
import { motion, stagger, useAnimate, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

import { useProdi } from "../app/context/ProdiContext";
import { HoverBorderIF } from "./HoverBorderIF";
import { HoverBorderSI } from "./HoverBorderSI";

export const Banner = () => {
  const title = "Program Studi";
  const { prodi, setProdi } = useProdi();
  const cond = prodi === "IF" ? "Teknik Informatika" : "Sistem Informasi";
  const subtitleText = cond;
  const slogan = "Unggul dalam Inovasi, Berkarakter dalam Aksi.";
  const accreditation = "Sudah Terakreditasi baik.";
  const accreditation2 = "xxxxxxxxx";

  const [isWhite, setIsWhite] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [scopeTitle, animateTitle] = useAnimate();
  const sloganControls = useAnimation();
  const accreditationControls = useAnimation();
  const accreditationControls2 = useAnimation();
  const buttonControls = useAnimation();

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

  const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 2.5, duration: 0.8 } },
  };

  const runAnimations = () => {
    animateTitle("span", { opacity: 1 }, { duration: 0.3, delay: stagger(0.09), ease: "easeInOut" });
    sloganControls.start("visible");
    accreditationControls.start("visible");
    accreditationControls2.start("visible");
    buttonControls.start("visible");
  };

  const resetAndRunAnimations = async () => {
    setIsWhite(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsWhite(false);
    }, 3700);

    await Promise.all([
        animateTitle("span", { opacity: 0 }, { duration: 0 }),
        sloganControls.start("hidden"),
        accreditationControls.start("hidden"),
        accreditationControls2.start("hidden"),
    ]);
    
    runAnimations();
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsWhite(false);
    }, 3700);
    
    runAnimations();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
    }
    resetAndRunAnimations();
  }, [prodi]);

  const handleProdiChange = (newProdi: "IF" | "SI") => {
    setProdi(newProdi);
  };

  const pathname = usePathname();
  const isHidden = pathname !== "/";

  return (
    <div className={`relative w-full ${isHidden && "hidden"}`}>
      <div className="min-h-screen w-full relative bg-black">
        <div className="min-h-screen w-full bg-[#0a0950] relative imgBanner h-screen bg-no-repeat bg-cover bg-center"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center z-10 ">
        <div className="text-center">
          <motion.div
            ref={scopeTitle}
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
            key={subtitleText}
            style={{ display: "flex", overflow: "hidden" }}
            className={clsx(
              "text-[60px] font-bold z-12 justify-end leading-none",
              isWhite ? "text-white" : "text-sky-900/10 text-stroke hover:text-white duration-500 ease-in-out",
              fontHeading.className,
              prodi === 'IF' ? 'me-12' : 'me-20'
            )}
          >
            {subtitleText.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: (index * 0.09) + 0.5 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            variants={sloganVariant}
            initial="hidden"
            animate={sloganControls}
            className={clsx("text-lg m-0 text-white pb-0 text-right me-36", myFont.className)}
          >
            {slogan}
          </motion.p>
        </div>

        <motion.div
          variants={buttonVariant}
          initial="hidden"
          animate={buttonControls}
          className="flex justify-end items-center space-x-4 mt-5 mb-30 me-43"
        >
          <button onClick={() => handleProdiChange("IF")}>
            <HoverBorderIF isSelected={prodi === "IF"} />
          </button>
          <button onClick={() => handleProdiChange("SI")}>
            <HoverBorderSI isSelected={prodi === "SI"} />
          </button>
        </motion.div>

        <div className="absolute bottom-15 right-0 p-6">
          <motion.p
            variants={accreditationVariant}
            initial="hidden"
            animate={accreditationControls}
            className={clsx("text-md text-white text-right", fontNavbar.className)}
          >
            {accreditation}
          </motion.p>
          <motion.p
            variants={accreditationVariant2}
            initial="hidden"
            animate={accreditationControls2}
            className={clsx("text-md text-white text-right ", fontNavbar.className)}
          >
            {accreditation2}
          </motion.p>
        </div>
      </div>
    </div>
  );
};