'use client';

import { createContext, useState, ReactNode } from 'react';

const LayoutContext = createContext<any>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    function toggleSidebar() {
      setIsSidebarOpen((prevState) => !prevState);
    }
  
    return (
      <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
        {children}
      </LayoutContext.Provider>
    );
  }
  
  export default LayoutContext;
