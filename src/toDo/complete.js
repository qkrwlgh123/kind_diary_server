import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 할일 완료 처리 API */
export const handleCompleteTodo = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const todoId = bodyInfo.todoId;

    const findedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        isCompleted: true,
      },
    });

    res.status(200).json({ code: 200, data: findedTodo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
