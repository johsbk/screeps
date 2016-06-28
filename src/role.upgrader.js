var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy === 0) {
            creep.findEnergy();
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};