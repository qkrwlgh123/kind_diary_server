import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 신규 목표 생성 API */
export const handleAddObject = async (req, res) => {
  const userId = req.headers.id;

  try {
    const bodyInfo = req.body.data;

    const objectName = bodyInfo.object;
    const date = bodyInfo.date;

    const createdResult = await prisma.object.create({
      data: {
        object: objectName,
        date,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.status(201).json({ code: 201, data: createdResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
