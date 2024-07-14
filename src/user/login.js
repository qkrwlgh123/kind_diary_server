import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 유저 로그인 API */
export const handleLoginUser = async (req, res) => {
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

    const decrpytResult = bcrypt.compareSync(password, findedUser.password);

    if (!decrpytResult) {
      return res
        .status(400)
        .json({ code: 400, data: "Password is not matched" });
    }

    const generatedToken = jwt.sign(
      {
        id: findedUser.id,
        name: findedUser.name,
      },
      process.env.JWT_KEY
    );

    res.status(200).json({ code: 200, data: generatedToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
