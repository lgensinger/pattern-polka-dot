import test from "ava";

import { configuration, configurationDimension } from "../src/configuration.js";
import { PolkaDotPattern } from "../src/index.js";

/******************** EMPTY VARIABLES ********************/

// initialize
let pd = new PolkaDotPattern();

// TEST INIT //
test("init", t => {

    t.true(pd.unit != null);

});

// TEST GENERATE //
test("generate", t => {

    // clear document
    document.body.innerHTML = "";

    // generate an svg artboard
    let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tag.setAttributeNS(null, "id", "artboard");
    tag.setAttributeNS(null, "width", 100);
    tag.setAttributeNS(null, "height", 100);
    document.body.appendChild(tag);

    // get generated element
    let artboard = document.querySelector("#artboard");

    // generate pattern inside artboard
    pd.generate(artboard, "test");

    // get generated pattern
    let pattern = document.querySelector("#test");

    t.true(pattern !== undefined);
    t.true(pattern.nodeName == "pattern");

});

/******************** DECLARED PARAMS ********************/

let unit = 25;

// initialize
let pdp = new PolkaDotPattern();

// TEST INIT //
test("init_params", t => {

    t.true(pdp.unit != null);

});

// TEST GENERATE //
test("generate_params", t => {

    // clear document
    document.body.innerHTML = "";

    // generate an svg artboard
    let tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tag.setAttributeNS(null, "id", "artboard");
    tag.setAttributeNS(null, "width", 100);
    tag.setAttributeNS(null, "height", 100);
    document.body.appendChild(tag);

    // get generated element
    let artboard = document.querySelector("#artboard");

    // generate pattern inside artboard
    pdp.generate(artboard, "test");

    // get generated pattern
    let pattern = document.querySelector("#test");

    t.true(pattern !== undefined);
    t.true(pattern.nodeName == "pattern");

});
