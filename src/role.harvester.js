var roleHarvester = {
    getSource : function(creep) {
        if (!creep.memory.flag) {
            for (var flag in Game.flags) {
                if (Game.flags[flag].attachCreep(creep)) {
                    break;
                }
            }
        } 
        if (creep.memory.flag) {
            var flag2 = Game.flags[creep.memory.flag];
            return flag2.getNearestSource();
        } else {
            console.log(creep.name+ " unable to find flag");
        }
    },
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = this.getSource(creep);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else if(creep.carry.energy == creep.carryCapacity && !creep.memory.buddy) {
            //roleCarrier.run(creep);
        }
    }
};