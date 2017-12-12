/* eslint-disable max-len */
/* eslint-disable no-useless-escape */

const tasks = [
    {
        name: 'Closed Circuit',
        description: 'Create a function that check closed or nor circuit in provided \'area\'. Provided \'area\' - Martix (n*m) that must contain only 0 and 1 (0 - empty, 1 - circuit link). Links(1) can connect diagonally (45 degrees)',
        language: 'javascript',
        test: `describe(\"top\", function(){let area = [[0,0,0,1,1,0,0,0], [0,0,0,1,0,1,0,0], [0,0,0,1,0,1,0,0], [0,0,0,0,0,0,0,0]]; it(\"should return false if circuit isnt closed\", function () { Test.assertEquals(isCircuitClosed(area), false); }); it(\"should return true if circuit closed\", () => { area[2][4] = 1; Test.assertEquals(isCircuitClosed(area), true); }); it(\"should return false if only one link in circuit\", function() { area = [[0,0,0], [0,1,0], [0,0,0]]; Test.assertEquals(isCircuitClosed(area), false); }) });
        `,
        tests: [
            'let area = [[0,0,0,1,1,0,0,0],\\n\' +\n' +
            '        \'            [0,0,0,1,0,1,0,0],\\n\' +\n' +
            '        \'            [0,0,0,1,0,1,0,0],\\n\' +\n' +
            '        \'            [0,0,0,0,0,0,0,0]];\\n\' +\n' +
            '        \'\\n\' +\n' +
            '        \'\\n\' +\n' +
            '        \'it(\\\'should return false if circuit is\\\\\\\'nt closed\\\', () => {\\n\' +\n' +
            '        \'    assert.equal(isCircuitClosed(area), false);\\n\' +\n' +
            '        \'});',
            'let area = [[0,0,0,1,1,0,0,0],\n' +
            '            [0,0,0,1,0,1,0,0],\n' +
            '            [0,0,0,1,0,1,0,0],\n' +
            '            [0,0,0,0,0,0,0,0]];\n' +
            '\n' +
            'it(\'should return true if circuit closed\', () => {\n' +
            '    area[2][4] = 1;\n' +
            '\n' +
            '    assert.equal(isCircuitClosed(area), true);\n' +
            '});',
            'let area = [[0,0,0,1,1,0,0,0],\n' +
            '            [0,0,0,1,0,1,0,0],\n' +
            '            [0,0,0,1,0,1,0,0],\n' +
            '            [0,0,0,0,0,0,0,0]];\n' +
            '\n' +
            'it(\'should return false if only one link in circuit\', () => {\n' +
            '    area = [[0,0,0],\n' +
            '            [0,1,0],\n' +
            '            [0,0,0]];\n' +
            '\n' +
            '    assert.equal(isCircuitClosed(area), false);\n' +
            '});'
        ]
    }
];

export default tasks;
