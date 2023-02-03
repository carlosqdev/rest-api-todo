import { pool } from '../db.js'

export const getTodos = async (req, res) => {
  const { filter } = req.query

  try {
    if (filter?.length > 0) {
      const [rows] = await pool.query(
        'SELECT id, description, done FROM todos WHERE done = ?',
        [filter]
      )
      res.json(rows)
    } else {
      const [rows] = await pool.query(
        'SELECT id, description, done FROM todos'
      )
      res.json(rows)
    }
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong', error })
  }
}

export const createTodo = async (req, res) => {
  try {
    const { description, done } = req.body

    if (description.trim() === undefined || description.trim() === null) {
      throw new Error('Description is required')
    }

    const [result] = await pool.query(
      'INSERT INTO todos (description, done) values (?, ?)',
      [description, done]
    )

    res.json({
      id: result.insertId,
      description,
      done
    })
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong', error })
  }
}

export const updateTodo = async (req, res) => {
  try {
    const { description, done } = req.body
    const { id } = req.params

    const [result] = await pool.query(
      'UPDATE todos SET description = IFNULL(?, description), done = IFNULL(?, done) WHERE id = ?',
      [description, done, id]
    )

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Not found' })
    }

    const [rows] = await pool.query(
      'SELECT id, description, done FROM todos WHERE id = ?',
      [id]
    )

    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong', error })
  }
}

export const deleteTodo = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id])

    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: 'Something goes wrong', error })
  }
}
