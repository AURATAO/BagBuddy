function makeDateDifference(firstDate, secondDate) {
  const fromMilliToDays = 1000 * 60 * 60 * 24;

  if (!firstDate || !secondDate) {
    console("first or second date is/are null");
    return;
  }

  try {
    return Math.floor((secondDate - firstDate) / fromMilliToDays);
  } catch (error) {
    console.log(error);
    return;
  }
}
