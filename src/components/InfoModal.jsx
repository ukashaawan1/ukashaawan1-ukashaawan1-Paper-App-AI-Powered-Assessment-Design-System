import React from 'react';
import { X, CheckCircle, Cpu, Globe, Layers, Edit3, Settings, Layout } from 'lucide-react';

export default function InfoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/50 animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="p-6 border-b border-indigo-100 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
                            Paper App
                        </h2>
                        <p className="text-xs text-indigo-500 font-medium mt-1">Powered by Gemini 3</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white text-indigo-400 hover:text-red-500 hover:bg-red-50 shadow-sm transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="overflow-y-auto p-8 custom-scrollbar space-y-8">

                    {/* Introduction */}
                    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                            The <span className="font-bold text-indigo-700">Paper App</span> is a cutting-edge, AI-powered educational tool designed to revolutionize the way examination papers are created. This system empowers educators to generate high-quality, outcome-based, and bilingual (English & Urdu) exam papers in seconds.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <FeatureCard
                            icon={<Layout className="text-blue-600" />}
                            title="Smart Exam Modes"
                            desc="Specialized modes for every need: 'Quiz' (simplified, no sections), 'Assignment' (Long/Scenario based), and 'Mid/Final Term' (Full patterns)."
                        />

                        <FeatureCard
                            icon={<CheckCircle className="text-green-600" />}
                            title="OBE & Bloom's Taxonomy"
                            desc="Full Outcome-Based Education support. Auto-tags questions with CLOs/PLOs and maps them to Bloom's Cognitive Levels (Knowledge -> Creation)."
                        />

                        <FeatureCard
                            icon={<Globe className="text-indigo-600" />}
                            title="Bilingual & Mixed Mode"
                            desc="Native Urdu (Nastaliq) and English support. Generate fully bilingual papers where questions appear in English followed by Urdu."
                        />

                        <FeatureCard
                            icon={<Cpu className="text-purple-600" />}
                            title="AI Context Engine"
                            desc="Input topics or upload coarse notes/PDFs. The AI intelligently generates relevant questions adhering to your specified pattern."
                        />

                        <FeatureCard
                            icon={<Layers className="text-amber-600" />}
                            title="Bulk Generation"
                            desc="Create 5, 10, or 20 unique versions of a paper in one click. Perfect for preventing cheating in large classes."
                        />

                        <FeatureCard
                            icon={<Edit3 className="text-pink-600" />}
                            title="Smart Formatting"
                            desc="Intelligent layout that adapts to content. Auto-hides section headers for simple quizzes and formats assignment covers professionally."
                        />

                    </div>

                    {/* Footer / Credits */}
                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Developed with <span className="text-red-400">❤</span> by <span className="font-bold text-indigo-700">Zahoor Ahmed</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                {React.cloneElement(icon, { size: 24 })}
            </div>
            <div>
                <h3 className="font-bold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-snug">{desc}</p>
            </div>
        </div>
    );
}
