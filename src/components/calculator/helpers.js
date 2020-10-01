const weights = [45, 35, 25, 10, 5, 2.5]

export const createPlateLabel = (n) => {
  const result = []

  for (const weight of weights) {
    if (weight > n) {
      continue
    }

    const numberNeeded = Math.floor(n / weight)

    result.push(`${numberNeeded}x${weight}`)
    n %= weight
  }

  return result.join(', ')
}
