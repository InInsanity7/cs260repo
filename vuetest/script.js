let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
        names: ['Emma','Brandon','Lucy','Jorge'],
        newName: '',
        title: 'Brought to you by JavaScript',
        className: 'red',
        isLoading: true,
        message: 'I really like bread',
        tasks: [{
            description: "Create some loaves of bread",
            completed: true
        },
            {
                description: "Create some fish",
                completed: true
            },
            {
                description: "Create more loaves of bread",
                completed: false
            },
            {
                description: "Create more fish",
                completed: false
            },
            {
                description: "Create more loaves of bread",
                completed: false
            },
            {
                description: "Tell Peter to clean up the mess",
                completed: false
            }
        ]
    },
    computed: {
        screaming () {
            return this.message.toUpperCase();
        },
        incompleteTasks() {
            return this.tasks.filter(task => !task.completed);
        }
    },

    methods: {
        addName() {
            if (this.newName === '')
                return;
            this.names.push(this.newName);
            this.newName = '';
        },
        toggleLoading() {
            this.isLoading = !this.isLoading;
        }
    }
});
