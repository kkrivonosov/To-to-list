import React, { useMemo, useState } from 'react'
import { Checkbox, Paper } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import StarsIcon from '@material-ui/icons/Stars'
import { observer } from 'mobx-react-lite'
// import store from '../../store';
import { selectedTodos } from '../../store/Store'

export const Tasks = observer(
  ({ changeCheck, deleteTask, tasks, setFilterMeaning, filerState }) => {
    const [flag, setFlag] = useState(Boolean)

    const filerTasks = useMemo(
      () => setFilterMeaning(filerState),
      [tasks, filerState]
    )

    return (
      <div className='to-do-list-tasks-div'>
        {tasks.lenght !== 0 &&
          filerTasks.map((item, index) => (
            <div className='tasks-div' key={`${index}-task-${Math.random()}`}>
              <Checkbox
                type='checkbox'
                checked={item.isDone}
                onChange={() => changeCheck(item.text, item.isCheck, item._id)}
              />
              <Paper
                className={item.checked ? 'task-p-checked' : 'task-p'}
                onDoubleClick={() =>
                  changeCheck(item.title, item.isDone, item._id)
                }
              >
                {item.title}
              </Paper>
              <StarsIcon
                className={flag ? 'selected-icon-active' :'selected-icon'}
                alt='Пикчи нет'
                onClick={() => {
                  selectedTodos.addTodo(item)
                  setFlag(!flag)
                }}
              />
              <DeleteIcon
                className='delete-icon'
                onClick={() => deleteTask(item)}
                alt='Пикчи нет'
              />
            </div>
          ))}
      </div>
    )
  }
)
