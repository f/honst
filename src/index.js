const {
  get,
  set,
  pick,
  forIn,
  forEach,
  matches,
  cloneDeep,
  findIndex,
} = require("lodash");

const REVERSE_SCAN = "reverse-scan";
const SCAN = "scan";

function scan(reversed, data, rules, delta) {
  let scanData = data;
  let scanDelta = delta ? [] : undefined;

  for (let pivotIndex = 0; pivotIndex < data.length; pivotIndex++) {
    let convertedIndex = pivotIndex;
    if (reversed) {
      convertedIndex = data.length - pivotIndex - 1;
    }
    const pivotScan = honst({
      data: scanData,
      pivot: convertedIndex,
      rules,
      delta,
    });
    scanData = pivotScan.data;
    if (delta) {
      scanDelta = scanDelta.concat(pivotScan.delta).filter(Boolean);
    }
  }

  return {
    data: scanData,
    delta: scanDelta,
  };
}

/**
 * Fixes data integrity
 *
 * @param data: Object[]
 * @param pivot: number|"scan"|"reverse-scan"
 * @param rules: Record<string, string[]>
 * @param delta: boolean
 * @returns {{data: Object[], delta: Object[]}}
 */
function honst({ data, pivot, rules, delta }) {
  if ([SCAN, REVERSE_SCAN].includes(pivot)) {
    return scan(pivot === REVERSE_SCAN, data, rules, delta);
  }

  const candidateData = cloneDeep(data);
  const pivotRow = candidateData[pivot];
  const candidateDelta = delta ? [] : undefined;

  forIn(rules, (fixedPaths, candidateKey) => {
    const pivotValues = pick(pivotRow, fixedPaths);
    forEach(candidateData, (row, candidateIndex) => {
      const candidateRow = candidateData[candidateIndex];
      const dataMatchesPivot = findIndex([row], matches(pivotValues)) >= 0;
      const candidateValue = get(candidateRow, candidateKey);
      const pivotValue = get(pivotRow, candidateKey);

      if (!dataMatchesPivot || candidateValue === pivotValue) return;

      if (pivotValue) {
        set(candidateRow, candidateKey, pivotValue);
      } else {
        set(pivotRow, candidateKey, candidateValue);
      }

      if (delta) {
        candidateDelta.push({
          candidatePath: candidateKey,
          falseValue: candidateValue,
          candidateValue: pivotValue,
          pivot,
          candidateIndex,
        });
      }
    });
  });

  return {
    data: candidateData,
    delta: candidateDelta,
  };
}

module.exports = {
  honst,
};
