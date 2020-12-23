const { honst } = require("./index");

const data = [
  { username: "johndoe", name: "John", surname: "Doe", age: "22" },
  { username: "johndoe", name: "John", surname: "Doez", age: "25" },
  { username: "appleseed", name: "John", surname: "Apple", age: "25" },
  { username: "appleseed", name: "John", surname: "Appleseed", age: "22" },
]

const rules = {
  name: ["username"],
  surname: ["username"],
  age: ["username"]
}

// pivot scan
const pivotscan = honst({
  data,
  rules,
  pivot: 'scan'
})
console.log('pivotscan => ', pivotscan)


// pivot reverse scan
const pivotreversescan = honst({
  data,
  rules,
  pivot: 'reverse-scan'
})
console.log('pivotreversescan => ', pivotreversescan)

// pivot 0
const pivotzero = honst({
  data,
  rules,
  pivot: 0
})
console.log('pivotzero => ', pivotzero)


// pivot 1
const pivotone = honst({
  data,
  rules,
  pivot: 1
})
console.log('pivotone => ', pivotone)


// with delta result
const pivotwithdelta = honst({
  data,
  rules,
  pivot: 'scan',
  delta: true
})
console.log({ pivotwithdelta })


/**
 pivotscan = {
  data: [
    { username: 'johndoe', name: 'John', surname: 'Doe', age: '22' },
    { username: 'johndoe', name: 'John', surname: 'Doe', age: '22' },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Apple',
      age: '25'
    },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Apple',
      age: '25'
    }
  ],
  delta: undefined
}
* 
*/


/**
  pivotreversescan = {
  data: [
    { username: 'johndoe', name: 'John', surname: 'Doez', age: '25' },
    { username: 'johndoe', name: 'John', surname: 'Doez', age: '25' },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Appleseed',
      age: '22'
    },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Appleseed',
      age: '22'
    }
  ],
  delta: undefined
}
 */


/**
 * pivotzero = {
  data: [
    { username: 'johndoe', name: 'John', surname: 'Doe', age: '22' },
    { username: 'johndoe', name: 'John', surname: 'Doe', age: '22' },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Apple',
      age: '25'
    },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Appleseed',
      age: '22'
    }
  ],
  delta: undefined
}
 */



/**
 * pivotone = {
  data: [
    { username: 'johndoe', name: 'John', surname: 'Doez', age: '25' },
    { username: 'johndoe', name: 'John', surname: 'Doez', age: '25' },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Apple',
      age: '25'
    },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Appleseed',
      age: '22'
    }
  ],
  delta: undefined
}
 */



/**
 * 
 * pivotwithdelta = {
  data: [
    { username: 'johndoe', name: 'John', surname: 'Doe', age: '22' },
    { username: 'johndoe', name: 'John', surname: 'Doe', age: '22' },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Apple',
      age: '25'
    },
    {
      username: 'appleseed',
      name: 'John',
      surname: 'Apple',
      age: '25'
    }
  ],
  delta: [
    {
      candidatePath: 'surname',
      falseValue: 'Doez',
      candidateValue: 'Doe',
      pivot: 0,
      candidateIndex: 1
    },
    {
      candidatePath: 'age',
      falseValue: '25',
      candidateValue: '22',
      pivot: 0,
      candidateIndex: 1
    },
    {
      candidatePath: 'surname',
      falseValue: 'Appleseed',
      candidateValue: 'Apple',
      pivot: 2,
      candidateIndex: 3
    },
    {
      candidatePath: 'age',
      falseValue: '22',
      candidateValue: '25',
      pivot: 2,
      candidateIndex: 3
    }
  ]
}
 */
