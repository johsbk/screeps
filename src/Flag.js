Flag.prototype.getNearestSource = function () {
	var source;
	if (!this.memory.nearestSourceId) {
		source = this.pos.findClosestByRange(FIND_SOURCES);
        this.memory.nearestSourceId = source.id;
	} else {
		source = Game.getObjectById(this.memory.nearestSourceId);
	}
	return source;
};
Flag.prototype.attachCreep = function(creep) {
	if (!this.memory.creeps) {
		this.memory.creeps = {
			'harvester': {'names':{},'max':3},
			'repairer': {'names':{},'max':3},
		};
	}
	var role = creep.getRole();
	for(var name2 in this.memory.creeps[role].names) {
        if(!Game.creeps[name2]) {
            delete this.memory.creeps[role].names[name2];
        }
    }
    if (Object.keys(this.memory.creeps[role].names).length < this.memory.creeps[role].max) {
		creep.memory.flag = this.name;
		this.memory.creeps[role].names[creep.name]= true;
		console.log("Attached "+role+" "+creep.name+" to "+this.name);
		return true;
	} else {
		console.log("Unable to attach "+role+" "+creep.name+" to "+this.name+ "("+Object.keys(this.memory.creeps[role].names).length+"/"+this.memory.creeps[role].max+")");
	}
	return false;
};
Flag.prototype.getRepairTarget = function() {
	if (!this.memory.repairTargetIds || this.memory.repairTargetIds.length === 0) return null;
	var targetId = this.memory.repairTargetIds.shift();
	return Game.getObjectById(targetId);
};
var flagHandler = {
	attachDeposits : function () {
		if (Game.time % 50 !== 0) {
			return;
		}
		console.log("Attaching deposits to source flags");
		for (var flagName in Game.flags) {
			var flag = Game.flags[flagName];
			flag.memory.containerIds= [];
			flag.memory.depositIds = [];
		}
		var filterStructures = function(structure) {
            return structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER || 
                    structure.structureType == STRUCTURE_CONTAINER || 
                    structure.structureType == STRUCTURE_STORAGE;
        };
        var eachDeposit = function (deposit) {
        	var closests = deposit.pos.findClosestByRange(FIND_FLAGS,{
        		filter : function(flag) {
        			return flag.memory.type=='source';
        		}
        	});
        	if (deposit.structureType == STRUCTURE_CONTAINER || deposit.structureType == STRUCTURE_STORAGE) {
        		closests.memory.containerIds.push(deposit.id);
        	} else {
        		closests.memory.depositIds.push(deposit.id);
        	}
        };
		for (var roomName in Game.rooms) {
			var room = Game.rooms[roomName];
			var deposits = room.find(FIND_STRUCTURES, {
	                filter: filterStructures
	        });
	        _.each(deposits,eachDeposit);
	    }

	},
	attachRepairTargets : function () {
		if (Game.time % 50 !== 0) {
			return;
		}
		var room;
		var flags = {};
		var flagName;
		for (flagName in Game.flags) {
			var flag = Game.flags[flagName];
			flags[flagName] = [];
		}
		var structureFilter = function (structure) {
        	return structure.hits < structure.hitsMax /2;
	    };
	    var eachTarget = function (target) {
	    	var closests = target.pos.findClosestByRange(FIND_FLAGS,{
		    		filter : function(flag) {
		    			return flag.memory.type=='source';
		    		}
	    	});
	    	flags[closests.name].push(target);
	    };
		for (var roomName in Game.rooms) {
			room = Game.rooms[roomName];

			var targets = room.find(FIND_STRUCTURES,{ filter : structureFilter});
		    _.each(targets,eachTarget);
	        for (flagName in flags) {
	        	Game.flags[flagName].memory.repairTargetIds =_.sortBy(flags[flagName],function (structure) {
		    		return structure.hits;
		    	}).map(function (structure) { return structure.id;});
	        }
		    console.log("Found "+targets.length+" repair targets");
		}
	}
};