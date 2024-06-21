'use client'

import AppColumns from "@/components/ui/column/app-columns";
import DialogNewColumn from "@/components/ui/dialog/dialog-new-column";
import Header from "@/components/ui/header/header";
import { ColumnsProvider } from "@/contexts/columns-context";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
   <ColumnsProvider>
      <Header open={open} setOpen={setOpen} />
      <div className="flex flex-row w-full h-full overflow-x-auto">
        <AppColumns />
      </div>
      <DialogNewColumn open={open} setOpen={setOpen} />
   </ColumnsProvider>
  );
}
