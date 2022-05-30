const { response } = require('express');
const res = require('express/lib/response');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'I will not give it to you lol',
    database:'projectoConSql'
});


const readUser =  (data)=>{
    return new Promise((resolve,reject) =>{
        let query = 'SELECT * FROM users WHERE username = ?';
        let formatedQuery = mysql.format(query,[data.username]);
        
         connection.query(formatedQuery,(err,result)=>{

            if(err) throw err;

            let resultParsed = Object.values(JSON.parse(JSON.stringify(result)));

            if(resultParsed[0] == undefined){
                return console.error(`No existe un usuario con ese nombre de usuario`);
            }
            
            if(resultParsed[0].password != data.password) console.log('wrong password');
            else{
                console.log('logged');
                resolve(readTodos(resultParsed[0].id,resultParsed[0]));
            }
        })
    })
}

const readTodos = (id,userInfo)=>{
    return new Promise((resolve,reject) =>{
        console.log('reading todos');
        let queryTodos = 'SELECT * FROM todos WHERE created_by_id = ?';
        let formatedQueryTodos = mysql.format(queryTodos,[id]);
    
        connection.query(formatedQueryTodos,(err,resultTodos)=>{  
            if(err) throw err;
    

            let resultTodosParsed = Object.values(JSON.parse(JSON.stringify(resultTodos)));
            console.log(resultTodosParsed);
            resolve({
                userInfo,
                todosInfo:resultTodosParsed
            });
        })
    }
    )
}

const deleteTodo = (data) => {
    return new Promise((resolve,reject)=>{  
        let query = 'DELETE FROM todos WHERE todo_id = ?';
        let formatedQuery = mysql.format(query,data.id);

        connection.query(formatedQuery,(err,result)=>{
            if(err) throw err;

            resolve(data.res.redirect('back'));
        })

    })
}

const modifyTodo = (data) =>{
    return new Promise((resolve,reject)=>{
        console.log(data);
        let query = 'UPDATE todos SET todo = ? WHERE todo_id = ?';
        let formatedQuery = mysql.format(query,[data.nuevoTodo,data.id]);

        connection.query(formatedQuery,(err,result)=>{
            if(err) throw err;
        })
    })
}

const addTodo = (data) =>{
    return new Promise((resolve,reject)=>{
        let query = 'INSERT INTO todos(todo,created_by_id) VALUES(?,?)';
        let formatedQuery = mysql.format(query,[data.newTodo,data.id_creator]);
    
        connection.query(formatedQuery,(err,result)=>{
            if(err) throw err;
            resolve(result);
        })
    })
}

const addUser = (data) =>{
    return new Promise((resolve,reject)=>{
        let query = "INSERT INTO users (username,password) VALUES(?,?)";
        let formatedQuery = mysql.format(query,[data.username,data.password]);

        connection.query(formatedQuery,(err,res)=>{
            if(err) throw err;

            resolve(res);
        })
    })
}

module.exports = {
    connection,
    readUser,
    readTodos,
    deleteTodo,
    modifyTodo,
    addTodo,
    addUser
}