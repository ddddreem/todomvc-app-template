(function (window) {
	'use strict';

	new Vue({
		el: '#app',
		data: {
			todos: [
				{id: 1, completed: true, title: '示例代办1'},
				{id: 2, completed: false, title: '示例代办2'},
				{id: 3, completed: true, title: '示例代办3'}
			]
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
			}
		}
	});

})(window);
