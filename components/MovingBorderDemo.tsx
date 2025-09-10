"use client";
import React from "react";

import { Button } from "./ui/moving-border";

export function MovingBorderDemo({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {skills.map((skill) => (
        <Button key={skill} borderRadius="1.75rem" className="bg-white text-black border-neutral-200 text-xs px-2 py-0">
          {skill}
        </Button>
      ))}
    </div>
  );
}
