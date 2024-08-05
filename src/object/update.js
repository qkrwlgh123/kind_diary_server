import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 목표 이름 업데이트 API */
export const handleUpdateObjectName = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const objectId = bodyInfo.objectId;
    const objectName = bodyInfo.object;

    const updateResult = await prisma.object.update({
      where: {
        id: objectId,
      },
      data: {
        object: objectName,
      },
    });

    res.status(200).json({ code: 200, data: updateResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
