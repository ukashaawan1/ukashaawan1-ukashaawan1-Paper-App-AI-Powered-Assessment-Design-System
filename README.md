# Paper App

## Introduction
The **Paper App** is a cutting-edge, AI-powered educational tool designed to revolutionize the way examination papers are created. This system empowers educators to generate high-quality, outcome-based, and bilingual (English & Urdu) exam papers in seconds. It allows institutions to maintain academic standards, align assessments with learning outcomes, and save valuable time.

## Key Features

### 1. Dual-Language Support (Bilingual)
- **Seamless English & Urdu Integration:** The system natively supports both English and Urdu languages. It handles right-to-left (RTL) text alignment for Urdu automatically using `Nastaliq` fonts, ensuring professional formatting.
- **Mixed Mode:** Generate papers that contain both English and Urdu questions, perfect for diverse educational environments.

### 2. Outcome-Based Education (OBE) & Bloom's Taxonomy
- **CLO & PLO Alignment:** Seamless integration of Course and Program Learning Outcomes.
- **Bloom's Taxonomy:** Questions are structurally mapped to Bloom's Cognitive Levels (Reminder, Understand, Apply, Analyze, Evaluate, Create).
- **Smart Tagging:** Every generated question includes appropriate `[CLO-X, PLO-Y]` tags automatically.

### 3. AI-Powered Generation
- **Topic-Based Generation:** Simply enter a list of topics or an outline, and the AI generates relevant questions (MCQs, Short, and Long questions).
- **Content-Based Generation:** Upload course notes, PDFs, or text files. The AI analyzes the content to create questions that are directly directly derived from the source material.
- **Context Awareness:** The generator understands context and creates cognitive-level appropriate questions.

### 4. Advanced Bulk Generation Mode
- **Mass Production:** Generate multiple distinct sets of papers (e.g., 5, 10, or more versions) at once for large classes or question banks.
- **Variation:** Ensure fairness and reduce cheating by providing different exam versions to students, all covering the same core concepts.

### 5. Smart Exam Modes & Logic
- **Specialized Formats:**
    - **Assignments:** Defaults to Long/Scenario questions ("Assignments Pattern") with professional cover sheets.
    - **Quizzes:** Defaults to MCQs/Short questions ("Quiz Pattern") with simplified headers (no "Section" breaks for single-type papers).
    - **Mid/Final Exams:** Full standard patterns with multiple sections (A, B, C).
- **Intelligent Defaults:** The system automatically selects appropriate time durations, marks, and question distributions based on the chosen Exam Type.

### 6. Interactive Preview & Editing
- **Real-Time Preview:** View the generated paper exactly as it will appear when printed.
- **Answer Key Generation:** Automatically generates accurate answer keys for all objective and subjective questions.
- **One-Click Export:** Export the final papers and answer keys to Microsoft Word (.doc) format for final adjustments and printing.

### 7. Modern & Responsive UI
- **Glassmorphism Design:** A visually stunning, modern interface featuring glassmorphism effects, smooth gradients, and intuitive navigation.
- **Print-Ready:** The output is optimized for printing, with designated spaces for student details, examiner signatures, and proper branding.

## Technology Stack
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **AI Engine:** Google Gemini API
- **Desktop Wrapper:** Electron (optional capability)

## Future Roadmap
- Integration with Learning Management Systems (LMS).
- Advanced analytics for student performance tracking based on generated assessments.
- Real-time collaboration for faculty members.

---
*Developed by Zahoor Ahmed using gemeni 3*
