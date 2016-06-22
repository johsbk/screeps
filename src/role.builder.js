var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        this.findTarget(creep);
	    }

	    if(creep.memory.building) {
	        if(!creep.memory.targetId) {
	        	this.findTarget(creep);
	        }
            if(creep.memory.targetId) {
            	var target = Game.getObjectById(creep.memory.targetId);
            	var res = creep.build(target);
                if(res == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (res != OK) {
                	console.log(creep.name +' builder stuck: '+ res);
                }
            }
	    }
	    else {
	        var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
	    }
	},
	findTarget : function (creep) {
		creep.memory.targetId = undefined;
		var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
		if (target)
			creep.memory.targetId = target.id;
	}
};