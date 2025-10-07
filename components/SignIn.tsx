"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Checkbox, Link, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { BackgroundGradient } from "./ui/background-gradient";
import { login, TOKEN_STORAGE_KEY } from "../lib/api";

export default function Component() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const result = await login({ username, password });

      if ("token" in result && result.token) {
        localStorage.setItem(TOKEN_STORAGE_KEY, result.token);
        router.push("/dashboard");
      } else {
        const errorMessage = "message" in result ? result.message ?? "Login failed. Please check your credentials." : "Login failed. Please check your credentials.";
        setError(errorMessage);
      }
    } catch (err) {
      setError("Terjadi kesalahan tak terduga. Silakan coba lagi.");
      console.error("Error saat login:", err);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
          <p className="pb-4 text-center text-3xl font-semibold">Log In</p>
          <Form className="flex flex-col gap-4" validationBehavior="native" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <Input
              isRequired
              label="Username"
              labelPlacement="outside"
              name="username"
              placeholder="Masukan Username anda"
              type="text"
              variant="bordered"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
