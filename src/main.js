

module.exports.loop = function () {
    spawner.controlPopulation();
    flagHandler.attachDeposits();
    flagHandler.attachRepairTargets();
    for (var room in Game.rooms) {
        var towers = Game.rooms[room].getTowers();
        for (var tower in towers) {
            try {
                towers[tower].run();
            } catch (err) {
                console.log("Tower Error occured: "+err);
            }
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        try {
            creep.run();
        } catch (err) {
            console.log("Creep error occured: "+err);
        }
    }
};