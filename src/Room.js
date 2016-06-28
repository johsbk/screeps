Room.prototype.getPopulationCount = function () {
	var populationCount = {
        harvester : 0,
        carrier : 0,
        builder : 0,
        upgrader : 0,
        repairer : 0
    };
    var creeps = this.find(FIND_MY_CREEPS);
    _.each(creeps,function (creep) {
        populationCount[creep.memory.role] = populationCount[creep.memory.role]+1;
    });
    return populationCount;
};
Room.prototype.getPopulationMin = function () {
	if (!this.memory.populationMin) {
		this.memory.populationMin = {
	        harvester : 4,
	        carrier : 4,
	        builder : 2,
	        upgrader : 5,
	        repairer : 6
	    };
	}
	return this.memory.populationMin;
};
Room.prototype.getTowers = function () {
	var towers;
	if (!this.memory.towerIds || Game.time % 50 === 0) {
		towers = this.find(FIND_MY_STRUCTURES,{filter: function(structure) { return structure.structureType==STRUCTURE_TOWER; }});
		this.memory.towerIds = towers.map(function(tower) { return tower.id;});
	}
	if (!towers) {
		towers = this.memory.towerIds.map(function(towerId) { return Game.getObjectById(towerId);});
	}
	return towers;
};