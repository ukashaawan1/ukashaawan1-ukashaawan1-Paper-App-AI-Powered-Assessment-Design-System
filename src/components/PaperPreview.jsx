import React from 'react';
import { Download, Clipboard, Check, Key, RefreshCw, Lightbulb, Layers } from 'lucide-react';

export default function PaperPreview({ props }) {
    const {
        isBulkMode,
        activePaperIndex, setActivePaperIndex,
        papers,
        isLoading, isKeyLoading,
        showKey, setShowKey,
        copySuccess,
        generateCurrentKey,
        handleCopy
    } = props;

    const activePaper = papers[activePaperIndex];

    const handleDownloadAllWord = () => {
        let fullHtmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Exam Papers</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; }
          .urdu { font-family: 'Arial', sans-serif; text-align: right; direction: rtl; font-size: 14pt; margin-bottom: 5px; }
          .english { font-family: 'Times New Roman', serif; text-align: left; direction: ltr; margin-bottom: 0px; margin-top: 10px; }
          .header-container { text-align:center; padding-bottom: 10px; margin-bottom: 20px; border-bottom: 3px double black; }
          .header-dept { font-size:14pt; font-weight:bold; text-transform:uppercase; margin-bottom: 5px; }
          .header-title { font-size: 18pt; font-weight: bold; text-transform: uppercase; margin: 5px 0; }
          .info-table { width: 100%; font-weight: bold; font-size: 11pt; margin-top: 15px; border-collapse: collapse; border: 2px solid black; }
          .info-table td { padding: 8px; border: 1px solid black; }
          .page-break { page-break-before: always; }
          .signature-section { margin-top: 60px; width: 100%; border-collapse: collapse; }
          .signature-line { border-top: 1px solid black; text-align: center; padding-top: 5px; width: 40%; font-weight: bold; }
        </style>
      </head>
      <body>
    `;

        papers.forEach((paper, index) => {
            if (!paper.generatedContent) return;
            if (index > 0) fullHtmlContent += '<br class="page-break" />';

            fullHtmlContent += `
        <div class="header-container">
           <div class="header-dept">${paper.examMeta.department || 'DEPARTMENT NAME'}</div>
           <div class="header-title">${paper.examMeta.examType}</div>
           <table class="info-table">
             <tr>
               <td style="text-align:left;">Subject: ${paper.examMeta.subjectTitle}</td>
               <td style="text-align:right;">Code: ${paper.examMeta.subjectCode}</td>
             </tr>
             <tr>
               <td style="text-align:left;">Instructor: ${paper.examMeta.instructorName}</td>
               <td style="text-align:right;">Time: ${paper.examMeta.timeDuration}</td>
             </tr>
             <tr>
               <td style="text-align:left;">Semester: ${paper.examMeta.semester} (${paper.examMeta.section})</td>
               <td style="text-align:right;">Marks: ${paper.paperPattern.totalMarks}</td>
             </tr>
             <tr>
               <td style="text-align:left;">Date: ${paper.examMeta.paperDate}</td>
               <td></td>
             </tr>
           </table>
        </div>
        `;

            const contentToUse = showKey && paper.answerKey ? paper.answerKey : paper.generatedContent;

            contentToUse.split('\n').forEach(line => {
                if (!line.trim()) return;
                const isHeader = line.toLowerCase().includes('section a') || line.toLowerCase().includes('section b') || line.toLowerCase().includes('section c');
                const hasUrdu = /[\u0600-\u06FF]/.test(line);

                const isMCQEng = /\(A\).+\(B\)/.test(line);
                const isMCQUrdu = /\(الف\).+\(ب\)/.test(line) || /\(أ\).+\(ب\)/.test(line);

                if (isHeader) {
                    if (line.toLowerCase().includes('section b')) {
                        fullHtmlContent += '<br class="page-break" />';
                        fullHtmlContent += `<div style="text-align:center; font-weight:bold; font-size:14pt; margin-top:20px; text-transform:uppercase; border-bottom:1px solid black;">Subjective Part</div>`;
                    }

                    let headerText = line.replace(/[*#]/g, '');
                    if (line.toLowerCase().includes('section a')) {
                        headerText += ` (Time: ${paper.examMeta.mcqDuration})`;
                    }

                    fullHtmlContent += `<div style="text-align:center; font-weight:bold; font-size:14pt; margin-top:15px; text-transform:uppercase; border-bottom:1px solid black;">${headerText}</div>`;
                } else if (isMCQEng) {
                    let formatted = line.replace(/\(B\)/, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(B)')
                        .replace(/\(C\)/, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(C)')
                        .replace(/\(D\)/, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(D)');
                    fullHtmlContent += `<p class="english">${formatted}</p>`;
                } else if (isMCQUrdu) {
                    fullHtmlContent += `<p class="urdu">${line}</p>`;
                } else if (hasUrdu) {
                    fullHtmlContent += `<p class="urdu">${line.replace(/[*#]/g, '')}</p>`;
                } else {
                    fullHtmlContent += `<p class="english">${line.replace(/[*#]/g, '')}</p>`;
                }
            });

            fullHtmlContent += `
        <table class="signature-section">
          <tr>
            <td class="signature-line">Instructor Signature</td>
            <td style="width:20%"></td>
            <td class="signature-line">HOD Signature</td>
          </tr>
        </table>
        `;
        });

        fullHtmlContent += '</body></html>';

        const blob = new Blob(['\ufeff', fullHtmlContent], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Exam_Papers_Bulk_${new Date().toISOString().slice(0, 10)}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="lg:w-2/3 min-h-[85vh] print:w-full print:p-0">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-slate-100 h-full relative print:shadow-none print:border-none print:rounded-none">

                <div className="absolute inset-0 bg-[#fafafa] opacity-50 pointer-events-none rounded-2xl print:hidden mix-blend-multiply"></div>

                {isBulkMode && activePaper.generatedContent && (
                    <div className="mb-6 flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto print:hidden">
                        {papers.map((p, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActivePaperIndex(idx)}
                                disabled={!p.generatedContent}
                                className={`px-4 py-2 rounded-t-lg text-xs font-bold transition-all ${activePaperIndex === idx ? 'bg-white border-b-2 border-indigo-600 text-indigo-700' : 'text-slate-500 hover:text-indigo-600'} ${!p.generatedContent && 'opacity-50 cursor-not-allowed'}`}
                            >
                                Paper {idx + 1}
                            </button>
                        ))}
                    </div>
                )}

                {activePaper.generatedContent ? (
                    <div className="w-full">
                        <div className="flex flex-wrap justify-end gap-2 mb-4 print:hidden sticky top-0 bg-white/95 backdrop-blur z-20 py-2 border-b border-slate-100">
                            <button onClick={handleDownloadAllWord} title={isBulkMode ? "Download ALL as One Word File" : "Download Word"} className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 hover:shadow-md transition-all group flex items-center gap-1">
                                <Download size={18} /> {isBulkMode && <span className="text-xs font-bold">ALL</span>}
                            </button>
                            <button onClick={handleCopy} title="Copy Text" className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 hover:shadow-md transition-all flex items-center gap-1">
                                {copySuccess ? <Check size={18} /> : <Clipboard size={18} />}
                            </button>
                            <div className="h-8 w-px bg-slate-200 mx-1"></div>
                            <button onClick={generateCurrentKey} disabled={isKeyLoading} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm border transition-all ${isKeyLoading ? 'bg-purple-50 text-purple-400 border-purple-100' : 'bg-white text-purple-600 border-purple-100 hover:bg-purple-50 hover:border-purple-200 hover:shadow-md'}`}>
                                {isKeyLoading ? <RefreshCw className="animate-spin h-4 w-4" /> : <Key size={16} />} {activePaper.answerKey ? 'Refresh Key' : 'Key'}
                            </button>
                        </div>



                        {/* DYNAMIC HEADER SECTION */}
                        <div className="mb-8 text-center" dir="ltr">
                            <h2 className="text-xl font-bold font-serif text-slate-800 uppercase tracking-widest mb-1">
                                {activePaper.examMeta.department ?
                                    (activePaper.examMeta.department.toLowerCase().startsWith('department') ? activePaper.examMeta.department : `Department of ${activePaper.examMeta.department}`)
                                    : 'DEPARTMENT OF [NAME]'}
                            </h2>
                            <h1 className="text-3xl font-extrabold font-serif mb-6 text-black uppercase tracking-wide underline decoration-double decoration-2 underline-offset-4">
                                {activePaper.examMeta.examType}
                            </h1>

                            <div className="w-full font-serif text-sm font-bold text-black mt-4 border-b-2 border-black pb-4">
                                <div className="grid grid-cols-2 mb-2">
                                    <div className="flex items-center"><span className="w-28 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Subject</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.examMeta.subjectTitle}</span></div>
                                    <div className="flex items-center justify-end"><div className="flex items-center w-full max-w-[210px]"><span className="w-24 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Code</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.examMeta.subjectCode}</span></div></div>
                                </div>
                                <div className="grid grid-cols-2 mb-2">
                                    <div className="flex items-center"><span className="w-28 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Instructor</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.examMeta.instructorName}</span></div>
                                    <div className="flex items-center justify-end"><div className="flex items-center w-full max-w-[210px]"><span className="w-24 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Duration</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.examMeta.timeDuration}</span></div></div>
                                </div>
                                <div className="grid grid-cols-2 mb-2">
                                    <div className="flex items-center"><span className="w-28 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Semester</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.examMeta.semester} ({activePaper.examMeta.section})</span></div>
                                    <div className="flex items-center justify-end"><div className="flex items-center w-full max-w-[210px]"><span className="w-24 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Marks</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.paperPattern.totalMarks}</span></div></div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="flex items-center"><span className="w-28 uppercase text-slate-600 text-xs tracking-wider inline-block" style={{ textAlignLast: 'justify' }}>Date</span><span className="mr-2">:</span> <span className="text-base truncate">{activePaper.examMeta.paperDate}</span></div>
                                    <div className="pl-4"></div>
                                </div>
                            </div>
                        </div>

                        {activePaper.answerKey && (
                            <div className="mb-8 flex gap-1 p-1.5 bg-slate-100/80 backdrop-blur rounded-xl w-fit print:hidden border border-slate-200 mx-auto lg:mx-0">
                                <button onClick={() => setShowKey(false)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${!showKey ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-slate-200/50'}`}>Question Paper</button>
                                <button onClick={() => setShowKey(true)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${showKey ? 'bg-white shadow-sm text-purple-600' : 'text-slate-500 hover:bg-slate-200/50'}`}>Answer Key</button>
                            </div>
                        )}

                        <div className="prose max-w-none relative z-10 whitespace-pre-wrap font-serif text-slate-900 leading-relaxed print:text-black" style={{ direction: 'ltr', textAlign: 'left' }}>
                            {(showKey ? activePaper.answerKey : activePaper.generatedContent).split('\n').map((line, i) => {
                                const isHeader = line.toLowerCase().includes('section a') || line.toLowerCase().includes('section b') || line.toLowerCase().includes('section c');
                                const hasUrdu = /[\u0600-\u06FF]/.test(line);

                                if (isHeader) {
                                    const extraHeaderInfo = line.toLowerCase().includes('section a') ? ` (Time: ${activePaper.examMeta.mcqDuration})` : '';
                                    return (
                                        <div key={i} className="relative mt-8 mb-6 text-center print:mt-6 print:mb-4">
                                            <span className="bg-white px-4 relative z-10 font-bold text-lg uppercase tracking-widest border border-black py-1 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] print:shadow-none print:border-2 text-slate-900">
                                                {line.replace(/[*#]/g, '') + extraHeaderInfo}
                                            </span>
                                            <div className="absolute top-1/2 left-0 w-full h-px bg-slate-300 -z-0 print:hidden"></div>
                                        </div>
                                    );
                                }

                                const isMCQLine = line.includes('(A)') && line.includes('(B)');
                                const isUrduMCQLine = line.includes('(الف)') && line.includes('(ب)');

                                if (isMCQLine || isUrduMCQLine) {
                                    let parts = [];
                                    if (isMCQLine) {
                                        parts = line.split(/(?=\([A-D]\))/);
                                    } else {
                                        parts = line.split(/(?=\(الف\))|(?=\(ب\))|(?=\(ج\))|(?=\(د\))/);
                                    }

                                    if (parts.length > 1) {
                                        return (
                                            <div key={i} className={`w-full flex justify-between items-center mb-2 mt-1 px-1 print:flex ${hasUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
                                                {parts.map((part, idx) => (
                                                    <span key={idx} className={`block text-lg font-medium text-slate-900 print:text-black ${hasUrdu ? 'text-right font-nastaliq' : 'text-left'}`} dir={hasUrdu ? 'rtl' : 'ltr'}>
                                                        {part.replace(/[*#]/g, '')}
                                                    </span>
                                                ))}
                                            </div>
                                        );
                                    }
                                }

                                let alignmentClass = 'text-left';
                                let dir = 'ltr';
                                if (activePaper.languageMode === 'Urdu') {
                                    alignmentClass = 'text-right font-nastaliq leading-loose'; dir = 'rtl';
                                } else if (activePaper.languageMode === 'English') {
                                    alignmentClass = 'text-left';
                                } else {
                                    if (hasUrdu) { alignmentClass = 'text-right font-nastaliq leading-loose'; dir = 'rtl'; }
                                }

                                return (
                                    <p key={i} className={`w-full block text-lg font-medium mb-1 mt-2 text-slate-900 print:text-black ${alignmentClass} ${hasUrdu ? 'text-xl' : ''}`} dir={dir}>
                                        {line.replace(/[*#]/g, '')}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="mt-16 flex justify-between items-center print:flex w-full px-8">
                            <div className="w-[40%] border-t border-black pt-2 text-center font-bold">Instructor Signature</div>
                            <div className="w-[40%] border-t border-black pt-2 text-center font-bold">HOD Signature</div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-300 print:hidden">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            {activePaper.inputMode === 'Topic' ? <Lightbulb className="h-10 w-10 opacity-20 text-purple-400" /> : <Layers className="h-10 w-10 opacity-20" />}
                        </div>
                        <h3 className="text-xl font-bold text-slate-400">
                            {isBulkMode ? `Paper ${activePaperIndex + 1} Preview` : 'Exam Paper Preview'}
                        </h3>
                        <p className="text-sm mt-2 text-slate-400 opacity-70">
                            {isBulkMode ? 'Generate all papers to see them here.' : 'Generate paper to see it here.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
