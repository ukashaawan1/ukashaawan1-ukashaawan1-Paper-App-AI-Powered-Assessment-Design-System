import React from 'react';
import {
    FileText, Layers, GraduationCap, Calendar as CalendarIcon,
    Hash, Grid, Clock, Timer, BookOpen, Target, Building2, User,
    Settings, Globe, BrainCircuit, Check, Lightbulb, Upload, FileType, X, Sparkles, RefreshCw,
    LayoutTemplate
} from 'lucide-react';

export default function Sidebar({
    props
}) {
    const {
        isBulkMode, setIsBulkMode,
        activePaperIndex, setActivePaperIndex,
        papers,
        isLoading,
        error,
        fileInputRef,
        updatePaper, updateNestedPaper,
        handleExamTypeChange, handleFileChange,
        clearFile, handleBulkCountChange,
        generateAllPapers
    } = props;

    const activePaper = papers[activePaperIndex];
    const semesterOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
    const sectionOptions = ["A", "B", "C", "D", "E", "Morning", "Evening"];

    const getTimeSuggestions = () => {
        const type = activePaper.examMeta.examType;
        if (type === "Mid Term Exam") return ["90 Minutes", "2 Hours"];
        if (type === "Final Term Exam") return ["3 Hours"];
        if (type === "Quiz") return ["15 Minutes", "20 Minutes", "30 Minutes"];
        if (type === "Class Test") return ["30 Minutes", "45 Minutes", "1 Hour"];
        return ["1 Hour", "2 Hours", "3 Hours"];
    };

    return (
        <aside className="lg:w-1/3 space-y-4 print:hidden">
            {/* Mode Switcher */}
            <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex gap-2">
                <button
                    onClick={() => { setIsBulkMode(false); setActivePaperIndex(0); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex justify-center items-center gap-2 ${!isBulkMode ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                    <FileText size={14} /> Single Paper
                </button>
                <button
                    onClick={() => { setIsBulkMode(true); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex justify-center items-center gap-2 ${isBulkMode ? 'bg-amber-400 text-amber-900 shadow' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                    <Layers size={14} /> Advance Bulk
                </button>
            </div>

            {/* BULK MODE TABS */}
            {isBulkMode && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-amber-800">بلک سیٹنگز (Quantity):</h3>
                        <input
                            type="number" min="1" max="10"
                            value={papers.length}
                            onChange={handleBulkCountChange}
                            className="w-16 p-1 text-center border border-amber-300 rounded font-bold text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {papers.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActivePaperIndex(idx)}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${activePaperIndex === idx ? 'bg-amber-400 text-amber-900 border-amber-500 shadow-md transform scale-105' : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'}`}
                            >
                                Paper {idx + 1}
                                {papers[idx].generatedContent && activePaperIndex !== idx && <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 1. Exam Details Card */}
            <div className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/50 relative overflow-hidden">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-700 relative z-10">
                    <LayoutTemplate className="h-5 w-5" />
                    {isBulkMode ? `Paper ${activePaperIndex + 1}: Details` : 'Exam Details'}
                </h2>
                <div className="space-y-3 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><GraduationCap size={12} /> امتحان کی قسم</label>
                            <select
                                value={activePaper.examMeta.examType}
                                onChange={(e) => handleExamTypeChange(e.target.value)}
                                className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm font-semibold text-indigo-900 cursor-pointer"
                            >
                                <option value="Mid Term Exam">Mid Term Exam</option>
                                <option value="Final Term Exam">Final Term Exam</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Assignment">Assignment</option>
                                <option value="Class Test">Class Test</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><CalendarIcon size={12} /> تاریخ (Date)</label>
                            <input
                                type="date"
                                value={activePaper.examMeta.paperDate}
                                onChange={(e) => updateNestedPaper('examMeta', 'paperDate', e.target.value)}
                                className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm text-center"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Hash size={12} /> سمسٹر (Semester)</label>
                            <select
                                value={activePaper.examMeta.semester}
                                onChange={(e) => updateNestedPaper('examMeta', 'semester', e.target.value)}
                                className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm font-semibold text-indigo-900 cursor-pointer"
                            >
                                {semesterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Grid size={12} /> سیکشن (Section)</label>
                            <select
                                value={activePaper.examMeta.section}
                                onChange={(e) => updateNestedPaper('examMeta', 'section', e.target.value)}
                                className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm font-semibold text-indigo-900 cursor-pointer"
                            >
                                {sectionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Clock size={12} /> کل وقت (Total Time)</label>
                            <input
                                type="text"
                                list="time-suggestions"
                                value={activePaper.examMeta.timeDuration}
                                onChange={(e) => updateNestedPaper('examMeta', 'timeDuration', e.target.value)}
                                placeholder="e.g 90 Mins"
                                className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm text-center"
                            />
                            <datalist id="time-suggestions">
                                {getTimeSuggestions().map((time, i) => <option key={i} value={time} />)}
                            </datalist>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Timer size={12} /> MCQs وقت</label>
                            <input
                                type="text"
                                value={activePaper.examMeta.mcqDuration}
                                onChange={(e) => updateNestedPaper('examMeta', 'mcqDuration', e.target.value)}
                                placeholder="e.g 20 Mins"
                                className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-sm text-center"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><BookOpen size={12} /> سبجیکٹ (Title)</label>
                            <input
                                type="text"
                                value={activePaper.examMeta.subjectTitle}
                                onChange={(e) => updateNestedPaper('examMeta', 'subjectTitle', e.target.value)}
                                placeholder="e.g. Intro to Computing"
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-right"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Target size={12} /> کوڈ (Code)</label>
                            <input
                                type="text"
                                value={activePaper.examMeta.subjectCode}
                                onChange={(e) => updateNestedPaper('examMeta', 'subjectCode', e.target.value)}
                                placeholder="e.g. CS-101"
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-right"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Building2 size={12} /> ڈیپارٹمنٹ</label>
                            <input
                                type="text"
                                value={activePaper.examMeta.department}
                                onChange={(e) => updateNestedPaper('examMeta', 'department', e.target.value)}
                                placeholder="e.g. Computer Science"
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-right"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><User size={12} /> انسٹرکٹر (Teacher)</label>
                            <input
                                type="text"
                                value={activePaper.examMeta.instructorName}
                                onChange={(e) => updateNestedPaper('examMeta', 'instructorName', e.target.value)}
                                placeholder="e.g. Sir Ali"
                                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-right"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Pattern Settings Card */}
            <div className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/50 relative overflow-hidden">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-700 relative z-10">
                    <Settings className="h-5 w-5" />
                    پیپر پیٹرن
                </h2>
                <div className="space-y-4 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><Globe size={12} /> زبان</label>
                            <select value={activePaper.languageMode} onChange={(e) => updatePaper('languageMode', e.target.value)} className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-xs font-bold text-indigo-900 cursor-pointer">
                                <option value="Bilingual">اردو + English</option>
                                <option value="English">صرف English</option>
                                <option value="Urdu">صرف اردو</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1 flex items-center gap-1"><BrainCircuit size={12} /> انداز</label>
                            <select value={activePaper.questionStyle} onChange={(e) => updatePaper('questionStyle', e.target.value)} className="w-full p-2 bg-indigo-50/50 border border-indigo-200 rounded-lg text-xs font-bold text-indigo-900 cursor-pointer">
                                <option value="Simple">سادہ (Simple)</option>
                                <option value="Scenario">Scenario / Conceptual</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-indigo-50/50 p-2 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition cursor-pointer" onClick={() => updatePaper('isOutcomeBased', !activePaper.isOutcomeBased)}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activePaper.isOutcomeBased ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
                            {activePaper.isOutcomeBased && <Check size={14} className="text-white" />}
                        </div>
                        <label className="text-xs font-bold text-slate-600 cursor-pointer select-none flex items-center gap-1">
                            <Target size={14} className="text-indigo-600" /> OBE Based (CLO/PLO Tags)
                        </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">کل نمبر</label>
                            <input type="number" value={activePaper.paperPattern.totalMarks} onChange={(e) => updateNestedPaper('paperPattern', 'totalMarks', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-center text-sm font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">مشکل کی سطح</label>
                            <select value={activePaper.difficulty} onChange={(e) => updatePaper('difficulty', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm cursor-pointer">
                                <option value="Easy">آسان</option>
                                <option value="Medium">درمیانہ</option>
                                <option value="Hard">مشکل</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/50">
                        <label className="block text-xs font-bold text-indigo-500 mb-2 text-center">سوالات کی تعداد اور نمبر</label>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-1">
                                <label className="block text-[10px] font-medium text-slate-600 text-center">MCQs</label>
                                <input type="number" value={activePaper.paperPattern.mcqs} onChange={(e) => updateNestedPaper('paperPattern', 'mcqs', e.target.value)} className="w-full p-1.5 text-center border border-indigo-200 rounded bg-white text-sm" placeholder="Qty" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block text-[10px] font-medium text-slate-600 text-center">مختصر (Qty)</label>
                                <input type="number" value={activePaper.paperPattern.shortQuestions} onChange={(e) => updateNestedPaper('paperPattern', 'shortQuestions', e.target.value)} className="w-full p-1.5 text-center border border-indigo-200 rounded bg-white text-sm" />
                                <input type="number" value={activePaper.paperPattern.marksPerShort} onChange={(e) => updateNestedPaper('paperPattern', 'marksPerShort', e.target.value)} className="w-full p-1 text-center border border-indigo-100 rounded bg-slate-50 text-xs" placeholder="Marks" title="Marks per Question" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="block text-[10px] font-medium text-slate-600 text-center">تفصیلی (Qty)</label>
                                <input type="number" value={activePaper.paperPattern.longQuestions} onChange={(e) => updateNestedPaper('paperPattern', 'longQuestions', e.target.value)} className="w-full p-1.5 text-center border border-indigo-200 rounded bg-white text-sm" />
                                <input type="number" value={activePaper.paperPattern.marksPerLong} onChange={(e) => updateNestedPaper('paperPattern', 'marksPerLong', e.target.value)} className="w-full p-1 text-center border border-indigo-100 rounded bg-slate-50 text-xs" placeholder="Marks" title="Marks per Question" />
                            </div>
                        </div>
                        <div className="text-[10px] text-center text-slate-400 mt-1">* چھوٹے خانوں میں ہر سوال کے نمبر لکھیں</div>
                    </div>
                </div>
            </div>

            {/* 3. Input Section */}
            <div className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/50 flex-grow flex flex-col relative overflow-hidden">
                <div className="flex p-1 bg-slate-100 rounded-xl mb-4 relative z-10">
                    <button onClick={() => updatePaper('inputMode', 'Content')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activePaper.inputMode === 'Content' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>
                        <FileText size={14} /> نوٹس / فائل
                    </button>
                    <button onClick={() => updatePaper('inputMode', 'Topic')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activePaper.inputMode === 'Topic' ? 'bg-white shadow text-purple-600' : 'text-slate-500'}`}>
                        <Lightbulb size={14} /> ٹاپک (AI)
                    </button>
                </div>

                {activePaper.inputMode === 'Content' ? (
                    <>
                        <div className="mb-3 relative z-10">
                            <input type="file" ref={fileInputRef} accept=".pdf,.txt" onChange={handleFileChange} className="hidden" id="file-upload" />
                            {!activePaper.fileData ? (
                                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-indigo-200 rounded-xl cursor-pointer bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-400 transition-all">
                                    <Upload className="h-5 w-5 text-indigo-500 mb-1" />
                                    <span className="text-[10px] text-indigo-700 font-bold">PDF فائل اپلوڈ کریں</span>
                                </label>
                            ) : (
                                <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-xl">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <FileType className="h-4 w-4 text-emerald-600" />
                                        <span className="text-xs text-emerald-800 font-bold truncate" dir="ltr">{activePaper.fileName}</span>
                                    </div>
                                    <button onClick={clearFile} className="p-1 hover:bg-red-100 text-red-500 rounded"><X size={14} /></button>
                                </div>
                            )}
                        </div>
                        <textarea
                            value={activePaper.sourceText}
                            onChange={(e) => updatePaper('sourceText', e.target.value)}
                            disabled={!!activePaper.fileData}
                            className={`w-full h-28 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-100 outline-none resize-none text-xs leading-relaxed transition-all ${activePaper.fileData ? 'bg-slate-100 text-slate-400' : 'bg-white'}`}
                            placeholder={activePaper.fileData ? "فائل اپلوڈ ہو چکی ہے۔" : "یہاں اپنے نوٹس یا وہ سارا مواد پیسٹ کریں جس سے آپ پیپر بنانا چاہتے ہیں..."}
                        ></textarea>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col z-10">
                        <label className="text-xs font-bold text-purple-700 mb-2">ٹاپک (موضوع):</label>
                        <textarea
                            value={activePaper.topic}
                            onChange={(e) => updatePaper('topic', e.target.value)}
                            className="w-full h-32 p-3 bg-white border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-100 outline-none resize-none text-sm"
                            placeholder="اپنے ٹاپکس یا آؤٹ لائن یہاں تحریر کریں... / Enter your topics or outline here..."
                        ></textarea>
                    </div>
                )}

                <div className="mt-4 z-10">
                    <button
                        onClick={generateAllPapers}
                        disabled={isLoading}
                        className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 ${isLoading ? 'bg-slate-400' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-indigo-500/30'}`}
                    >
                        {isLoading ? <RefreshCw className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                        {isLoading ? (isBulkMode ? `Generating ${papers.length} Papers...` : 'Generating Paper...') : (isBulkMode ? `Generate ALL (${papers.length}) Papers` : 'Generate Paper')}
                    </button>
                </div>
                {error && <div className="mt-3 p-3 bg-red-50 text-red-600 text-xs rounded-lg">{error}</div>}
            </div>
        </aside>
    );
}
