import { select } from "d3-selection";

import { configurationDimension } from "../configuration.js";

/**
 * PolkaDotPattern is an svg polka dot pattern.
 * @param {integer} unit - grid unit
 */
class PolkaDotPattern {
    constructor(unit=configurationDimension.unit) {

        // update self
        this.pattern = null;
        this.unit = unit;

        // if unit is undefined use a swatch size of 1 font size unit

        if (!unit) {

            // using font size as the base unit of measure make responsiveness easier to manage across devices
            this.unit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

        }

    }

    /**
     * Generate dots in pattern.
     * @param {float} radius - individual circle size
     */
    dot(radius) {

        this.pattern.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", radius);

        this.pattern.append("circle")
            .attr("cx", this.unit)
            .attr("cy", 0)
            .attr("r", radius);

        this.pattern.append("circle")
            .attr("cx", 0)
            .attr("cy", this.unit)
            .attr("r", radius);

        this.pattern.append("circle")
            .attr("cx", this.unit)
            .attr("cy", this.unit)
            .attr("r", radius);

        this.pattern.append("circle")
            .attr("cx", this.unit / 2)
            .attr("cy", this.unit / 2)
            .attr("r", radius);

    }

    /**
     * Generate an SVG hatch tessellation.
     * @param {domNode} artboard - svg dom element
     * @param {string} id - pattern id
     */
    generate(artboard, id) {

        // add pattern element
        this.pattern = select(artboard)
            .append("pattern")
            .attr("id", id)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.unit)
            .attr("patternUnits", "userSpaceOnUse");

        // background
        this.pattern.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", this.unit)
            .attr("height", this.unit);

        // generate dots
        this.dot(this.unit * 0.125);

    }

};

export { PolkaDotPattern };
export default PolkaDotPattern;
