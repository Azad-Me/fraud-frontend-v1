import React, { useState } from 'react';
import CSVUploadComponent from './CSVUpload';
import GenAIAnalysisResults from './AIAnalysis';


const Dashboard = () => {
  const BASE_URL = "https://nxi6hhz6bfclhjg5y62rgkpir40xuoxa.lambda-url.ap-south-1.on.aws";
  const [selectedMode, setSelectedMode] = useState(null);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [csvFileStatus, setCSVFileStatus] = useState(false);
  const [randomTransaction, setRandomTransaction] = useState(null);
  const [batchTransactions, setBatchTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [batchLoading, setBatchLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [batchResult, setBatchResult] = useState(null);
  const [jobHistory, setJobHistory] = useState([]);
  const [aitrans, setAITransaction] = useState(false);
  const [activeBatchTab, setActiveBatchTab] = useState('generate'); // 'generate' or 'history'
  const [numberOfTransactions, setNumberOfTransactions] = useState(10);

  // Mock metrics data
  const metrics = [
    {
      title: 'Model Accuracy',
      value: '92.6343%',
      // change: '+12%',
      // trend: 'up',
      icon: (
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Precision',
      value: '89%',
      // change: '-5%',
      // trend: 'down',
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    {
      title: 'Recall',
      value: '93%',
      // change: '+0.3%',
      // trend: 'up',
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'F1 Score',
      value: '91%',
      // change: '-0.2s',
      // trend: 'down',
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'ROC-AUC',
      value: '96%',
      // change: '-0.2s',
      // trend: 'down',
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const recentAlerts = [
    { id: 1, transaction: 'TX-7891', amount: '$1,247.00', status: 'High Risk', time: '2 min ago' },
    { id: 2, transaction: 'TX-7890', amount: '$89.99', status: 'Medium Risk', time: '5 min ago' },
    { id: 3, transaction: 'TX-7889', amount: '$2,450.00', status: 'High Risk', time: '12 min ago' },
    { id: 4, transaction: 'TX-7888', amount: '$156.75', status: 'Low Risk', time: '18 min ago' }
  ];

  // Fetch random transaction data for single prediction
  const fetchRandomTransaction = async () => {
    setIsLoading(true);
    try {
      console.log(BASE_URL);
      const response = await fetch(`${BASE_URL}/predictions/random_data`);
      const data = await response.json();
      console.log(data);
      setRandomTransaction(data.data[0]);
      setShowSingleModal(true);
      setPredictionResult(null);
    } catch (error) {
      console.error('Error fetching random transaction:', error);
      alert('Failed to fetch transaction data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch batch random transactions from backend
  const fetchBatchRandomTransactions = async (count = 10) => {
    setBatchLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/predictions/random_data?count=${count}`);
      const data = await response.json();
      console.log('Batch transactions:', data);
      setBatchTransactions(data.data || data);
      setBatchResult(null);
    } catch (error) {
      console.error('Error fetching batch transactions:', error);
      alert('Failed to fetch batch transactions. Please try again.');
    } finally {
      setBatchLoading(false);
    }
  };

  // Fetch job history (mock data for now)
  const fetchJobHistory = async () => {
    setBatchLoading(true);
    try {
      // Mock job history data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));


      const response = await fetch(`${BASE_URL}/list_batch_history`);
      const data = await response.json();
      console.log('Batch transactions:', data);
      setBatchTransactions(data.data || data);
      setBatchResult(null);
      const mockHistory = data.data.map((transaction) => {
        return {
          jobId: transaction?.job_id,
          status: transaction?.status,
          totalTransactions: transaction.batch_size,
          // fraudDetected: null,
          inputPath: "batch/" + transaction?.input_path,
          processedAt: transaction?.created_at,
          processingTime: transaction?.updated_at
        };
      }
      )
      setJobHistory(mockHistory);
    } catch (error) {
      console.error('Error fetching job history:', error);
      alert('Failed to fetch job history. Please try again.');
    } finally {
      setBatchLoading(false);
    }
  };

  const handleSinglePrediction = () => {
    fetchRandomTransaction();
  };

  const handleBatchPrediction = () => {
    setShowBatchModal(true);
    setActiveBatchTab('generate');
    fetchBatchRandomTransactions(numberOfTransactions);
  };

  const handleAnalyzeTransaction = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(randomTransaction)
      });
      const data = await response.json();
      console.log(data);

      const riskScore = data.label;
      let result;
      if (riskScore) {
        result = { status: 'High Risk', confidence: data.prediction, color: 'red', transData: data.feature_data };
      } else if (riskScore >= 60) {
        result = { status: 'Medium Risk', confidence: data.prediction, color: 'yellow', transData: data.feature_data };
      } else {
        result = { status: 'Low Risk', confidence: data.prediction, color: 'green', transData: data.feature_data };
      }

      setPredictionResult(result);
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      alert('Failed to analyze transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessBatch = async () => {
    setBatchLoading(true);
    try {
      const payload = {
        batch_data: batchTransactions
      };

      console.log('Sending batch payload:', payload);

      const response = await fetch(`${BASE_URL}/batch_predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('Batch prediction result:', data);

      // Process the results
      const processedResults = data.results || data;
      const highRiskCount = processedResults.filter(t => t.predicted_status === 'High Risk' || t.label === 1).length;
      const mediumRiskCount = processedResults.filter(t => t.predicted_status === 'Medium Risk').length;
      const lowRiskCount = processedResults.filter(t => t.predicted_status === 'Low Risk' || t.label === 0).length;

      const batchResult = {
        total_processed: processedResults.length,
        high_risk_count: highRiskCount,
        medium_risk_count: mediumRiskCount,
        low_risk_count: lowRiskCount,
        fraud_rate: ((highRiskCount / processedResults.length) * 100).toFixed(2),
        processing_time: '2.3s',
        transactions: processedResults,
        job_id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`
      };

      setBatchResult(batchResult);

      // Add to job history
      setJobHistory(prev => [{
        jobId: batchResult.job_id,
        status: 'Completed',
        totalTransactions: batchResult.total_processed,
        fraudDetected: batchResult.high_risk_count,
        processedAt: new Date().toISOString(),
        processingTime: batchResult.processing_time
      }, ...prev]);

    } catch (error) {
      console.error('Error processing batch:', error);
      alert('Failed to process batch. Please try again.');
    } finally {
      setBatchLoading(false);
    }
  };

  const handleNewTransaction = () => {
    fetchRandomTransaction();
  };

  const handleGenerateNewBatch = () => {
    fetchBatchRandomTransactions(numberOfTransactions);
  };

  const closeModals = () => {
    setShowSingleModal(false);
    setShowBatchModal(false);
    setRandomTransaction(null);
    setBatchTransactions([]);
    setPredictionResult(null);
    setBatchResult(null);
  };

  const handleBatchTabChange = (tab) => {
    setActiveBatchTab(tab);
    if (tab === 'history') {
      fetchJobHistory();
    } else if (tab === 'file') {
      setCSVFileStatus(true);
    }
  };

  const handleClickJobid = (jobId) => {
    console.log(jobId);
  }

  const handleAiTransaction = () => {
    setAITransaction(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Fraud Detection System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, Admin</span>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
                  {/* <p className={`text-sm mt-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last week
                  </p> */}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selection Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Prediction Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Single Prediction Card */}
            <div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-blue-300"
              onClick={handleSinglePrediction}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Single Prediction</h3>
              <p className="text-gray-600 mb-4">
                Analyze individual transactions for potential fraud with automatically generated test data.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• Auto-filled random transaction data</li>
                <li>• Real-time fraud analysis</li>
                <li>• Instant risk assessment</li>
              </ul>
              <button
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Loading...' : 'Start Single Prediction'}
              </button>
            </div>

            {/* Batch Prediction Card */}
            <div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-green-300"
              onClick={handleBatchPrediction}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9h4m-4 4h4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Batch Prediction</h3>
              <p className="text-gray-600 mb-4">
                Process multiple transactions with auto-generated data or check status of previous jobs.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• Generate random transaction batches</li>
                <li>• Bulk fraud detection processing</li>
                <li>• View job history and status</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium">
                Start Batch Prediction
              </button>
            </div>
          </div>
        </div>

        {/* Recent Alerts Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.transaction}</p>
                    <p className="text-sm text-gray-600">{alert.amount}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${alert.status === 'High Risk'
                      ? 'bg-red-100 text-red-800'
                      : alert.status === 'Medium Risk'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                      }`}>
                      {alert.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              View All Alerts
            </button>
          </div>
        </div>
      </main>

      {/* Single Prediction Modal */}
      {showSingleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Single Transaction Analysis</h2>
              <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {showSingleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-900">Single Transaction Analysis</h2>
                      <button
                        onClick={closeModals}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-6">
                      {randomTransaction && (
                        <div className="space-y-6">
                          {/* Transaction Details */}
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.Transaction_ID}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.User_ID}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">${randomTransaction.Transaction_Amount}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.Transaction_Type}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Merchant</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.Merchant_Name}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.Location}, {randomTransaction.Transaction_Country}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Device</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.Device_Type} ({randomTransaction.Device_OS})</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm">{randomTransaction.Card_Type} - {randomTransaction.Card_Brand}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Score</label>
                                <div className="p-2 bg-gray-50 rounded border text-sm font-semibold">{randomTransaction.Risk_Score}</div>
                              </div>
                            </div>
                          </div>

                          {/* Additional Information */}
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Account Balance:</span>
                                  <span className="font-medium">${randomTransaction.Account_Balance}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Authentication:</span>
                                  <span className="font-medium">{randomTransaction.Authentication_Method}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Customer Segment:</span>
                                  <span className="font-medium">{randomTransaction.Customer_Segment}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Daily Transactions:</span>
                                  <span className="font-medium">{randomTransaction.Daily_Transaction_Count}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Avg Transaction (7d):</span>
                                  <span className="font-medium">${randomTransaction.Avg_Transaction_Amount_7d}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Card Age (months):</span>
                                  <span className="font-medium">{randomTransaction.Card_Age}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Prediction Result */}
                          {predictionResult && (
                            <div className={`p-4 rounded-lg border ${predictionResult.color === 'red'
                              ? 'bg-red-50 border-red-200'
                              : predictionResult.color === 'yellow'
                                ? 'bg-yellow-50 border-yellow-200'
                                : 'bg-green-50 border-green-200'
                              }`}>
                              <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className={`text-lg font-bold ${predictionResult.color === 'red'
                                    ? 'text-red-800'
                                    : predictionResult.color === 'yellow'
                                      ? 'text-yellow-800'
                                      : 'text-green-800'
                                    }`}>
                                    {predictionResult.status}
                                  </span>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Confidence: {predictionResult.confidence}%
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    Transaction ID: {randomTransaction.Transaction_ID}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Amount: ${randomTransaction.Transaction_Amount}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex space-x-4 pt-4">
                            <button
                              onClick={handleNewTransaction}
                              className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                            >
                              Load New Transaction
                            </button>
                            {predictionResult && <button
                              onClick={handleAiTransaction}
                              className="flex-1 bg-red-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                            >
                              AI Risk Analysis
                            </button>}
                            <button
                              onClick={handleAnalyzeTransaction}
                              disabled={isLoading}
                              className={`flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                              {isLoading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Analyzing...
                                </>
                              ) : (
                                'Analyze for Fraud'
                              )
                              }
                            </button>
                          </div>
                        </div>
                      )}
                      {aitrans && <GenAIAnalysisResults isLoading={isLoading} transData={predictionResult.transData} />}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )
      }

      {/* Batch Prediction Modal */}
      {
        showBatchModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Batch Transaction Analysis</h2>
                <button onClick={closeModals} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Batch Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => handleBatchTabChange('generate')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeBatchTab === 'generate'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Generate Batch
                  </button>
                  <button
                    onClick={() => handleBatchTabChange('history')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeBatchTab === 'history'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Job History
                  </button>
                  <button
                    onClick={() => handleBatchTabChange('file')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeBatchTab === 'file'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    Upload File
                  </button>
                </nav>
              </div>

              {activeBatchTab === 'file' && (
                <CSVUploadComponent />
              )
              }

              <div className="p-6">
                {/* Generate Batch Tab */}
                {activeBatchTab === 'generate' && (
                  <div className="space-y-6">
                    {!batchResult ? (
                      <>
                        {/* Batch Configuration */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Batch Configuration</h3>
                          <div className="flex items-center space-x-4">
                            <div className='flex flex-col'>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Transactions
                              </label>
                              <select
                                value={numberOfTransactions}
                                onChange={(e) => setNumberOfTransactions(parseInt(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                              >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>
                            </div>
                            <button
                              onClick={handleGenerateNewBatch}
                              disabled={batchLoading}
                              className="mt-6 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                            >
                              {batchLoading ? 'Generating...' : 'Generate New Batch'}
                            </button>
                          </div>
                        </div>

                        {/* Batch Transactions Preview */}
                        {batchTransactions.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                              Generated Transactions ({batchTransactions.length} transactions)
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Merchant</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Risk Score</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {batchTransactions.map((transaction, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                      <td className="px-4 py-2 text-sm font-mono">{transaction.Transaction_ID}</td>
                                      <td className="px-4 py-2 text-sm">${transaction.Transaction_Amount}</td>
                                      <td className="px-4 py-2 text-sm">{transaction.Transaction_Type}</td>
                                      <td className="px-4 py-2 text-sm">{transaction.Merchant_Name}</td>
                                      <td className="px-4 py-2 text-sm">{transaction.Location}</td>
                                      <td className="px-4 py-2 text-sm">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${transaction.Risk_Score >= 80
                                          ? 'bg-red-100 text-red-800'
                                          : transaction.Risk_Score >= 60
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                          }`}>
                                          {transaction.Risk_Score}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* Process Batch Button */}
                        {batchTransactions.length > 0 && (
                          <div className="flex justify-center">
                            <button
                              onClick={handleProcessBatch}
                              disabled={batchLoading}
                              className={`bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium ${batchLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {batchLoading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing Batch...
                                </>
                              ) : (
                                'Process Batch for Fraud Detection'
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Batch Results */
                      <div className="space-y-6">
                        {/* Batch Summary */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-green-800 mb-4">Batch Processing Complete</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{batchResult.total_processed}</div>
                              <div className="text-sm text-gray-600">Total Processed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-600">{batchResult.high_risk_count}</div>
                              <div className="text-sm text-gray-600">High Risk</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-yellow-600">{batchResult.medium_risk_count}</div>
                              <div className="text-sm text-gray-600">Medium Risk</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{batchResult.low_risk_count}</div>
                              <div className="text-sm text-gray-600">Low Risk</div>
                            </div>
                          </div>
                          <div className="mt-4 text-center">
                            <p className="text-sm text-gray-600">
                              Fraud Rate: <span className="font-semibold">{batchResult.fraud_rate}%</span> |
                              Processing Time: <span className="font-semibold">{batchResult.processing_time}</span> |
                              Job ID: <span className="font-semibold">{batchResult.job_id}</span>
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons for Results */}
                        <div className="flex space-x-4">
                          <button
                            onClick={handleGenerateNewBatch}
                            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                          >
                            Process New Batch
                          </button>
                          <button
                            onClick={() => alert('Export functionality would be implemented here')}
                            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                          >
                            Export Results
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Job History Tab */}
                {activeBatchTab === 'history' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium text-gray-900">Previous Job History</h3>
                    {batchLoading ? (
                      <div className="text-center py-8">
                        <svg className="animate-spin mx-auto h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Loading job history...</p>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job ID</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transactions</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fraud Detected</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Processed At</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed At</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {jobHistory.map((job, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className={`x-6 py-4 text-sm font-mono text-blue-600 ${job.status === "completed" && "hover:underline cursor-pointer"}`} onClick={() => handleClickJobid(job.jobId)}>{job.jobId}</td>
                                <td className="px-6 py-4 text-sm">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'completed'
                                    ? 'bg-green-100 text-green-800'
                                    : job.status === 'Processing'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                    }`}>
                                    {job.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{job.totalTransactions}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                  {job.inputPath !== null ? job.inputPath : '-'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {new Date(job.processedAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {new Date(job.processingTime).toLocaleString() || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {jobHistory.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            No job history found.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Dashboard;