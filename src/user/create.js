import bcrypt from "bcryptjs";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 신규 유저 생성 API */
export const handleCreateUser = async (req, res) => {
  try {
    const bodyInfo = req.body.data;

    const name = bodyInfo.name;
    const password = bodyInfo.password;

    const encryptedPw = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_KEY)
    );

    await prisma.user.create({
      data: {
        name,
        password: encryptedPw,
      },
    });

    res.status(201).json({ code: 201, data: "Successfully created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
