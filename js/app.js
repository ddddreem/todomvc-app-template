(function (window) {
	'use strict';

	new Vue({
		el: '#app',
		data: {
			todos: [
				{id: 1, completed: true, title: '示例代办1'},
				{id: 2, completed: false, title: '示例代办2'},
				{id: 3, completed: true, title: '示例代办3'}
			],
			newTodo: ''
		},
		computed: {
			remaining() {
				return this.todos.filter(todo => !todo.completed).length;
			},
			allDone: {
				get() {
					return this.remaining === 0;
				},
				set(value) {
					this.todos.forEach(todo => {
						todo.completed = value;
					});
				}
			}
		},
		methods: {
			// 控制 item 显示单复数
			pluralize(word) {
				return word + (this.remaining === 1 ? "" : "s");
			},
			// 用于删除单个代办
			removeTodo(todo){
				var index = this.todos.indexOf(todo);
				this.todos.splice(index, 1);
			},
			// 清除所有已完成代办
			removeCompleted(){
				this.todos = this.todos.filter( todo => !todo.completed);
			},
			// 添加新代办
			addTodo(){
				var index = Math.floor(Math.random()*9999);
				// this.newTodo = this.newTodo.trim();
				this.todos.push({id: index, title: this.newTodo.trim(), completed: false});
				this.newTodo = '';
			},
			// 清空输入代办框
			clearInput() {
				this.newTodo = '';
			}
		}
	});

})(window);
