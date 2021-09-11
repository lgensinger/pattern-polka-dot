import { select } from "d3-selection";

import { configurationDimension } from "../configuration.js";

/**
 * PolkaDotPattern is an svg polka dot pattern.
 * @param {integer} unit - grid unit
 */
class PolkaDotPattern {
    constructor(unit=configurationDimension.unit) {

        // update self
        this.density = null;
        this.pattern = null;
        this.radius = null;
        this.unit = unit;

        // if unit is undefined use a swatch size of 1 font size unit

        if (!unit) {

            // using font size as the base unit of measure make responsiveness easier to manage across devices
            this.unit = typeof window === "undefined" ? 16 : parseFloat(getComputedStyle(document.body).fontSize);

        }

    }

    /**
     * Generate circle data.
     * @returns An array of objects where each represents a dot in the pattern.
     */
    get data() {

        // generate a circle on each swatch corner + one in the center
        let result = [
            { x: 0, y: 0, r: this.radius },
            { x: this.unit, y: 0, r: this.radius },
            { x: 0, y: this.unit, r: this.radius },
            { x: this.unit, y: this.unit, r: this.radius },
            { x: this.unit / 2, y: this.unit / 2, r: this.radius }
        ];

        // check density
        if (this.density == 13) {

            // generate a circle on each swatch corner + one in the center
            // plus a circle in between each of the original 5
            let dots = [
                { x: this.unit / 2, y: 0, r: this.radius },
                { x: this.unit / 2, y: this.unit, r: this.radius },
                { x: 0, y: this.unit / 2, r: this.radius },
                { x: this.unit, y: this.unit / 2, r: this.radius },
                { x: this.unit / 4, y: this.unit / 4, r: this.radius },
                { x: this.unit * 0.75, y: this.unit / 4, r: this.radius },
                { x: this.unit / 4, y: this.unit * 0.75, r: this.radius },
                { x: this.unit * 0.75, y: this.unit * 0.75, r: this.radius }
            ];

            // update result
            result = result.concat(dots);

        }

        return result;

    }

    /**
     * Generate dots in pattern.
     * @param {array} data - objects where each represents a circle
     */
    dot(data) {

        // generate circles
        this.pattern
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
            .attr("r", d => d.r);

    }

    /**
     * Generate an SVG hatch tessellation.
     * @param {enum} density - 5 | 9 number of circles in a single swatch
     * @param {domNode} artboard - svg dom element
     * @param {string} id - pattern id
     * @param {float} radius - individual circle size
     */
    generate(artboard, id, radius=null, density=5) {

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

        // update self
        this.density = density;
        this.radius = radius;

        // generate dots
        this.dot(this.data);

    }

};

export { PolkaDotPattern };
export default PolkaDotPattern;
