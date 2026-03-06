const STORAGE_KEY = 'operatorCheckIns';

function getAllCheckIns(): Record<string, boolean> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function getCheckIn(opPublicId: string, operatorId: number): boolean {
  const checkIns = getAllCheckIns();
  return checkIns[`${operatorId}_${opPublicId}`] ?? false;
}

function setCheckIn(opPublicId: string, operatorId: number, checkedIn: boolean): void {
  const checkIns = getAllCheckIns();
  checkIns[`${operatorId}_${opPublicId}`] = checkedIn;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkIns));
}

export { getAllCheckIns, getCheckIn, setCheckIn };
