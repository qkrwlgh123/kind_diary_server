import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 유저 비밀번호 변경 API */
export const handleChangePassword = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const name = bodyInfo.name;
    const password = bodyInfo.password;

    const findedUser = await prisma.user.findFirst({
      where: {
        name,
      },
    });

    if (!findedUser) {
      return res.status(404).json({ code: 404, data: "User is not exist" });
    }

    const encryptedPw = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_KEY)
    );

    await prisma.user.update({
      where: {
        id: findedUser.id,
      },
      data: {
        password: encryptedPw,
      },
    });

    res.status(200).json({ code: 200, data: "Successfully updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
