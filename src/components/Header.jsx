import React, { useState } from 'react';
import { BookOpen, Info } from 'lucide-react';
import InfoModal from './InfoModal';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-5 shadow-lg print:hidden">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-wide">Paper App</h1>
                        <p className="text-xs text-indigo-100 opacity-90 font-light">Powered by Advanced AI</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow-sm border border-indigo-400"
                    >
                        <Info size={14} /> Info
                    </button>
                    <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-full flex items-center">
                        v2.0 Pro
                    </div>
                </div>
            </div>
            <InfoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </header>
    );
}
