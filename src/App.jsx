import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PaperPreview from './components/PaperPreview';

import { useExamGenerator } from './hooks/useExamGenerator';

function App() {
    const examGenerator = useExamGenerator();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-800 font-sans selection:bg-indigo-100" dir="ltr">



            <Header />

            <main className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-8">
                <Sidebar props={examGenerator} />
                <PaperPreview props={examGenerator} />
            </main>

            <footer className="max-w-7xl mx-auto p-4 text-center print:hidden pb-8">
                <p className="text-sm text-slate-500 font-medium">Developed by <span className="text-indigo-600 font-bold">Zahoor Ahmed</span></p>
            </footer>
        </div>
    );
}

export default App;
