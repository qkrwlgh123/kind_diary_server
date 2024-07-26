import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 주별(월 ~ 금) 종합 달성률 API */
export const handleGeneralResult = async (req, res) => {
  const userId = req.headers.id;

  try {
    const queryInfo = req.query;
    const todayDate = queryInfo.todayDate;

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
        user_id: userId,
      },
      orderBy: {
        id: "asc",
      },
      include: {
        toDos: true,
      },
    });

    const total = findResult.reduce(
      (accumulator, currentValue) => accumulator + currentValue.toDos.length,
      0
    );

    const completedTodos = findResult
      .flatMap((object) => object.toDos)
      .filter((todo) => todo.isCompleted).length;

    const achievementResult = Math.floor((completedTodos / total) * 100);

    res.status(200).json({ code: 200, data: achievementResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
