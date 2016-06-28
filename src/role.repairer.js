var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.temprole && creep.memory.temprole=='upgrader' && Game.time % 50 !==0) {
            roleUpgrader.run(creep);
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
                    target = this.findTarget(creep);
                } 
                
                if (creep.memory.targetId) {
                    if (!target)
                        target = Game.getObjectById(creep.memory.targetId);
                    if (target.hits > target.hitsMax /2) {
                        target = this.findTarget(creep);                       
                    }
                    var res = creep.repair(target);
                    if(res == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    } else if(res != OK) {
                        creep.memory.targetId = undefined;
                    }
                }
            }
            else {
                creep.findEnergy();
            }
        }
    },
    findTarget : function(creep) {
        creep.memory.targetId = undefined;
        if (!creep.memory.flag) {
            for (var flag in Game.flags) {
                if (Game.flags[flag].attachCreep(creep)) {
                    break;
                }
            }
        } 
        if (creep.memory.flag) {
            var target = Game.flags[creep.memory.flag].getRepairTarget();
            if (!target) {
                console.log(creep.name + ' temping as upgrader');
                creep.memory.temprole = 'upgrader';                    
            } else {
                creep.memory.targetId = target.id;
            }
            console.log("Repairer going to repair " + target.hits);
            return target;
        }
        
    }
};