var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy == 0) {
            var spawn = Game.spawns.Spawn1;

            if (spawn) {
                creep.moveTo(spawn);

                if (spawn.transferEnergy(creep) == Game.ERR_FULL) creep.memory.mode = null;
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;