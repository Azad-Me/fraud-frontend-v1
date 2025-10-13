import React from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";


const GenAIAnalysisResults = ({ isLoading,transData }) => {

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({apiKey: "AIzaSyAkhBGfcpR0OthYmbY8EjJKNDux4qu6IXw"});
    const [analysis, setAnalysis] = React.useState(null);
    console.log(transData)
    async function callGemini() {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyse the risk associated with this transaction, consider the keys associated with it are 
            actual metrics values for various deviations.
            ${JSON.stringify(transData, null, 2)}
            `,
        });
        // console.log(response.text);
        setAnalysis(response.text);
    }
    

    if (isLoading) {
        return (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
                <div className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 text-purple-600 mr-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-lg font-medium text-purple-600">GenAI is analyzing...</span>
                </div>
            </div>
        );
    }



    return (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
            <div className="flex items-center mb-4">
                <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">GenAI Risk Analysis</h3>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <ReactMarkdown>{analysis}</ReactMarkdown>
                {/* <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {analysis}
                </div> */}
            </div>
        <button onClick={callGemini}>Call Gemini</button>
            <div className="text-xs text-gray-500 text-center mt-3">
                Generated on {new Date().toLocaleString()}
            </div>
        </div>
    );
};

export default GenAIAnalysisResults;