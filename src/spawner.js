
var spawner = {
    roleMoves : {
        'harvester' : [WORK,WORK,WORK,CARRY,CARRY,MOVE],
        'carrier' : [CARRY,CARRY,MOVE,MOVE],
        'builder' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        'upgrader' : [WORK,CARRY,CARRY,CARRY,MOVE,MOVE],
        'repairer' : [WORK,CARRY,CARRY,MOVE,MOVE]
    },
    spawn : function (role,room) {
        console.log('Spawning new: '+role);
        var moves = this.roleMoves[role];
        Game.spawns.Spawn1.createCreep(moves,{role: role,room:room});
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
            var spawning = false;
            for (var roomName in Game.rooms) {
                var room = Game.rooms[roomName];
                var populationCount = room.getPopulationCount();
                var minCount = room.getPopulationMin();
                for (var role in populationCount) {
                    console.log("Role ["+role+"] count: "+populationCount[role]);
                    if (populationCount[role] < minCount[role] && !spawning) {
                        spawning =true;
                        this.spawn(role,roomName);
                    }
                }
            }
        }
    }
    
};