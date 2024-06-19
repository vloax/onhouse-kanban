'use client';

import { useColumns } from "@/contexts/columns-context";
import { ITag } from "@/interfaces/ICard"; // Certifique-se de importar ITag corretamente
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function DialogCardView({
  open,
  setOpen,
  cardId
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  cardId: number;
}) {
  const { findOneCardById, updateCard } = useColumns();
  
  const card = findOneCardById(cardId);
  const [tags, setTags] = useState<ITag[]>(card?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  useEffect(() => {
    if (card) {
      setTags(card.tags || []);
    }
  }, [card]);

  const handleAddTag = () => {
    if (newTag.trim() !== '') {
      setTags([...tags, { text: newTag, color: selectedColor }]);
      setNewTag('');
      setSelectedColor('#ffffff');
    }
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    updateCard(cardId, { tags });
    setOpen(false);
  };

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={() => setOpen(false)}>
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
                <div className="bg-bgcool px-4 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-4">{card?.titulo}</h3>
                    </div>
                    <p>{card?.descricao}</p>
                  </div>
                  <div className="h-[1px] w-full bg-hem mb-2"></div>
                  <div>
                    <h3 className="font-semibold mb-1">Adicionar tags</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Tag"
                        className="w-full bg-bgcool border-2 border-mem rounded-md p-1 mb-2"
                      />
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full bg-mem border-2 rounded-md h-10 mb-2 p-1"
                      />
                      <button
                        onClick={handleAddTag}
                        className="w-full bg-green-500 text-white p-2 rounded-md mb-2"
                      >
                        Adicionar Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <div key={index} className="flex items-center">
                          <span
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: tag.color }}
                          >
                            {tag.text}
                            <button
                            onClick={() => handleDeleteTag(index)}
                            className="ml-2 text-white"
                          >
                            &times;
                          </button>
                          </span>

                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-bgcool-50 gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:mt-0 sm:w-auto"
                    onClick={handleSave}
                    data-autofocus
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Fechar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
