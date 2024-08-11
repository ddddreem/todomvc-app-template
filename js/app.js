(function (window) {
	'use strict';

	// 不同状态的过滤函数
	let filters = {
		all(todos){
			return todos;
		},
		active(todos){
			return todos.filter(todo => !todo.completed);
		},
		completed(todos){
			return todos.filter(todo => todo.completed);
		}
	}

	const TODOS_KEY = 'todos-vue';

	let todoStorage = {
		get(){
			return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
		},
		set(todos){
			localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
		}
	}

	new Vue({
		el: '#app',
		data: {
			todos: todoStorage.get(),
			newTodo: '',
			// 当前正在编辑的todo信息
			editingTodo: null,
			// 编辑前的title 信息
			titleBeforeEditing: '',
			// 当前筛选的规则
			sortStrategy: 'all'
		},
		watch: {
			todos: {
				deep: true,
				handler: todoStorage.set
			}
		},
		computed: {
			remaining() {
				return filters.active(this.todos).length;
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
			},
			// 返回根据不同筛选策略得到的代办集合
			filterTodo(){
				return filters[this.sortStrategy](this.todos);
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
				this.todos = filters.active(this.todos);
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
			},
			// 保存当前编辑的li
			editTodo(todo){
				this.editingTodo = todo;
				this.titleBeforeEditing = todo.title;
			},
			// 取消代办编辑
			cancelEdit(todo){
				todo.title = this.titleBeforeEditing;
				this.editingTodo = null;
				this.titleBeforeEditing = '';
			},
			// 保存代办修改，回车也会触发失去焦点事件，需要避免重复操作
			saveEdit(todo){
				if(!this.editingTodo) return;
				todo.title = todo.title.trim();
				if(todo.completed && todo.title !== this.titleBeforeEditing) todo.completed = !todo.completed;
				this.editingTodo = null;
				this.titleBeforeEditing = '';
				if(!todo.title){
					this.removeTodo(todo);
				}
			},
			// 更改筛选策略
			changeSortStrategy(strategy){
				this.sortStrategy = strategy;
			}
		},
		directives: {
			'todo-focus' (el, binding){
				if(binding.value){
					el.focus();
				}
			}
		}
	});

})(window);
