import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 할일 이름 수정 API */
export const handleUpdateTodo = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const todoId = bodyInfo.todoId;
    const updateName = bodyInfo.name;

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data: {
        name: updateName,
      },
    });

    res.status(200).json({ code: 200, data: updatedTodo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
