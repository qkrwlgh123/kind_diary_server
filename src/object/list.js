import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 월별 목표 리스트 조회 API */
export const handleObjectList = async (req, res) => {
  try {
    const bodyInfo = req.body.data;
    const yearMonth = bodyInfo.yearMonth;

    // yearMonth를 분해하여 연도와 월 구분
    const [year, month] = yearMonth.split("-").map(Number);

    // 해당 월의 첫 번째 날과 마지막 날을 계산
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const findResult = await prisma.object.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        toDos: true, // toDos 관계를 포함시킵니다.
      },
    });

    res.status(200).json({ code: 200, data: findResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
