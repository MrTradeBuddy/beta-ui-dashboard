const fetchSignal = async () => {
  try {
    const response = await fetch("https://mt5-autotrade-server.onrender.com/last-signal");
    const data = await response.json();

    if (response.ok && data?.payload) {
      setSignal(data);
      setError(null);
    } else {
      throw new Error("Invalid or empty signal data");
    }
  } catch (error) {
    console.error("❌ Signal fetch failed:", error.message);
    setError("📡 Unable to fetch live signal. Please try again shortly.");
  }
};
