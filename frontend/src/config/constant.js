export const getTopRanker = (traineeData = [], graphData = []) => {
  const index = graphData?.indexOf(Math.max(...graphData)) || 0;
  return traineeData[index]?.assignedTrainee || {};
};

export const getDaysBetweenDates = (traineeInterval, startDate, endDate) => {
  const now = startDate;
  const dates = [];

  if (traineeInterval === 'Bi-Weekly') {
    while (now.isSameOrBefore(endDate)) {
      const d = {};
      d.start = now.format('MMMM Do, YYYY');
      const diff = endDate.diff(now, 'days');
      now.add(diff >= 13 ? 13 : diff, 'days');
      d.end = now.format('MMMM Do, YYYY');
      dates.push(d);
      now.add(1, 'days');
    }
  }
  while (now.isSameOrBefore(endDate)) {
    const d = {};
    d.start = now.format('MMMM Do, YYYY');
    const diff = endDate.diff(now, 'days');
    now.add(diff >= 7 ? 7 : diff, 'days');
    d.end = now.format('MMMM Do, YYYY');
    dates.push(d);
    now.add(1, 'days');
  }
  return dates;
};

export const getProgress = (data) => {
  const newStartDate = new Date(data[0]?.startDate);
  const newEndDate = new Date(data[0]?.endDate);
  const today = new Date();
  const total = newEndDate - newStartDate;
  const progress = today - newStartDate;
  return parseInt(Math.round((progress / total) * 100)) > 100
    ? 100
    : parseInt(Math.round((progress / total) * 100));
};

export const handleOnTableDataSort = (value, order) => (a, b) => {
  if (order === 'asc') {
    if (a[value] > b[value]) return 1;
    if (a[value] < b[value]) return -1;
  } else {
    if (a[value] < b[value]) return 1;
    if (a[value] > b[value]) return -1;
  }
  return 0;
};

export const defaultRatings = [0, 0, 0, 0, 0, 0, 0];

export const steps = [
  'Upload Batch Details',
  'Assign Reviewers',
  'Preview Batch',
];

export const feedbackInterval = ['Bi-Weekly', 'Weekly'];
