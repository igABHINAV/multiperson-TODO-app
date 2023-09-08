const User = require("../Models/User");
const Task = require("../Models/Task")

function isDateInFuture(date) {
    return new Date(date) > new Date();
}

exports.getAllPostsByUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Task.find({ identity: userId })
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this user' });
        }

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
}

exports.getTaskbyId = async (req, res) => {
    const taskID = req.params.id;
    console.log(taskID)
    try {
        const task = await Task.findById(taskID);
        if (!task) {
            return res.status(404).json({ error: 'Post not found '+`${task}` });
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const newTask = new Task({
            identity: req.user.userId,
            title: title,
            description: description,
            status: status,
            dueDate: dueDate,
        });

        if (!isDateInFuture(dueDate)) {
            return res.status(400).json({ error: 'Due date must be in the future' });
        }

        const allowedStatusValues = ['todo', 'in progress', 'done'];
        if (status && !allowedStatusValues.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        
        console.log(req.user.userId)
        const owner = await User.findById(req.user.userId);
        const task = await Task.create(newTask);
        owner.TaskList.push(task._id);
        try {
            await owner.save();
        } catch (error) {
            console.error("Error updating user's tasklist array:", error);
        }
        res.status(201).json({
            message: 'post created successfully',
            task,
            owner
        });

    } catch (error) {
        res.status(500).json({ error:`Some error occoured ${error}` });
    }
}

exports.updateTask = async (req, res) => {
    const taskID = req.params.id;
    const { title, description, status, dueDate } = req.body;

    const allowedStatusValues = ['todo', 'in progress', 'done'];

    try {
        const task = await Task.findById(taskID);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        if (status && !allowedStatusValues.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        if (!isDateInFuture(dueDate)) {
            return res.status(400).json({ error: 'Due date must be in the future' });
        }

        task.title = title;
        task.description = description;
        task.status = status || 'todo';
        task.dueDate = dueDate;

        await task.save();

        res.json({ message: 'Task updated successfully', task });
        
    } catch (error) {
        res.status(500).json({ error:`Some error occoured ${error}`});
    }
};


exports.deleteTask = async (req, res) => {
    const taskID = req.params.id;

    try {
        const task = await Task.findById(taskID);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.remove();

        const user = await User.findById(req.user.userId);
        if (user) {
            user.TaskList.pull(taskID);
            await user.save();
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};
