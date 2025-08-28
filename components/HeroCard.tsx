"use client";
import { Card, CardFooter, Image, Button } from "@heroui/react";

export default function App() {
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={390}
        src="https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljfGVufDB8fDB8fHww"
        width={390}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Available soon.</p>
        <Button className="text-tiny text-white bg-black/20" color="default" radius="lg" size="sm" variant="flat">
          Notify me
        </Button>
      </CardFooter>
    </Card>
  );
}
