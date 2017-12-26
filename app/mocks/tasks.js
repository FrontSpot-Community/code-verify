/* eslint-disable max-len */
/* eslint-disable no-useless-escape */

const tasks = [
    {
        name: 'Closed Circuit',
        description: 'Create a function that check closed or nor circuit in provided \'area\'. Provided \'area\' - Martix (n*m) that must contain only 0 and 1 (0 - empty, 1 - circuit link). Links(1) can connect diagonally (45 degrees)',
        language: 'javascript',
        test: `describe(\"top\", function(){let area = [[0,0,0,1,1,0,0,0], [0,0,0,1,0,1,0,0], [0,0,0,1,0,1,0,0], [0,0,0,0,0,0,0,0]]; it(\"should return false if circuit isnt closed\", function () { Test.assertEquals(isCircuitClosed(area), false); }); it(\"should return true if circuit closed\", () => { area[2][4] = 1; Test.assertEquals(isCircuitClosed(area), true); }); it(\"should return false if only one link in circuit\", function() { area = [[0,0,0], [0,1,0], [0,0,0]]; Test.assertEquals(isCircuitClosed(area), false); }) });
        `
    }
];

export default tasks;
