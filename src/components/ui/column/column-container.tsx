import React from 'react';

export default function ColumnContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-full gap-5 m-5 overflow-x-auto">
      {children}
    </div>
  );
}
