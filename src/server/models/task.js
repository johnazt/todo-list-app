const { v4: uuidV4 } = require('uuid');

class Task {
	constructor(name) {
		this.id = uuidV4();
		this.name = name;
		this.completed = true;
	}
}

module.exports = Task;
