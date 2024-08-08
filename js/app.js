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
			}
		},
		methods: {
			pluralize(word) {
				return word + (this.remaining === 1 ? "" : "s");
			}
		}
	});

})(window);
