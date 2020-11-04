// TODOS ARE IN ALL CAPS AND WILL BE DELETED WHEN COMPLETED 
// explanations are in lower case and will stay

import {generator} from "./modules/generator.mjs";
import {interactor} from "./modules/interactor.mjs";

let version = "0.1.0";

console.log("Version: " + version + " - Loaded");


// generator.load();
// console.log(generator.loaded);

let nums = generator.load();
interactor.load(nums);


