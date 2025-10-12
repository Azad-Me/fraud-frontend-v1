const fetchRandomTransaction = async () => {
    const BASE_URL=process.env.BASE_URL
  setIsLoading(true);
  try {
    const response = await fetch(`${BASE_URL}/predictions/random_data`, );
    const data = await response.json();
    setRandomTransaction(data);
    setShowSingleModal(true);
    setPredictionResult(null);
  } catch (error) {
    console.error('Error fetching random transaction:', error);
    alert('Failed to fetch transaction data. Please try again.');
  } finally {
    setIsLoading(false);
  }
};