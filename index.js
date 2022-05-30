const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

const bodyParser = require("body-parser")
const app = express();

const {readUser,deleteTodo,modifyTodo,addTodo, addUser} = require('./conecciones');

// View engine setup
app.set('view engine', 'ejs');

app.use(express.static('/public'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.render("inicio");
})


app.get('/login',(req,res)=>{
    console.log();
    console.log(req.query,req.params);
    console.log(req.query.password);
    readUser({
        username:req.query.username,
        password:req.query.password
    })
    .then((resInfo)=>{
        console.log(resInfo);
        res.render('cuenta',{
            resInfo
        });
    })
    .catch(err=>console.log(err));
})
app.delete('/delete-todo/:id',(req,res)=>{
    let id = req.params.id;
    deleteTodo({id,res});
})
app.put('/modify-todo/:id',(req,res)=>{
    let id = req.params.id;
    let reqBody = JSON.stringify(req.body)
    console.log(req.body);
    console.log(reqBody);
    modifyTodo({
        nuevoTodo: req.body.newTodo
        ,id
    });
    res.end();
})

app.post('/create-todo',(req,resN)=>{
    let todoInfo = req.query;

    console.log(req.body);
    console.log(req.params);
    console.log(todoInfo,"asdasd");
    addTodo({
        newTodo:req.body.newTodo,
        id_creator:req.body["id-usuario"]
    })
    .then((res)=>{
        console.log(res);
        resN.redirect('back');
    })
})
app.post('/create-user',(req,res)=>{

    let newUser = req.body;
    console.log(newUser);

    addUser({
        username:newUser.username,
        password:newUser.password
    })
    .then(res=>{
        console.log(res);
    })

})
app.listen(3000,"192.168.0.8",()=>{
    console.log('Servidor iniciado en puerto 3000');
})