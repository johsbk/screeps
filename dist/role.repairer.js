var roleHarvester = require('role.harvester');
var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.temprole && creep.memory.temprole=='harvester' && Game.time % 50 !=0) {
            roleHarvester.run(creep);
        } else {
            creep.memory.temprole = undefined;
    	    if(creep.memory.repairing && creep.carry.energy == 0) {
                creep.memory.repairing = false;
    	    }
    	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
    	        creep.memory.repairing = true;
    	    }
    
    	    if(creep.memory.repairing) {
    	        var targets = creep.room.find(FIND_STRUCTURES,{ filter : function (structure) {
    	            return structure.hits < structure.hitsMax /2;
    	        }});
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    console.log(creep.name + ' temping as harvester');
                    creep.memory.temprole = 'harvester';
                }
    	    }
    	    else {
    	        var spawn = Game.spawns.Spawn1;
    
                if (spawn) {
                    creep.moveTo(spawn);
    
                    if (spawn.transferEnergy(creep) == Game.ERR_FULL) creep.memory.mode = null;
                }
    	    }
        }
	}
};

module.exports = roleRepairer;