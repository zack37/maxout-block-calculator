const weights = [45, 35, 25, 10, 5, 2.5]

export const createPlateLabel = (n) => {
  return weights
    .map((weight) => {
      if (weight > n) {
        return null
      }

      const numberNeeded = Math.floor(n / weight)
      n %= weight
      return `${numberNeeded}x${weight}`
    })
    .filter((x) => x)
    .join(', ')
}
