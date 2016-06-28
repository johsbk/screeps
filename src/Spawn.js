Spawn.prototype.transfer = function (target,type) {
	if (type==RESOURCE_ENERGY) {
		return this.transferEnergy(target);
	} else {
		console.log("Spawn doesnt have energy type: "+type);
		return ERR_INVALID_TARGET;
	}
};