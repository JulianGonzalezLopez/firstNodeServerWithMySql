const buttonsDelete = document.querySelectorAll('.delete');

const buttonsModify = document.querySelectorAll('.modify');

console.log(buttonsModify);

console.log(buttonsDelete);

buttonsDelete.forEach(button=>{
    let todo_id = button.dataset.id
    button.addEventListener('click',()=>{
        fetch(`/delete-todo/${todo_id}`,{
            method:'DELETE',
            body:todo_id
        })
        .then(()=>{
            location.reload();
        });
        
    })
});

buttonsModify.forEach(div=>{
    let button = div.querySelector('.modify-button');
    button.addEventListener('click',()=>{
        let newTodo = div.querySelector('input').value;
        console.log(newTodo);
        console.log(typeof newTodo);
        console.log(JSON.stringify(newTodo));
        let id = button.dataset.id;
        fetch(`/modify-todo/${id}`,{
            headers:{
                'Content-type':'application/json'
            },
            method:"PUT",
            body:JSON.stringify({
                newTodo
            })
        })
        .then(()=>{
            return location.reload();
        })
   
    })
})