/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner');
 * mod.thing == 'a thing'; // true
 */

var spawner = {
    roleMoves : {
        'harvester' : [WORK,CARRY,MOVE],
        'builder' : [WORK,CARRY,MOVE],
        'upgrader' : [WORK,CARRY,MOVE],
        'repairer' : [WORK,CARRY,MOVE]
    },
    spawn : function (role) {
        console.log('Spawning new: '+role);
        var moves = this.roleMoves[role];
        Game.spawns.Spawn1.createCreep(moves,{role: role});
    },
    controlPopulation : function () {
        if (!Memory.populationControlTicks || Memory.populationControlTicks < 0) {
            console.log('Controlling population..');
            var populationCount = {
                harvester : 0,
                builder : 0,
                upgrader : 0,
                repairer : 0
            };
            var minCount = {
                harvester : 3,
                builder : 2,
                upgrader : 1,
                repairer : 1
            };
            for(var name in Game.creeps) {
                var creep = Game.creeps[name];
                populationCount[creep.memory.role] = populationCount[creep.memory.role]+1;
            }
            for (var role in populationCount) {
                console.log("Role ["+role+"] count: "+populationCount[role]);
                if (populationCount[role] < minCount[role]) {
                    this.spawn(role);
                }
            }
            Memory.populationControlTicks = 30;
        } else {
            Memory.populationControlTicks--;
        }
    }
    
}
module.exports = spawner;