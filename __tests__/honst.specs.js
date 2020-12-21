const _ = require("lodash");
const { honst } = require("../src/index");

describe("integrity", () => {
  test("fix data integrity according to given field, given pivot", () => {
    const data = [
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
      { username: "johndoe", name: "John", surname: "Doe", age: "25" },
    ];

    const newData = honst({
      data,
      pivot: 0,
      rules: {
        name: ["username"],
        surname: ["username"],
        age: ["username"],
      },
      delta: true,
    });

    expect(newData.data).toEqual([
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
    ]);
    expect(newData.delta).toEqual([
      {
        candidatePath: "age",
        falseValue: "25",
        candidateValue: "22",
        pivot: 0,
        candidateIndex: 1,
      },
    ]);
  });

  test("fix data integrity according to given field, scan", () => {
    const data = [
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
      { username: "johndoe", name: "John", surname: "Doe", age: "25" },
      { username: "johndoe2", name: "John", surname: "Appleseed", age: "22" },
      { username: "johndoe2", name: "John", surname: "Doez", age: "33" },
    ];

    const newData = honst({
      data,
      pivot: "scan",
      rules: {
        name: ["username"],
        surname: ["username"],
        age: ["username"],
      },
      delta: true,
    });

    expect(newData.data).toEqual([
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
      { username: "johndoe2", name: "John", surname: "Appleseed", age: "22" },
      { username: "johndoe2", name: "John", surname: "Appleseed", age: "22" },
    ]);
    expect(newData.delta).toEqual([
      {
        candidateIndex: 1,
        candidatePath: "age",
        candidateValue: "22",
        falseValue: "25",
        pivot: 0,
      },
      {
        candidateIndex: 3,
        candidatePath: "surname",
        candidateValue: "Appleseed",
        falseValue: "Doez",
        pivot: 2,
      },
      {
        candidateIndex: 3,
        candidatePath: "age",
        candidateValue: "22",
        falseValue: "33",
        pivot: 2,
      },
    ]);
  });

  test("fix data integrity according to given field, scan reversed", () => {
    const data = [
      { username: "johndoe", name: "John", surname: "Doe", age: "22" },
      { username: "johndoe", name: "John", surname: "Doe", age: "25" },
      { username: "johndoe2", name: "John", surname: "Appleseed", age: "22" },
      { username: "johndoe2", name: "John", surname: "Doez", age: "33" },
    ];

    const newData = honst({
      data,
      pivot: "reverse-scan",
      rules: {
        name: ["username"],
        surname: ["username"],
        age: ["username"],
      },
      delta: true,
    });

    expect(newData.data).toEqual([
      { username: "johndoe", name: "John", surname: "Doe", age: "25" },
      { username: "johndoe", name: "John", surname: "Doe", age: "25" },
      { username: "johndoe2", name: "John", surname: "Doez", age: "33" },
      { username: "johndoe2", name: "John", surname: "Doez", age: "33" },
    ]);
    expect(newData.delta).toEqual([
      {
        candidateIndex: 2,
        candidatePath: "surname",
        candidateValue: "Doez",
        falseValue: "Appleseed",
        pivot: 3,
      },
      {
        candidateIndex: 2,
        candidatePath: "age",
        candidateValue: "33",
        falseValue: "22",
        pivot: 3,
      },
      {
        candidateIndex: 0,
        candidatePath: "age",
        candidateValue: "25",
        falseValue: "22",
        pivot: 1,
      },
    ]);
  });
});
