'use client';

import PlusIcon from "@/components/icons/plus-icon";

export default function Header({ open, setOpen }: { open: boolean, setOpen: (value: boolean) => void }) {
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className="flex justify-center mt-2">
      <button onClick={handleClick} className="flex items-center border-solid border-[1px] bg-mem rounded-xl gap-2 p-2 font-semibold m-3">
        <PlusIcon />
        Adicionar coluna
      </button>
    </div>
  );
}