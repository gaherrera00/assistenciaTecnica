"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({ children, navbar, footer }) {
  const pathname = usePathname();
  
  // Páginas que devem ter layout completo (sem navbar/footer)
  const fullScreenPages = ['/login', '/cadastro'];
  
  const isFullScreen = fullScreenPages.includes(pathname);

  if (isFullScreen) {
    // Para páginas de login/cadastro, renderiza apenas o children sem navbar/footer
    return <>{children}</>;
  }

  // Para outras páginas, renderiza com navbar e footer
  return (
    <div className="flex min-h-screen bg-gray-50">
      {navbar}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0 flex flex-col">
        <div className="flex-1 p-4 lg:p-6">
          {children}
        </div>
        {footer}
      </main>
    </div>
  );
}
