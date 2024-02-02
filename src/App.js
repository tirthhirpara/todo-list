import './App.css';
import { useState } from 'react';

function App() {

  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [final, setFinal] = useState([]);
  const [info,setinfo] = useState([])

  const add = () => {
    if (edit !== null) {
      const updated = [...todo];
      setinfo([...todo])

      updated[edit] = { task: task, checked: false };
      setTodo(updated);
      setFinal(updated);
      setEdit(null);
      setTask("");
    }
    else {
      setTodo([...todo, {  task: task, checked: false }]);
      setinfo([...todo])
      setFinal([...todo, {  task: task, checked: false }]);
      setTask(""); 
    }
  }

  const del = (index) => {
    let d = todo.filter((val, id) => {
      return id !== index;
    })
    setTodo(d);
    setFinal(d);
  }

  const update = (index) => {
    setEdit(index);
    setTask(todo[index].task);
  };

  const handlecheck = (index) => {
    const check = [...todo];
    check[index].checked = !check[index].checked;
    setTodo(check);
  }

  const searchhanlder = () => {
   
    let info = final.filter((val) => {
      return val.task === search;
    })
    // console.log('info',info)
    setTodo(info);
  }

  const completed = () => {
    let com = final.filter((val) => {
      return val.checked === true 
    });

    setTodo(com);

  }

  const uncompleted = () => {
    let uncom = final.filter((val, id) => {
      return val.checked === false 
    });
    setTodo(uncom);
  }

  const all = () => {
    var data = [...final];
    setTodo(data);
  }

  return (
    <div>
      <div>
        <h1>Todo List</h1>
        <div>
          <input type="text"  value={task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} />
          <input type='button'  value={"Add Task"} onClick={() => { add() }} /><br />
          <input type='text'  placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type='button'  value={"Search"} onClick={() => { searchhanlder() }} /><br />
          <input type='button'  value={"Completed"} onClick={() => { completed() }} style={{ marginRight: "10px" }} />
          <input type='button' value={"UnCompleted"} onClick={() => { uncompleted() }} style={{ marginRight: "10px" }} />
          <input type='button' value={"All"} onClick={() => { all() }} style={{ marginRight: "10px" }} />

        </div>

        <table className='' style={{ marginTop: "20px" }} border={1}>
          {
            todo.map((ele, index) => {
              return (
                <tr className='list' key={index}>
                  
                    <td><input type='checkbox' checked={ele.checked} onChange={() => handlecheck(index)} /></td>
                    <td><span style={{ textDecoration: ele.checked ? "line-through" : "" }}>{ele.task}</span></td>
                    <td><input type='button' value={"Del"} onClick={() => { del(index) }} /></td>
                    <td><input type='button' value={"Edit"} onClick={() => { update(index) }} /></td>
                  
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  );
}

export default App;

