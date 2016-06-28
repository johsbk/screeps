var roleCarrier = {
	acquireBuddy : function (creep) {
		if (creep.getRole() != 'carrier') {
			console.log(creep.name + "shouldnt be here");
			return;
		}
		var harvesters = creep.room.find(FIND_MY_CREEPS,{
			filter: function (creep) {
				return creep.getRole()=='harvester';
			}
		});
		for (var i in harvesters) {
			var harvester = harvesters[i];

			if (harvester.name != creep.name && (!harvester.memory.buddy || !Game.creeps[harvester.memory.buddy])) {
				harvester.memory.buddy = creep.name;
				creep.memory.buddy = harvester.name;
				console.log(creep.name+" acquired buddy "+harvester.name);
				return harvester;
			} else if (harvester.memory.buddy) {
				var harvesterBuddy = Game.creeps[harvester.memory.buddy];
				if (harvesterBuddy.memory.buddy != harvester.name) {
					harvesterBuddy.memory.buddy = undefined;
					harvester.memory.buddy = undefined;
				}
			}
		}
		console.log(creep.name + " cant find buddy");
		creep.wait(5);
	},
	findBuddy : function (creep) {
		var buddy;
		if (!creep.memory.buddy || creep.memory.buddy==creep.name) {
			buddy = this.acquireBuddy(creep);
		} else {
			buddy = Game.creeps[creep.memory.buddy];
			if (!buddy) {
				buddy = this.acquireBuddy(creep);
			}
		}
		return buddy;
	},
	run : function (creep) {
		if (creep.carry.energy<10) {
			var buddy = this.findBuddy(creep);
			if (buddy && buddy.carry.energy >0) {
				var res2 = buddy.transfer(creep,RESOURCE_ENERGY);
				if(res2==ERR_NOT_IN_RANGE) {
					creep.moveTo(buddy);
				}
			} else {
				creep.gotoIdle();
			}
		} else {
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
                } else {
                	creep.memory.targetId = undefined;
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
        var buddy =this.findBuddy(creep);
        var flag;
        if (buddy) flag= Game.flags[buddy.memory.flag];
        var target;
        if (flag && flag.memory.containerIds) {
        	var candidate;
        	for (var idx in flag.memory.depositIds) {
        		candidate = Game.getObjectById(flag.memory.depositIds[idx]);
        		if (candidate.energy < candidate.energyCapacity) {
        			target = candidate;
        			break;
        		}
        	}
        	if (!target) {
	        	for (var idx2 in flag.memory.containerIds) {
	        		candidate = Game.getObjectById(flag.memory.containerIds[idx2]);
	        		if (candidate && candidate.store.energy < candidate.storeCapacity) {
	        			target = candidate;
	        			break;
	        		}
	        	}
        	}
        	if (!target) {
        		console.log(creep.name + "("+creep.getRole()+") couldnt find a target");
        	}
        }
        if (target) {
            creep.memory.targetId = target.id;
        }
    }
};