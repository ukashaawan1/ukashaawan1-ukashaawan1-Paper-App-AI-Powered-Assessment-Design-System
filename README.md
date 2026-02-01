# Paper App

## Introduction
The **Paper App** is a cutting-edge, AI-powered educational tool designed to revolutionize the way examination papers are created. This system empowers educators to generate high-quality, outcome-based, and bilingual (English & Urdu) exam papers in seconds. It allows institutions to maintain academic standards, align assessments with learning outcomes, and save valuable time.

## Key Features

### 1. Dual-Language Support (Bilingual)
- **Seamless English & Urdu Integration:** The system natively supports both English and Urdu languages. It handles right-to-left (RTL) text alignment for Urdu automatically using `Nastaliq` fonts, ensuring professional formatting.
- **Mixed Mode:** Generate papers that contain both English and Urdu questions, perfect for diverse educational environments.

### 2. Outcome-Based Education (OBE) Integration
- **CLO & PLO Alignment:** The system allows for the integration of Course Learning Outcomes (CLOs) and Program Learning Outcomes (PLOs).
- **Tagging System:** Questions can be tagged with specific outcomes, ensuring that assessments validly measure student progress against defined academic goals.

### 3. AI-Powered Generation
- **Topic-Based Generation:** Simply enter a list of topics or an outline, and the AI generates relevant questions (MCQs, Short, and Long questions).
- **Content-Based Generation:** Upload course notes, PDFs, or text files. The AI analyzes the content to create questions that are directly directly derived from the source material.
- **Bloom's Taxonomy Levels:** The generator is tuned to create questions across different cognitive levels (Knowledge, Comprehension, Application, Analysis).

### 4. Advanced Bulk Generation Mode
- **Mass Production:** Generate multiple distinct sets of papers (e.g., 5, 10, or more versions) at once for large classes or question banks.
- **Variation:** Ensure fairness and reduce cheating by providing different exam versions to students, all covering the same core concepts.

### 5. Flexible Paper Patterns & Customization
- **Exam Types:** Supports various formats including Mid-Term, Final-Term, Quizzes, Class Tests, and Assignments.
- **Customizable Layout:** Adjust the number of MCQs, Short Questions, and Long Questions.
- **Time & Difficulty:** Set specific time durations and difficulty levels (Easy, Medium, Hard).

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
## Environment Variables

Create a `.env` file in the project root:

VITE_GEMINI_API_KEY=your_gemini_api_key_here

---
*Developed by Zahoor Ahmed using google gemini and antigravity*
