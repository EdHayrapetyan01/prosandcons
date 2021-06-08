import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import CurrentTodo from './CurrentTodo';
import {
  Card, CardBody, Input, Button
} from 'reactstrap';


export default function TaskList ({ type, data, onEdit, onDelete, onAdd }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className='taskList'>
      <Card>
        <CardBody>
          <h1>{type.replace(type[0], type[0].toUpperCase())}</h1>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={type}
            required />
          <br />
          <Button color="success"
            onClick={() => { onAdd(inputValue); setInputValue("") }}
          >Add</Button>{' '}

          {data ? data.map((todo, index) => (

            <div className='task' key={uuidv4()}>
              <CurrentTodo
                data={todo}
                index={index}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>

          )) :
            <div>
              <p>Still empty :( </p>
            </div>
          }
        </CardBody>
      </Card>
    </div>
  )
}

