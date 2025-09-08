"use client";
import { Users, Settings, ClipboardList, Ticket } from "lucide-react";

export default function Navbar() {
  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <Ticket className="w-8 h-8 mr-3" />
          <span className="text-xl font-bold">Zelus</span>
        </div>
        <nav className="space-y-2">
          <button className="flex items-center w-full px-4 py-3 bg-green-700 rounded-lg hover:bg-green-600">
            <Users className="w-6 h-6 mr-3" />
            Usuários
          </button>
          <button className="flex items-center w-full px-4 py-3 hover:bg-green-700 rounded-lg">
            <Settings className="w-6 h-6 mr-3" />
            Chamados
          </button>
          <button className="flex items-center w-full px-4 py-3 hover:bg-green-700 rounded-lg">
            <ClipboardList className="w-6 h-6 mr-3" />
            Apontamentos
          </button>
        </nav>
      </div>
    </aside>
  );
}