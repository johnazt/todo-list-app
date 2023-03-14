const Task = require('./task');

class TasksList {
	constructor() {
		this.tasks = [new Task('Learn Angular'), new Task('Practice React')];
	}

	createTask(name) {
		const newTask = new Task(name);
		this.tasks.push(newTask);
		return this.tasks;
	}

	deleteTask(id) {
		this.tasks = this.tasks.filter(task => task.id !== id);
	}

	completeTask(id) {
		const task = this.tasks.find(t => t.id === id);
		if (task) {
			return (task.completed = !task.completed);
		}
	}
	updateTask(id, newName) {
		const task = this.tasks.find(t => t.id === id);
		if (task) {
			task.name = newName;
		}
	}
	getTasks() {
		return this.tasks;
	}

	//   increaseVotes(id) {
	//     this.bands = this.bands.map((band) => {
	//       if (band.id === id) {
	//         band.votes += 1;
	//       }

	//       return band;
	//     });
	//   }

	//   changeName(id, newName) {
	//     this.bands = this.bands.map((band) => {
	//       if (band.id === id) {
	//         band.name = newName;
	//       }

	//       return band;
	//     });
	//   }
}

module.exports = TasksList;
