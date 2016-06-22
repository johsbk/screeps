var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var target;
            if (!creep.memory.targetId) {
                target = this.findTarget(creep);
            }
            if(creep.memory.targetId) {
                if (!target) {
                    target = Game.getObjectById(creep.memory.targetId);
                }
                var res = creep.transfer(target, RESOURCE_ENERGY);
                if( res== ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (res==ERR_FULL) {
                    this.findTarget(creep);
                } else if (res!=OK) {
                    console.log(creep.name + ' is stuck: '+res);
                }
            } else {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    },
    findTarget : function (creep) {
        creep.memory.targetId = undefined;
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && 
                        structure.energy < structure.energyCapacity;
                }
        });
        if (target) {
            creep.memory.targetId = target.id;
        } else {
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) {
                    return structure.structureType == STRUCTURE_CONTAINER && 
                        structure.store && 
                        structure.store.energy < structure.storeCapacity;
                }
            });
            if (target) {
                creep.memory.targetId = target.id;
            }
        }
    }
};