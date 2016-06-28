Creep.prototype.findEnergy = function() {
    var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && 
                        structure.store.energy > 100;
                }
        });
    if (target) {
        if(target.transfer(this,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
           this.moveTo(target); 
        }
    } else if(this.room.name == 'E29N24') {
        var harvester = this.room.find(FIND_MY_CREEPS, {
            filter: function (creep) {
                return creep.getRole() =='harvester';
            }
        });
        if(harvester.transfer(this,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
           this.moveTo(harvester); 
        }
    } else {
    	this.gotoIdle();
    }
    
};
Creep.prototype.wait = function(ticks) {
    this.memory.wait = ticks;
};

Creep.prototype.getRole = function () {
	return this.memory.role;
};
Creep.prototype.run = function () {
    if (this.memory.wait && this.memory.wait>0) {
        this.memory.wait--;
        return;
    }
    if (this.memory.room && this.memory.room != this.room.name) {
        this.gotoRoom(this.memory.room);
        return;
    }
	if(this.getRole() == 'harvester') {
        roleHarvester.run(this);
    } else if(this.getRole() == 'upgrader') {
        roleUpgrader.run(this);
    } else if(this.getRole() == 'builder') {
        roleBuilder.run(this);
    } else if(this.getRole() == 'repairer') {
        roleRepairer.run(this);
    } else if (this.getRole() == 'carrier') {
    	roleCarrier.run(this);
    } else {
    	console.log("Unknown role: "+this.getRole());
    }
};
Creep.prototype.gotoIdle = function () {
	var flag = Game.flags.Idle;
	if (!flag.pos.inRangeTo(this, 5)) {
		this.moveTo(flag);
	}
};
Creep.prototype.gotoRoom = function(room) {
    var exitDir = this.room.findExitTo(room);
    var exit = this.pos.findClosestByRange(exitDir);
    this.moveTo(exit);
};