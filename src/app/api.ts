const fetchFrontEndChallengeData = async () => {
  try {
    const response = await fetch('https://frontend-challenge.veryableops.com/');
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { fetchFrontEndChallengeData };
