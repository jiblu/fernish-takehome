#!/usr/bin/env node

const fs = require('fs');
const contents = process.argv.splice(2);
const data = JSON.parse(fs.readFileSync(contents[0], 'utf-8'));

const partiesCount = data.parties.reduce((tot, curr) => {
  return curr.count + tot
}, 0)

const seatsCount = data.tables.reduce((tot, curr) => {
  return curr.numberOfSeats + tot
}, 0)

let deductSeat = function(tableName, count) {
  let table = data.tables.filter(t => {
    return t.tableName === tableName
  })
  if (count > table.numberOfSeats) {
    return false
  } else {
    table.numberOfSeats -= count
  }
}

let tableIndex = 0

if (partiesCount > seatsCount) {
  console.log(`We do not have enough seats!`)
} else {
  for (let i = 0; i < data.parties.length; i++) {
    let party = data.parties[i]
    if (party.hasOwnProperty('tableSeed')) {
      if (!deductSeat(party.tableSeed, party.count)) {
        console.log(`${party.tableSeed} does not have enough seats!`)
      } else {
        while (party.count > 0) {
          console.log(`${party.partyName} at ${party.tableSeed}`)
          party.count--
        }
      }
      deductSeat(party.tableSeed, party.count)
    } else {
      if (party.count === 1) {
        i++
        if (data.tables[tableIndex].numberOfSeats === 1) {
          tableIndex++
        }
      }
      console.log(`${party.partyName} at ${data.tables[tableIndex].tableName}`)
      i--
      party.count--
      data.tables[tableIndex].numberOfSeats--
    }
  }
}
