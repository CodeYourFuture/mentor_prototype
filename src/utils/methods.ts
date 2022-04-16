export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function sleep(throttle = 1000) {
  return new Promise((r) => setTimeout(r, throttle));
}
