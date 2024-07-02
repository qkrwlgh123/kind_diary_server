import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 할일 삭제 API */
export const handleDeleteTodo = async (req, res) => {
  try {
    const bodyInfo = req.body;

    const todoId = bodyInfo.todoId;

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    res.status(200).json({ code: 200, data: deletedTodo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
