import moment from 'moment';

export type OpsDataType = ReturnType<typeof createOpsData>

type OperationalDataType = {
  opTitle: string;
  publicId: string;
  operatorsNeeded: number;
  startTime: string;
  endTime: string;
  operators: OperatorsDataType[];
}

type OperatorsDataType = {
  id: number;
  firstName: string;
  lastName: string;
  opsCompleted: number;
  reliability: number;
  endorsements: string[];
  fullName?: string;
}

function createOpsData({ opTitle, publicId, operatorsNeeded, startTime, endTime, operators }: OperationalDataType) {
  return {
    opTitle,
    publicId,
    operatorsNeeded,
    startTime: moment(startTime).format('h:mm a'),
    endTime: moment(endTime).format('h:mm a'),
    operators: operators.map((operator: OperatorsDataType) => ({
      ...operator,
      fullName: `${operator.firstName} ${operator.lastName}`,
      reliability: operator.reliability * 100,
    })),
  };
}

function sanitizedOperationalData(data: Array<{}>): Array<OpsDataType> {
  return data.map((item) => {
    const { opTitle, publicId, operatorsNeeded, startTime, endTime, operators } = item as OperationalDataType;
    return createOpsData({ opTitle, publicId, operatorsNeeded, startTime, endTime, operators });;
  });
}

export { createOpsData, sanitizedOperationalData };
