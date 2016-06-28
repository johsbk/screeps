StructureTower.prototype.run = function () {
	var closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        this.attack(closestHostile);
    } /*else {
		var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
	        filter: function (structure) { return structure.hits < structure.hitsMax; }
	    });
	    if(closestDamagedStructure) {
	        this.repair(closestDamagedStructure);
	    }
	}*/

    
};