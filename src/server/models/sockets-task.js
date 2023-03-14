const TaskList = require('./task-list');

class Sockets {
	constructor(io) {
		this.io = io;

		this.tasklist = new TaskList();

		this.socketsEvents();
	}

	socketsEvents() {
		this.io.on('connection', socket => {
			console.log('cliente conectado');

			socket.emit('getTasks', this.tasklist.getTasks());

			socket.on('deleteTask', ({ id }) => {
				this.tasklist.deleteTask(id);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});

			socket.on('createTask', ({ name }) => {
				this.tasklist.createTask(name);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});

			socket.on('completeTask', ({ id }) => {
				this.tasklist.completeTask(id);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});
			socket.on('updateTask', (id, newName) => {
				this.tasklist.updateTask(id, newName);
				this.io.emit('getTasks', this.tasklist.getTasks());
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}
}

module.exports = Sockets;
