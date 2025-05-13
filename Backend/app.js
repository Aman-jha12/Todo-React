const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todo", async (req, res) => {
    const todos = await Todo.find();
    res.json({ todos });
});

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
        res.status(400).send({
            message: "Invalid Payload",
            error: parsePayload.error.message,
        });
        return;
    }

    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.json({
        msg: "Todo created successfully",
    });
});

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(411).send({
            message: "Invalid Payload",
            error: parsedPayload.error.message,
        });
        return;
    }

    await todo.findByIdAndUpdate(req.body.id, { completed: true });

    res.json({
        message: "Todo has been updated Successfully",
    });
});

app.listen(port, () => {
    console.log("server is listening on port 8080");
});
