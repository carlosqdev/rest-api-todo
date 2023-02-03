import { Task } from '../models/Task.js'

export const getTodos = async (req, res) => {
  const { filter } = req.query

  try {
    if (filter?.length > 0) {
      const tasks = await Task.findAll({ where: { done: filter } })
      res.json(tasks)
    } else {
      const tasks = await Task.findAll()
      res.json(tasks)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createTodo = async (req, res) => {
  try {
    const { description, done } = req.body

    if (description.trim() === undefined || description.trim() === null) {
      throw new Error('Description is required')
    }

    const newTask = await Task.create({
      description, done
    })

    res.json(newTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params
    const { description, done } = req.body

    const task = await Task.findByPk(id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    task.description = description
    task.done = done
    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.destroy({
      where: {
        id
      }
    })

    if (task <= 0) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
