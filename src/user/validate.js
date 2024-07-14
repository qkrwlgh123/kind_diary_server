import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** 유저 토큰 검증 API */
export const handleValidateToken = async (req, res) => {
  try {
    const bodyInfo = req.headers;

    const token = bodyInfo.token;

    const tokenVerifyResult = jwt.verify(token, process.env.JWT_KEY);

    if (!tokenVerifyResult) {
      return res
        .status(400)
        .json({ code: 400, data: "Token is not validated" });
    }

    res.status(201).json({ code: 201, data: tokenVerifyResult });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
