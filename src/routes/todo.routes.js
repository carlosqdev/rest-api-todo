import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
} from '../controllers/todo.controller.js'

const router = Router()

router.get('/tasks', getTodos)
router.post('/tasks', createTodo)
router.put('/tasks/:id', updateTodo)
router.delete('/tasks/:id', deleteTodo)

export default router
