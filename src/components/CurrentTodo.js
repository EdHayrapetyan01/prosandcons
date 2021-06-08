import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';


export default function CurrentTodo ({ data, index, onEdit, onDelete }) {
  const [value, setValue] = useState(data);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    onEdit(index, value);
    setEditMode(false);
  };
  return (
    <div>
      {editMode ?
      <>
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
          <Button onClick={handleEdit} color="success" >Save</Button>
          <Button onClick={() => setEditMode(false)}color="danger">Cancel</Button>
          </>
          
        :
      
        <>
          <div>{data}
          <div className='actions'>
            <Button color="info" onClick={() => setEditMode(true)}><i className="fa fa-pencil" aria-hidden="true"></i>
            </Button>
            <Button color="warning" onClick={() => onDelete(index)}><i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
          </div>
          </div>
         
        </>

      }

    </div>
  )
}
