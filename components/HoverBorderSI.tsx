"use client";
import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function HoverBorderSI({ isSelected }: { isSelected?: boolean }) {
  return (
    <div className="flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className=" mainColor hover:bg-white/10 flex items-center space-x-2"
        isSelected={isSelected}
      >
        <span>Sistem Informasi</span>
      </HoverBorderGradient>
    </div>
  );
}
