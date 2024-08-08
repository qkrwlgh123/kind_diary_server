import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 목표 삭제 API */
export const handleDeleteObject = async (req, res) => {
  try {
    const bodyInfo = req.body;

    const objectId = bodyInfo.objectId;

    await prisma.object.delete({
      where: {
        id: objectId,
      },
    });

    res.status(200).json({ code: 200, data: { deletedId: objectId } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
