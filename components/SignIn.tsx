"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { BackgroundGradient } from "./ui/background-gradient";
import { MovingBorderDemo } from "./MovingBorderDemo";

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
          <p className="pb-4 text-center text-3xl font-semibold">Log In</p>
          <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
            <Input
              isRequired
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Masukan Username anda"
              type="text"
              variant="bordered"
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon className="text-default-400 pointer-events-none text-2xl" icon="solar:eye-closed-linear" />
                  ) : (
                    <Icon className="text-default-400 pointer-events-none text-2xl" icon="solar:eye-bold" />
                  )}
                </button>
              }
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
            />
            <div className="flex w-full items-center justify-between px-1 py-2">
              <Checkbox defaultSelected name="remember" size="sm">
                Ingat Saya
              </Checkbox>
              <Link className="text-default-500" href="#" size="sm">
                Lupa password?
              </Link>
            </div>
            <Button className="w-full mainColor text-white" type="submit">
              Log In
            </Button>
          </Form>
        </div>
      </BackgroundGradient>
    </div>
  );
}
