
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
        if (Game.time % 30 ===0) {
            console.log('Controlling population..');
            // cleaning names
            for(var name2 in Memory.creeps) {
                if(!Game.creeps[name2]) {
                    delete Memory.creeps[name2];
                }
            }
            var populationCount = {
                harvester : 0,
                builder : 0,
                upgrader : 0,
                repairer : 0
            };
            var minCount = {
                harvester : 3,
                builder : 3,
                upgrader : 1,
                repairer : 3
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
        }
    }
    
};