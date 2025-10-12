import { useState } from 'react';

const CSVUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [jobId, setJobId] = useState(null);
    const [error, setError] = useState('');

    // Replace with your actual API endpoint
    const FRAUD_DETECTION_API = "http://13.234.239.45:8000";

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
                setError('Please select a valid CSV file');
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError('');
            setJobId(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        setIsUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(FRAUD_DETECTION_API + "/batch-preprocess", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            // Assuming the API returns { jobId: 'string' }
            if (result?.job_id && result?.job_id) {
                setJobId(result.job_id);
                setError('');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to upload file. Please try again.'
            );
            setJobId(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setJobId(null);
        setError('');
    };

    return (
        <div className="max-w-md mx-auto m-4 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">CSV Fraud Detection Upload</h2>

            {/* File Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select CSV File
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                />
            </div>

            {/* Selected File Info */}
            {selectedFile && (
                <div className="mb-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                        <span className="font-semibold">Selected file:</span> {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                        Size: {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium
          ${!selectedFile || isUploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
            >
                {isUploading ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                    </div>
                ) : (
                    'Upload for Fraud Detection'
                )}
            </button>

            {/* Reset Button */}
            {(selectedFile || jobId || error) && !isUploading && (
                <button
                    onClick={handleReset}
                    className="w-full mt-3 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Reset
                </button>
            )}

            {/* Job ID Display */}
            {jobId && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Upload Successful!</h3>
                    <p className="text-sm text-blue-700">
                        <span className="font-medium">Job ID:</span>
                    </p>
                    <div className="mt-2 p-2 bg-white rounded border border-blue-200">
                        <code className="text-sm text-blue-900 break-all">{jobId}</code>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">
                        Save this Job ID to check the processing status later.
                    </p>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-800 font-medium">Error</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
            )}
        </div>
    );
};

export default CSVUploadComponent;