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
                        <p className="text-xs text-indigo-500 font-medium mt-1">Powered by Advanced AI</p>
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
                            icon={<Globe className="text-blue-500" />}
                            title="Dual-Language Support"
                            desc="Seamlessly switch between English and Urdu. Native support for Nastaliq fonts and mixed-mode papers."
                        />

                        <FeatureCard
                            icon={<CheckCircle className="text-green-500" />}
                            title="Outcome-Based Education (OBE)"
                            desc="Align questions with Course Learning Outcomes (CLOs) and Program Learning Outcomes (PLOs) with smart tagging."
                        />

                        <FeatureCard
                            icon={<Cpu className="text-purple-500" />}
                            title="AI-Powered Generation"
                            desc="Generate content from topics or upload PDFs/Notes. The AI understands context and creates cognitive-level appropriate questions."
                        />

                        <FeatureCard
                            icon={<Layers className="text-amber-500" />}
                            title="Advanced Bulk Mode"
                            desc="Generate multiple distinct versions of papers at once for large classes, ensuring fairness and variety."
                        />

                        <FeatureCard
                            icon={<Settings className="text-pink-500" />}
                            title="Flexible Customization"
                            desc="Control difficulty, timings, and patterns. Supports Mid-Term, Final-Term, Quizzes, and more."
                        />

                        <FeatureCard
                            icon={<Layout className="text-indigo-500" />}
                            title="Preview & Export"
                            desc="Real-time glassmorphic preview, answer key generation, and one-click export to Microsoft Word."
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
