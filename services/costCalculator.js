function calculate (cityFrom, cityTo, totalCost, min, cityFromIndex, costTable) {
  if (!cityTo || (cityTo && !cityTo.length)) {
    if (totalCost < min) {
      min = totalCost
    }
    return min
  }
  for (let index = 0; index < cityTo.length; index++) {
    const city = cityTo[index]
    const cityToCopy = Object.assign([], cityTo).filter(c => c !== cityTo[index])
    const currentCost = totalCost + costTable[cityFrom[cityFromIndex]][city]
    min = calculate(cityFrom, cityToCopy, currentCost, min, cityFromIndex + 1, costTable)
  }
  return min
}

function initAndCall () {
  const costTable = {
    'Jaipur': {
      'Delhi': 2500,
      'Kerala': 4000,
      'Mumbai': 3500
    },
    'Pune': {
      'Delhi': 4000,
      'Kerala': 6000,
      'Mumbai': 3500
    },
    'Bangalore': {
      'Delhi': 2000,
      'Kerala': 4000,
      'Mumbai': 2500
    }
  }
  const cityFrom = Object.keys(costTable)
  const cityTo = Object.keys(costTable[cityFrom[0]])

  let totalCost = 0
  let min = Number.MAX_SAFE_INTEGER
  let index = 0
  if (cityFrom.length !== cityTo.length) {
    throw new Error('Invalid input')
  }

  const minCost = calculate(cityFrom, cityTo, totalCost, min, index, costTable)
  console.log(minCost)
}

setTimeout(() => {
  initAndCall()
}, 2000)
