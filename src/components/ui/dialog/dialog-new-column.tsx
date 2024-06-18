'use client';

import { useColumns } from "@/contexts/columns-context";
import IColunas from "@/interfaces/IColunas";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useState } from "react";

export default function DialogNewColumn({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { columns, setColumns } = useColumns();
  const [name, setName] = useState('');

  const handleCreateColumn = () => {
    const newColumn = { id: columns.length + 1, nome: name, cards: [] };
    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
    setOpen(false);
    setName('');
  };

  return (
    <Transition show={open}>
    <Dialog className="relative z-10" onClose={setOpen}>
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel className="relative transform overflow-hidden text-white rounded-lg bg-bgcool text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-bgcool px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-4">Criar nova coluna</h3>
                  </div>
                  <label htmlFor="columnName" className="text-hem font-medium">Nome da coluna</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="columnName"
                   name="column" placeholder="Insira o nome da coluna..." type="text" className="w-full bg-bgcool border-2 border-mem rounded-md p-1" />
                </div>
              </div>
              <div className="bg-bgcool-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                  onClick={() => handleCreateColumn()}
                >
                  Criar coluna
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                  data-autofocus
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}
