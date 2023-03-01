import React, {useState} from 'react'

const Todo = () => {

    const [listItem, setListItem] = useState({
        item: "",
        isCompleted: false,
    });

    const [todoList, setTodoList] = useState(
        []
    );

    const changeHandler = (e) => {
        setListItem({...listItem, [e.target.name]: e.target.value})
    };

    const formValidation = (e) => {
        let isValid = true
        if ( listItem.item.length < 3 ) {
            let isValid = false
            console.log("Invalid form")
        }
        return isValid
    };

    const createListItem = (e) => {
        e.preventDefault();

        if(formValidation()){
            console.log("Form complete.")
            setTodoList([...todoList, listItem])
            console.log(todoList)
            setListItem({
                item: "",
                isCompleted: false
            })
        }
        else{console.log("Invalid form.")}
    };

// I need the checkbox to be able to know which task is being checked. Right now, state is reset so when the checkbox is clicked, it adds a "true" value in state, but unconnected to any task. //

    const completeItem = (i) => {

        const isCompleted = todoList.map((item, idx) => {
            if (i === idx) {
                item.isCompleted = !item.isCompleted
            }
            return item
        })
        setTodoList(isCompleted)
    };

    const deleteItem = (i) => {

        const tasksLeft = todoList.filter((item, idx) => {
            return idx !== i;
        })
        setTodoList(tasksLeft);
        
    };

    return (
        <>
            <div style={{margin: '10px'}}>
                <form action="" className='form col-md-4 mx-auto' onSubmit={ createListItem }>
                    <div className='form-group'>
                        <label className="label">Todo: </label>
                        <input type="text" name="item" onChange={changeHandler}  />
                    </div>
                    <div>
                        <input style={{margin: '5px'}}type="submit" value="Add list item" />
                    </div>
                </form>
            </div>
            <div>
                {
                    todoList.map((item, idx) => (
                        <div style={{
                            display: 'flex',
                            margin: '5px'
                        }}>
                            <ul style={{display: 'flex', margin: '5px', textAlign: 'justify'}}>
                                <li style={{margin: '5px'}} className={`${item.isCompleted? "text-decoration-line-through":""}`} key={idx}> {item.item}</li> 
                                <form action="">
                                    <input style={{margin: '5px'}} type="checkbox" onChange= {() => completeItem(idx)} /> 
                                    <button style={{margin: '5px'}} className='btn btn-dark' onClick={() => deleteItem(idx)}>Delete</button>
                                </form>
                            </ul>    
                        </div>
                    )
                    )
                }
            </div>
        </>
    )
};

export default Todo;