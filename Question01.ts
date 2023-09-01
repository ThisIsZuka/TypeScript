function getClockAngle(hh_mm: string): any {
  // split house min
  let [hour, minute] = hh_mm.split(":").map(Number);

  // Degree in 1 house
  let hourInRing: number = 360 / 12;

  // Degree in 1 min
  let minInRing: number = 360 / 60;

  // Degree in 1 min on 1 house
  let minInHose: number = hourInRing / 60;

  let calMin: number = minute * minInRing;

  let calHour: number = hour * hourInRing + minute * minInHose;

  let calDistance: number = calHour - calMin;

  let ans: number = calDistance > 180 ? 360 - calDistance : calDistance;
  console.log(ans);
  // 0 <= return value <= 180
  return ans;
}

getClockAngle("17:48");
