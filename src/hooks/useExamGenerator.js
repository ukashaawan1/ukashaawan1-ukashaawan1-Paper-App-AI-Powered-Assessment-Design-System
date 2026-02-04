import { useState, useRef } from 'react';
import { generateContent } from '../api/geminiApi';

export const initialPaperConfig = {
    sourceText: '',
    topic: '',
    fileData: null,
    fileName: '',
    inputMode: 'Content',
    languageMode: 'Bilingual',
    questionStyle: 'Simple',
    isOutcomeBased: false,
    examMeta: {
        examType: 'Mid Term Exam',
        department: '',
        subjectTitle: '',
        subjectCode: '',
        instructorName: '',
        semester: '1st',
        section: 'A',
        timeDuration: '90 Minutes',
        paperDate: new Date().toISOString().split('T')[0],
        mcqDuration: '20 Minutes'
    },
    paperPattern: {
        totalMarks: 50,
        mcqs: 10,
        shortQuestions: 5,
        longQuestions: 2,
        marksPerMcq: 1,
        marksPerShort: 4,
        marksPerLong: 10
    },
    difficulty: 'Medium',
    generatedContent: '',
    answerKey: ''
};

export function useExamGenerator() {
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [activePaperIndex, setActivePaperIndex] = useState(0);
    const [showSafetyModal, setShowSafetyModal] = useState(false);
    const [papers, setPapers] = useState([initialPaperConfig]);
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyLoading, setIsKeyLoading] = useState(false);
    const [error, setError] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const fileInputRef = useRef(null);

    const updatePaper = (field, value) => {
        const newPapers = [...papers];
        newPapers[activePaperIndex] = { ...newPapers[activePaperIndex], [field]: value };
        setPapers(newPapers);
    };

    const updateNestedPaper = (parentField, childField, value) => {
        const newPapers = [...papers];
        newPapers[activePaperIndex] = {
            ...newPapers[activePaperIndex],
            [parentField]: {
                ...newPapers[activePaperIndex][parentField],
                [childField]: value
            }
        };
        setPapers(newPapers);
    };

    const handleExamTypeChange = (type) => {
        let defaultTime = "3 Hours";
        let newPattern = { ...initialPaperConfig.paperPattern };
        let newIsOutcomeBased = false;

        if (type === "Mid Term Exam") {
            defaultTime = "90 Minutes";
            newPattern = { totalMarks: 50, mcqs: 10, shortQuestions: 5, longQuestions: 2, marksPerMcq: 1, marksPerShort: 4, marksPerLong: 10 };
        } else if (type === "Final Term Exam") {
            defaultTime = "3 Hours";
            newPattern = { totalMarks: 100, mcqs: 20, shortQuestions: 10, longQuestions: 4, marksPerMcq: 1, marksPerShort: 4, marksPerLong: 10 };
        } else if (type === "Quiz") {
            defaultTime = "20 Minutes";
            // Quiz: Max 10 Marks. Usually MCQs or Short Qs.
            newPattern = { totalMarks: 10, mcqs: 4, shortQuestions: 2, longQuestions: 0, marksPerMcq: 1, marksPerShort: 3, marksPerLong: 0 };
        } else if (type === "Class Test") {
            defaultTime = "45 Minutes";
            // Class Test: ~25-30 Marks
            newPattern = { totalMarks: 25, mcqs: 5, shortQuestions: 5, longQuestions: 1, marksPerMcq: 1, marksPerShort: 2, marksPerLong: 10 };
        } else if (type === "Assignment") {
            defaultTime = "3 Days";
            // Assignment: Max 15 Marks. Usually Long/Scenario based. Outcome based strictly? Maybe.
            newPattern = { totalMarks: 15, mcqs: 0, shortQuestions: 0, longQuestions: 3, marksPerMcq: 0, marksPerShort: 0, marksPerLong: 5 };
            newIsOutcomeBased = true; // Assignments often cover CLOs
        }

        const newPapers = [...papers];
        newPapers[activePaperIndex] = {
            ...newPapers[activePaperIndex],
            examMeta: {
                ...newPapers[activePaperIndex].examMeta,
                examType: type,
                timeDuration: defaultTime
            },
            paperPattern: newPattern,
            isOutcomeBased: type === "Assignment" ? true : newPapers[activePaperIndex].isOutcomeBased
        };
        setPapers(newPapers);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/pdf' || file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result.split(',')[1];
                    const newPapers = [...papers];
                    newPapers[activePaperIndex] = {
                        ...newPapers[activePaperIndex],
                        fileData: { inlineData: { data: base64String, mimeType: file.type } },
                        fileName: file.name,
                        sourceText: ''
                    };
                    setPapers(newPapers);
                };
                reader.readAsDataURL(file);
            } else {
                setError('Currently only PDF or Text files are supported.');
            }
        }
    };

    const clearFile = () => {
        const newPapers = [...papers];
        newPapers[activePaperIndex] = { ...newPapers[activePaperIndex], fileData: null, fileName: '' };
        setPapers(newPapers);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleBulkCountChange = (e) => {
        const count = parseInt(e.target.value) || 1;
        if (count > 10) return;
        let newPapers = [...papers];
        if (count > papers.length) {
            for (let i = papers.length; i < count; i++) {
                newPapers.push(initialPaperConfig);
            }
        } else if (count < papers.length) {
            newPapers = newPapers.slice(0, count);
        }
        setPapers(newPapers);
        if (activePaperIndex >= count) setActivePaperIndex(count - 1);
    };

    const constructPrompt = (paperConfig) => {
        let langInstruction = paperConfig.languageMode === 'Bilingual'
            ? "1. English Question First on one line.\n2. Urdu Translation immediately on NEXT line.\n3. Do NOT mix English/Urdu on same line."
            : paperConfig.languageMode === 'English' ? "Write all questions in English Only."
                : "Write all questions in Urdu Only.";

        let styleInstruction = paperConfig.questionStyle === 'Scenario'
            ? "Create Scenario-based / Conceptual questions. Use case studies."
            : "Create Simple / Direct / Definition-based questions.";

        let outcomeInstruction = "";
        if (paperConfig.isOutcomeBased) {
            outcomeInstruction = "IMPORTANT REQUIREMENT: For EVERY single question (MCQ, Short, Long), append a realistic CLO (Course Learning Outcome) and PLO (Program Learning Outcome) tag at the very end of the English text line. Format: `[CLO-1, PLO-2]`. Vary the numbers logically.";
        }

        let sectionsPrompt = "";
        let templatePrompt = "";
        const { mcqs, shortQuestions, longQuestions, marksPerShort, marksPerLong } = paperConfig.paperPattern;
        const activeSections = (mcqs > 0 ? 1 : 0) + (shortQuestions > 0 ? 1 : 0) + (longQuestions > 0 ? 1 : 0);
        const showHeaders = activeSections > 1;

        if (mcqs > 0) {
            const header = showHeaders ? "SECTION A: Multiple Choice Questions\n" : "";
            sectionsPrompt += showHeaders ? `- Section A: ${mcqs} MCQs.\n` : `- ${mcqs} MCQs.\n`;
            templatePrompt += `${header}1. [Question Text] ${paperConfig.isOutcomeBased ? '[CLO-X, PLO-Y]' : ''}\n(A) Option 1 (B) Option 2 (C) Option 3 (D) Option 4\n${paperConfig.languageMode === 'Bilingual' ? 'سوال 1: [اردو ترجمہ]\n(الف) ... (ب) ... (ج) ... (د) ...' : ''}\n\n`;
        }
        if (shortQuestions > 0) {
            let sectionTitle = "SECTION B: Short Questions";
            if (activeSections === 1 && paperConfig.examMeta.examType === 'Assignment') sectionTitle = "ASSIGNMENT";

            const header = showHeaders ? `${sectionTitle}\n` : "";
            // Note: For Assignment single section, user might want NO header if it matches title.
            // If showHeaders is false, we print nothing.

            sectionsPrompt += showHeaders ? `- ${sectionTitle}: ${shortQuestions} Questions.\n` : `- ${shortQuestions} Short Questions.\n`;
            templatePrompt += `${header}Question No. 1: [Question Text] (${marksPerShort} Marks) ${paperConfig.isOutcomeBased ? '[CLO-X, PLO-Y]' : ''}\n${paperConfig.languageMode === 'Bilingual' ? 'سوال 1: [اردو ترجمہ]' : ''}\n\n`;
        }
        if (longQuestions > 0) {
            let sectionTitle = "SECTION C: Long Questions";
            if (activeSections === 1 && paperConfig.examMeta.examType === 'Assignment') sectionTitle = "ASSIGNMENT";

            const header = showHeaders ? `${sectionTitle}\n` : "";

            sectionsPrompt += showHeaders ? `- ${sectionTitle}: ${longQuestions} Questions.\n` : `- ${longQuestions} Long Questions.\n`;
            templatePrompt += `${header}Question No. 1: [Question Text] (${marksPerLong} Marks) ${paperConfig.isOutcomeBased ? '[CLO-X, PLO-Y]' : ''}\n${paperConfig.languageMode === 'Bilingual' ? 'سوال 1: [اردو ترجمہ]' : ''}\n\n`;
        }

        return `
      Act as an expert academic exam creator.
      ${paperConfig.inputMode === 'Topic' ? `TOPIC: "${paperConfig.topic}".` : `Based on provided content.`}
      
      Exam Context:
      - Type: ${paperConfig.examMeta.examType}
      - Subject: ${paperConfig.examMeta.subjectTitle} (${paperConfig.examMeta.subjectCode})
      
      Pattern:
      - Total Marks: ${paperConfig.paperPattern.totalMarks}
      - Level: ${paperConfig.difficulty}
      - Style: ${styleInstruction}
      
      REQUIRED SECTIONS (Only generate these):
      ${sectionsPrompt}

      LANGUAGE RULES:
      ${langInstruction}

      FORMATTING RULES:
      1. No markdown symbols (*, #).
      2. **USE ENGLISH NUMERALS (1, 2, 3)** for ALL numbering.
      3. **MCQ OPTIONS**: Keep options **VERY SHORT**. Format strictly: "(A) ... (B) ... (C) ... (D) ..." so they fit on one line.
      4. **QUESTIONS LABELS**: Use "Question No. 1:", "Question No. 2:" format.
      5. **MARKS**: Clearly write "(${marksPerShort} Marks)" at the end of each Short Question and "(${marksPerLong} Marks)" for Long Questions.
      6. If a section has 0 questions, DO NOT generate that section header.
      7. ${outcomeInstruction}
      
      STANDARD INSTRUCTIONS:
      1. DO NOT include any introductory or concluding remarks (e.g., "Here is the exam", "I hope this helps").
      2. Start DIRECTLY with the exam content (e.g., Header or Section A).
      3. Return ONLY the raw exam content.
      
      Template:
      ${templatePrompt}
    `;
    };

    const generateAllPapers = async () => {
        setIsLoading(true);
        setError('');
        setShowKey(false);

        const updatedPapers = [...papers];

        for (let i = 0; i < updatedPapers.length; i++) {
            try {
                const paperConfig = updatedPapers[i];
                if (paperConfig.inputMode === 'Content' && !paperConfig.sourceText.trim() && !paperConfig.fileData) {
                    throw new Error("Content is missing");
                }
                if (paperConfig.inputMode === 'Topic' && !paperConfig.topic.trim()) {
                    throw new Error("Topic is missing");
                }

                const promptText = constructPrompt(paperConfig);
                let contents = [];
                if (paperConfig.inputMode === 'Topic') {
                    contents = [{ parts: [{ text: promptText }] }];
                } else {
                    if (paperConfig.fileData) {
                        contents = [{ parts: [{ text: promptText }, paperConfig.fileData] }];
                    } else {
                        contents = [{ parts: [{ text: promptText + `\n\n**Source Text:**\n"${paperConfig.sourceText}"` }] }];
                    }
                }

                const result = await generateContent(contents);
                updatedPapers[i].generatedContent = result;
            } catch (err) {
                setError(`Paper ${i + 1} Error: ${err.message}`);
                break;
            }
        }

        setPapers(updatedPapers);
        setIsLoading(false);
    };

    const generateCurrentKey = async () => {
        const current = papers[activePaperIndex];
        if (!current.generatedContent) return;
        setIsKeyLoading(true);

        try {
            const prompt = `Generate Answer Key. Language: ${current.languageMode}. No markdown. Content: ${current.generatedContent}`;
            const result = await generateContent([{ parts: [{ text: prompt }] }]);

            const newPapers = [...papers];
            newPapers[activePaperIndex].answerKey = result;
            setPapers(newPapers);
            setShowKey(true);

        } catch (err) {
            setError('Key Error: ' + err.message);
        } finally {
            setIsKeyLoading(false);
        }
    };

    const handleCopy = () => {
        const active = papers[activePaperIndex];
        navigator.clipboard.writeText(showKey ? active.answerKey : active.generatedContent);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return {
        isBulkMode, setIsBulkMode,
        activePaperIndex, setActivePaperIndex,
        showSafetyModal, setShowSafetyModal,
        papers, setPapers,
        isLoading, isKeyLoading,
        error, setError,
        showKey, setShowKey,
        copySuccess, setCopySuccess,
        fileInputRef,
        updatePaper, updateNestedPaper,
        handleExamTypeChange, handleFileChange,
        clearFile, handleBulkCountChange,
        generateAllPapers, generateCurrentKey,
        handleCopy
    };
}
