import fs from "fs";
import { a_object } from "./a_file.js";
let t_object = {};
let distance_msg_array = [];
let distance_array = [];
for (let i = 1; i <= 8000; i++) {
  let t_element = a_object[`${i+1}`] - a_object[`${i}`];
  if (!t_element) {
    t_element = t_object[`${i-1}`] + 50;
  }
  t_object = {...t_object, [`${i}`]: t_element};
  distance_msg_array[i] = `Entre el RP que cuesta el nivel ${Object.keys(a_object)[`${i-1}`]} y el nivel ${Object.keys(a_object)[`${i}`]}, hay una diferencia de ${t_object[`${i}`] - t_object[`${i-1}`]}`;
  distance_array[i] = t_object[`${i}`] - t_object[`${i-1}`];
}

fs.writeFileSync("./t_file.json", JSON.stringify(t_object));