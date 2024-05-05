import fs from "fs";
import { a_object } from "./a_file.js";
import { t_object } from "./t_file.js";
import { m_object } from "./m_file.js";
let sumatoria = 0;
let m_elementA = 0;
let m_elementB = 0;
let t_element = 0;
let a_element = 0;

// TAMN (Total, Alcanzado, Misiones, Nivel)

const myRounding = (toRound, a, b) => {
  if (a || b) {
    switch (true) {
      case b > 0 && b < 0.34:
        b = 1;
      break;
      case b >= 0.34 && b < 0.67:
        b = 2;
      break;
      case b >= 0.67:
        b = 0;
        a++;
      break;
    }
    return [a, b];
  } else {
    let decimalPart = toRound - parseInt(toRound);
    switch (true) {
      case decimalPart < 0.09:
        toRound = parseInt(toRound);
      break;
      case decimalPart < 0.19:
        toRound = parseInt(toRound) + 0.1;
      break;
      case decimalPart < 0.29:
        toRound = parseInt(toRound) + 0.2;
      break;
      case decimalPart < 0.39:
        toRound = parseInt(toRound) + 0.3;
      break;
      case decimalPart < 0.49:
        toRound = parseInt(toRound) + 0.4;
      break;
      case decimalPart < 0.59:
        toRound = parseInt(toRound) + 0.5;
      break;
      case decimalPart < 0.69:
        toRound = parseInt(toRound) + 0.6;
      break;
      case decimalPart < 0.79:
        toRound = parseInt(toRound) + 0.7;
      break;
      case decimalPart < 0.89:
        toRound = parseInt(toRound) + 0.8;
      break;
      case decimalPart < 0.99 || decimalPart >= 0.99:
        toRound = parseInt(toRound) + 0.9;
      break;
    }
    return toRound;
  }
}
const T = (nF, nI = 98) => {
  if (nF > 98) {
    t_element = T(nI) + 50 * (nF - nI);
    return t_element;
  } else {
    return t_object[nF];
  }
}
const A = (nF, nI = 98) => {
  if (nF > 98) {
    sumatoria = 0;
    for (let i = nI; i <= nF - 1; i++) {
      sumatoria = sumatoria + T(i);
    }
    a_element = A(nI) + sumatoria;
    return a_element;
  } else {
    return a_object[nF];
  }
}

const M = (n) => {
  if (n === `${n}`) {
    return n;
  } else {
    m_elementA = parseInt(T(n) / 3000);
    m_elementB = (T(n) / 3000) - m_elementA;
    return myRounding(false, m_elementA, m_elementB);
  }
}
const N = (RP, roadTo, merch) => {
  for (let i = 1; i <= 8000; i++) {
    if (RP >= A(i) && RP < A(i+1)) {
      let level = i;
      let fraction = (RP - A(i)) / T(i);
      let rectangulos = fraction * 10;
      rectangulos = myRounding(rectangulos);
      let firstMsg;
      if (rectangulos != 0) {
        firstMsg = `${level} y ${rectangulos} rectángulos`;
      } else {
        firstMsg = level;
      }
      let bigDiffMerchA = parseInt((A(+roadTo === roadTo ? roadTo : (i + 1)) - RP) / 3000);
      let bigDiffMerchB = (A(+roadTo === roadTo ? roadTo : (i + 1)) - RP) / 3000 - bigDiffMerchA;
      let roundedDiffMerch = myRounding(false, bigDiffMerchA, bigDiffMerchB);
      let merchMsg = roundedDiffMerch[1] == 0 ? `${roundedDiffMerch[0]} misiones de mercancía especial` : roundedDiffMerch[1] == 1 ? `${roundedDiffMerch[0]} misiones de mercancía especial y una caja` : `${roundedDiffMerch[0]} misiones de mercancía especial y ${roundedDiffMerch[1]} cajas`;
      if (+roadTo === roadTo) {
        let diffLevel = roadTo - level;
        if (merch) {
          return `${firstMsg}. Faltan ${diffLevel} niveles para el nivel ${roadTo}, específicamente ${merchMsg}.`;
        } else {
          let bigDiffRP = A(roadTo) - RP;
          return `${firstMsg}. Faltan ${diffLevel} niveles para el nivel ${roadTo}, específicamente ${bigDiffRP}RP.`;
        }
      } else if (roadTo) {
        let diffrectangulos = 10 - rectangulos;
        diffrectangulos = myRounding(diffrectangulos);
        let diffRP = A(i+1) - RP;
        if (merch) {
          return `${firstMsg}. Falta ${diffRP}RP para el nivel ${level+1}, es decir, ${merchMsg}.`;
        } else {
          return `${firstMsg}. Falta ${diffRP}RP para el nivel ${level+1}, es decir, ${diffrectangulos} rectángulos.`;
        }
      } else {
        return firstMsg === +firstMsg ? firstMsg : firstMsg+".";
      }
    }
  }
};

// Carga de objetos
// for (let i = 1; i <= 8000; i++) {
//   t_object = {...t_object, [`${i}`]: T(i)};
//   a_object = {...a_object, [`${i}`]: A(i)};
//   m_object = {...m_object, [`${i}`]: M(i)};
// }

// Escritura de archivos
// fs.writeFileSync("./t_file.json", JSON.stringify(t_object));
// fs.writeFileSync("./m_file.json", JSON.stringify(m_object));
