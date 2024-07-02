import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 할일 미완료 처리 API */
export const handleUncompleteTodo = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const todoId = bodyInfo.todoId;

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        isCompleted: false,
      },
    });

    res.status(200).json({ code: 200, data: updatedTodo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
