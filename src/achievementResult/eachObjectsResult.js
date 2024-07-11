import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 주별(월 ~ 금) 목표별 달성률 API */
export const handleEachObjectsResult = async (req, res) => {
  try {
    const bodyInfo = req.body.data;
    const todayDate = bodyInfo.todayDate;

    const convertedToDateTodayDate = new Date(todayDate);
    const monday = new Date(convertedToDateTodayDate);
    const friday = new Date(convertedToDateTodayDate);

    monday.setDate(convertedToDateTodayDate.getDate() - 5);
    friday.setDate(convertedToDateTodayDate.getDate() - 1);

    const formatDate = (d) => d.toISOString().split("T")[0];

    const findResult = await prisma.object.findMany({
      where: {
        date: {
          gte: formatDate(monday),
          lte: formatDate(friday),
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        toDos: true,
      },
    });

    const objectsMap = new Map();

    for (let i = 0; i < findResult.length; i++) {
      const currentObjectName = findResult[i].object;
      const currentObjectTodos = findResult[i].toDos;

      if (objectsMap.has(currentObjectName)) {
        const existingValue = objectsMap.get(currentObjectName);

        existingValue.total += currentObjectTodos.length;
        existingValue.completed += currentObjectTodos.filter(
          (todo) => todo.isCompleted
        ).length;

        objectsMap.set(currentObjectName, {
          total: existingValue.total,
          completed: existingValue.completed,
        });
      } else {
        objectsMap.set(currentObjectName, {
          total: currentObjectTodos.length,
          completed: currentObjectTodos.filter((todo) => todo.isCompleted)
            .length,
        });
      }
    }

    const achievementsResult = [...objectsMap].map((object) => ({
      object: object[0],
      completedRate: Math.floor((object[1].completed / object[1].total) * 100),
    }));

    res.status(200).json({ code: 200, data: achievementsResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
