var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.temprole && creep.memory.temprole=='harvester' && Game.time % 50 !==0) {
            roleHarvester.run(creep);
        } else {
            creep.memory.temprole = undefined;
            if(creep.memory.repairing && creep.carry.energy === 0) {
                creep.memory.repairing = false;
            }
            if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
                this.findTarget(creep);
                
                creep.memory.repairing = true;
            }
    
            if(creep.memory.repairing) {
                var target;
                if(!creep.memory.targetId) {
                    this.findTarget(creep);
                } 
                
                if (creep.memory.targetId) {
                    target = Game.getObjectById(creep.memory.targetId);
                    if (target.hits > target.hitsMax /2) {
                        this.findTarget(creep);
                        target = Game.getObjectById(creep.memory.targetId);                        
                    }
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
            else {
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    },
    findTarget : function(creep) {
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES,{ filter : function (structure) {
            return structure.hits < structure.hitsMax /2;
        }});
        if (!target) {
            console.log(creep.name + ' temping as harvester');
            creep.memory.temprole = 'harvester';                    
        } else {
            creep.memory.targetId = target.id;
        }
    }
};