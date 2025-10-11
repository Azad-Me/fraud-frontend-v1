import React, { useState } from 'react';

const Dashboard = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [randomTransaction, setRandomTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  // Mock metrics data
  const metrics = [
    {
      title: 'Total Transactions',
      value: '12,487',
      change: '+12%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Fraud Detected',
      value: '47',
      change: '-5%',
      trend: 'down',
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    {
      title: 'Accuracy Rate',
      value: '98.7%',
      change: '+0.3%',
      trend: 'up',
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Avg Response Time',
      value: '0.8s',
      change: '-0.2s',
      trend: 'down',
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

  // Fetch random transaction data
  const fetchRandomTransaction = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with your actual API endpoint
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "Transaction_ID": 605760,
            "User_ID": 2843,
            "Transaction_Amount": 1081.85,
            "Transaction_Type": "ATM",
            "Timestamp": "2024-10-02T08:26:00",
            "Transaction_Hour": 8,
            "Account_Balance": 9985.77,
            "Device_Type": "Desktop",
            "Device_OS": "iOS",
            "Location": "Berlin",
            "Transaction_Country": "Australia",
            "Merchant_Category": "Fuel",
            "Merchant_Name": "Amazon",
            "Merchant_Category_Code": "3334",
            "Transaction_Status": "Pending",
            "IP_Address_Flag": 0,
            "Previous_Fraudulent_Activity": 0,
            "Daily_Transaction_Count": 5,
            "Avg_Transaction_Amount_7d": 1128.49,
            "Failed_Transaction_Count_7d": 0,
            "Card_Type": "Debit",
            "Card_Brand": "MasterCard",
            "Card_Age": 55,
            "Transaction_Distance": 77.5,
            "Authentication_Method": "Biometric",
            "Risk_Score": 87.64,
            "Is_Weekend": 0,
            "Customer_Segment": "Premium",
            "Email_Domain": "outlook.com",
            "Card_Issuer_Bank": "SBI"
          });
        }, 1000);
      });
      
      setRandomTransaction(response);
      setShowSingleModal(true);
      setPredictionResult(null);
    } catch (error) {
      console.error('Error fetching random transaction:', error);
      alert('Failed to fetch transaction data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSinglePrediction = () => {
    fetchRandomTransaction();
  };

  const handleAnalyzeTransaction = async () => {
    setIsLoading(true);
    try {
      // Simulate fraud analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock prediction result based on risk score
      const riskScore = randomTransaction.Risk_Score;
      let result;
      if (riskScore >= 80) {
        result = { status: 'High Risk', confidence: riskScore, color: 'red' };
      } else if (riskScore >= 60) {
        result = { status: 'Medium Risk', confidence: riskScore, color: 'yellow' };
      } else {
        result = { status: 'Low Risk', confidence: riskScore, color: 'green' };
      }
      
      setPredictionResult(result);
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      alert('Failed to analyze transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTransaction = () => {
    fetchRandomTransaction();
  };

  const closeModal = () => {
    setShowSingleModal(false);
    setRandomTransaction(null);
    setPredictionResult(null);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
                  <p className={`text-sm mt-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} from last week
                  </p>
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
                Analyze individual transactions for potential fraud with automatically generated test data. Perfect for immediate verification.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• Auto-filled random transaction data</li>
                <li>• Real-time fraud analysis</li>
                <li>• Instant risk assessment</li>
                <li>• Detailed transaction insights</li>
              </ul>
              <button 
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Loading Transaction...' : 'Start Single Prediction'}
              </button>
            </div>

            {/* Batch Prediction Card */}
            <div 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-green-300"
              onClick={() => setSelectedMode('batch')}
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
                Process multiple transactions at once by uploading a CSV file. Ideal for daily transaction reviews and bulk analysis.
              </p>
              <ul className="text-sm text-gray-500 space-y-1 mb-4">
                <li>• Bulk transaction processing</li>
                <li>• CSV file upload</li>
                <li>• Comprehensive report</li>
                <li>• Batch results export</li>
              </ul>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium">
                Select Batch Prediction
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.status === 'High Risk' 
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
              <button
                onClick={closeModal}
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
                    <div className={`p-4 rounded-lg border ${
                      predictionResult.color === 'red' 
                        ? 'bg-red-50 border-red-200' 
                        : predictionResult.color === 'yellow'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-green-50 border-green-200'
                    }`}>
                      <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`text-lg font-bold ${
                            predictionResult.color === 'red' 
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
                    <button
                      onClick={handleAnalyzeTransaction}
                      disabled={isLoading}
                      className={`flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
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
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;