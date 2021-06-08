import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App () {
  const [toDo, setToDo] = useState({ pros: [], cons: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = 'u1622460441501';
  const groupId ='g1622460441501'


  const { REACT_APP_BASE_URL } = process.env;
  const URL = `${REACT_APP_BASE_URL}/group/${groupId}/user/${userId}`;


  useEffect(() => {
    async function fetchData () {
      try {
        const result = await axios(
          URL
        );
        const newToDo = {
          ...toDo,
          ...result.data,

        };
        setToDo(newToDo);
        setLoading(false)
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const request = async (data) => {
    try {
      setLoading(true)
      const res = await axios.put(`${REACT_APP_BASE_URL}/group/${groupId}/user/${userId}`, data);
      const newToDo = {
        ...toDo,
        ...res.data,

      };
      setToDo(newToDo);
      setError("");
      setLoading(false)
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const onAdd = async (type, data) => {
    if (!data) {
      setError("Please fill the input");
      return;
    }
    const tasks = [...toDo[type]];
    tasks.push(data);
    const newToDo = {
      ...toDo,
      [type]: tasks
    };
    request(newToDo);
  };


  const onEdit = (type, index, value) => {
    const tasks = [...toDo[type]];
    tasks[index] = value;
    const newToDo = {
      ...toDo,
      [type]: tasks
    };
    request(newToDo);
  };

  const onDelete = (type, index) => {
    const tasks = [...toDo[type]];
    tasks.splice(index, 1);
    const newToDo = {
      ...toDo,
      [type]: tasks
    };
    request(newToDo);
  };

  return (
    <>
      <div className="App">
        <div className='errorMsg'>{error}</div>
        <>
          {loading ? <Spinner color="success" /> : null}
          <div className='taskListContainer'>
            <TaskList
              type={'pros'}
              data={toDo.pros}
              onAdd={(data) => onAdd('pros', data)}
              onDelete={(index) => onDelete('pros', index)}
              onEdit={(index, value) => onEdit('pros', index, value)}
            />

            <TaskList
              type={'cons'}
              data={toDo.cons}
              onAdd={(data) => onAdd('cons', data)}
              onDelete={(index) => onDelete('cons', index)}
              onEdit={(index, value) => onEdit('cons', index, value)}
            />
          </div>
        </>
      </div>

    </>
  );
}

export default App;




//const name = 'eduard_hayrapetyan'
// const getGroupId = await axios(`https://avetiq-test.firebaseapp.com/group/${name}`);
// const getUserId = await axios(`https://avetiq-test.firebaseapp.com/user/${name}`);
// setGroupId(getGroupId.data.groupId);
// setUserId(getUserId.data.userId);