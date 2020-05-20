#!/usr/bin/env node

const fs = require('fs');
const contents = process.argv.splice(2);
const data = JSON.parse(fs.readFileSync(contents[0], 'utf-8'));

let currentCount = 0
let currentTables = 0
let parties = []
let tables = []

data['parties'].forEach(party => {
  currentCount = party.count
  while (currentCount > 0) {
    parties.push(party.partyName)
    currentCount--
  }
})

data['tables'].forEach(table => {
  currentTables = table.numberOfSeats
  while (currentTables > 0) {
    tables.push(table.tableName)
    currentTables--
  }
})

if (parties.length > tables.length) {
  console.log(`We do not have enough seats!`)
} else {
  for (let i = 0; i < parties.length; i++) {
    console.log(`${parties[i]} at ${tables[i]}`)
  }
}


// console.log('data =', data);
