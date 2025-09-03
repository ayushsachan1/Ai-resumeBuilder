
# AI Resume Builder

An intelligent, web-based resume builder designed to help you craft a professional and effective resume with the power of AI. This application offers multiple templates, real-time previews, and AI-powered tools to analyze and improve your content, ensuring it's optimized for modern Applicant Tracking Systems (ATS).

 <!-- It's recommended to add a screenshot of the app here -->

## ✨ Key Features

- **Live Resume Preview**: See your changes instantly as you type, rendered in your chosen template.
- **Multiple Professional Templates**: Choose from several distinct styles to match your personality and industry:
    - **Modern**: A clean, two-column layout.
    - **Classic**: A timeless, single-column, serif-font design.
    - **Creative**: A stylish design with a colored sidebar to make your resume stand out.
- **Color Customization**: Personalize your resume by selecting from a palette of professional accent colors.
- **AI-Powered ATS Analyzer**:
    - Paste a job description to get an ATS score out of 100.
    - Receive a detailed breakdown of strengths, actionable suggestions for improvement, and a list of relevant skills you might be missing.
- **AI Content Improvement**:
    - Enhance your professional summary and job descriptions with a single click. The AI rewrites your text to be more impactful and concise.
- **Interactive Editor**:
    - **Drag & Drop Skills**: Easily reorder your skills to prioritize the most relevant ones.
    - **Skill Auto-suggestions**: Get suggestions for common skills as you type.
    - **Collapsible Sections**: Keep your workspace tidy with accordion-style sections for experience and education.
- **GitHub Integration**: A dedicated field to add your GitHub profile, which appears as a clickable link in the resume.
- **A4 PDF Download**: Export your final resume as a high-quality, A4-formatted PDF, ready for job applications.

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API (`@google/genai`) for ATS analysis and content generation.
- **PDF Generation**: `jsPDF` & `html2canvas` to accurately convert the HTML preview to a downloadable PDF.
- **Icons**: `lucide-react` for a clean and modern icon set.
- **No Backend Needed**: The application runs entirely in the browser.

## 🚀 How to Use

1.  **Fill in Your Details**: Start by entering your personal information, including your name, contact details, and links to your LinkedIn, website, or GitHub profiles.
2.  **Craft Your Summary**: Write a compelling professional summary. If you get stuck, click the ✨ **Improve with AI** button to have the AI assistant refine it for you.
3.  **Add Experience & Education**:
    - Click "Add Experience" or "Add Education" to create new entries.
    - Each entry is a collapsible item. Click on the header to expand and edit the details.
    - Use the AI helper button within each experience entry to improve your job descriptions.
4.  **List Your Skills**:
    - Add your skills one by one. As you type, the editor will suggest common skills.
    - Click and drag the grip icon (`⠿`) to reorder skills.
5.  **Customize Your Resume**:
    - Use the **Controls** panel above the editor to select a `Template` (Modern, Classic, or Creative).
    - Choose an `Accent Color` to personalize the look and feel.
6.  **Analyze with the ATS Tool**:
    - Click the **ATS Score** button in the header.
    - Paste the full job description of a role you're interested in into the text area.
    - Click **Analyze Resume**. The AI will provide a score and detailed feedback.
7.  **Download Your Resume**:
    - Once you're happy with the result, click the **Download PDF** button. Your resume will be saved in A4 format.

## ⚙️ Local Development (Optional)

To run this project locally, you would typically follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/ai-resume-builder.git
    cd ai-resume-builder
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add your Google Gemini API key to the file:
      ```
      API_KEY=your_gemini_api_key_here
      ```
4.  **Run the development server**:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.
