import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 신규 할일 추가 API */
export const handleAddTodo = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const objectId = bodyInfo.objectId;
    const toDo = bodyInfo.toDo;

    const createdResult = await prisma.todo.create({
      data: {
        name: toDo,
        object: {
          connect: { id: objectId },
        },
      },
    });

    res.status(201).json({ code: 201, data: createdResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
