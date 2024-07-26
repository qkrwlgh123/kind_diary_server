import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 월별 목표 리스트 조회 API */
export const handleObjectList = async (req, res) => {
  const userId = req.headers.id;

  try {
    const paramsInfo = req.params;
    const yearMonth = paramsInfo.yearMonth;

    const findResult = await prisma.object.findMany({
      where: {
        date: {
          startsWith: yearMonth,
        },
        user_id: userId,
      },
      orderBy: {
        id: "asc",
      },
      include: {
        toDos: {
          orderBy: {
            id: "asc", // ID 순서대로 오름차순 정렬
          },
        },
      },
    });

    res.status(200).json({ code: 200, data: findResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
