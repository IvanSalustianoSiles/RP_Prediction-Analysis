import fs from "fs";
import { a_object } from "./a_file.js";
import { t_object } from "./t_file.js";
let m_object = {
  638: [18, 2]
}

let sumatoria = 0;
let m_elementA = 0;
let m_elementB = 0;
let t_element = 0;
let a_element = 0;
// const M = (n) => {
//   m_elementA = parseInt(T(n) / 3000);
//   m_elementB = (T(n) / 3000) - m_elementA;
//   if (m_elementB > 0 && m_elementB < 0.34) {
//     m_elementB = 1;
//   } else if (m_elementB >= 0.34 && m_elementB < 0.67) {
//     m_elementB = 2;
//   } else {
//     m_elementB = 0;
//     m_elementA++;
//   }
//   m_object = {...m_object, [`${n}`]: [m_elementA, m_elementB]};
  
//   return [m_elementA, m_elementB];
// }
// const T = (nF = 0, nI = 638) => {
//   if (nF == 638) {
//     return t_object[`${nF}`];
//   }
//   t_element = T(nI) + 50 * (nF - nI);
//   return t_element;
// }
const A = (nF, nI = 638) => {
  if (nF == 638) {
    return a_object[`${nF}`];
  }
  sumatoria = 0;
  for (let i = nI; i <= nF - 1; i++) {
    sumatoria = sumatoria + T(i);
  }
  a_element = A(nI) + sumatoria;

  return a_element;
}


const M = (n) => {
  m_elementA = parseInt(t_object[`${n}`] / 3000);
  m_elementB = (t_object[`${n}`] / 3000) - m_elementA;
  if (m_elementB > 0 && m_elementB < 0.34) {
    m_elementB = 1;
  } else if (m_elementB >= 0.34 && m_elementB < 0.67) {
    m_elementB = 2;
  } else {
    m_elementB = 0;
    m_elementA++;
  }
  
  return [m_elementA, m_elementB];
}


// Carga de objetos
for (let i = 1; i <= 8000; i++) {
  // t_object = {...t_object, [`${i}`]: T(i)};
  // a_object = {...a_object, [`${i}`]: A(i)};
  m_object = {...m_object, [`${i}`]: M(i)};
}

// Escritura de archivos
// fs.writeFileSync("./t_file.json", JSON.stringify(t_object));
fs.writeFileSync("./m_file.json", JSON.stringify(m_object));
