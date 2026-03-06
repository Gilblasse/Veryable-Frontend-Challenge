const OPERATOR_HEADERS = [
  { headerTitle: 'Full Name', dataIndex: 'fullName' as const },
  { headerTitle: 'Ops Completed', dataIndex: 'opsCompleted' as const },
  { headerTitle: 'Reliability', dataIndex: 'reliability' as const },
  { headerTitle: 'Endorsements', dataIndex: 'endorsements' as const },
];

const EXPAND_HEADER = { headerTitle: '', align: 'left' as const };

const DATA_HEADERS = [
  { headerTitle: 'Title', align: 'left' as const, dataIndex: 'opTitle' as const },
  { headerTitle: 'Public ID', align: 'right' as const, dataIndex: 'publicId' as const },
  { headerTitle: 'Operators Needed', align: 'right' as const, dataIndex: 'operatorsNeeded' as const },
  { headerTitle: 'Start Time', align: 'right' as const, dataIndex: 'startTime' as const },
  { headerTitle: 'End Time', align: 'right' as const, dataIndex: 'endTime' as const },
];

const TABLE_HEADERS = [
  EXPAND_HEADER,
  ...DATA_HEADERS,
];

export { DATA_HEADERS, EXPAND_HEADER, OPERATOR_HEADERS, TABLE_HEADERS };
