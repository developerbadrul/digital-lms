"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const handleClick = (mode) => {
    mode ? toast.success("test success") : toast.error("test error")
  }

  return (
    <div>
      <Button variant="outline" onClick={() => handleClick(false)}>Test Toast</Button>
    </div >
  );
}
