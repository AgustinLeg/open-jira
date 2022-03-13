import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../databases";
import { Entry, IEntry } from "../../../../models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return removeEntry(req, res);

    default:
      return res.status(400).json({ message: "Metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese ID" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  // const updatedEntry = await Entry.findByIdAndUpdate(
  //   id,
  //   {
  //     description,
  //     status,
  //   },
  //   { runValidators: true, new: true }
  // );

  try {
    entryToUpdate.description = description;
    entryToUpdate.status = status;
    await entryToUpdate.save();
    res.status(200).json(entryToUpdate!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entry = await Entry.findById(id);
  await db.disconnect();

  if (!entry) {
    res.status(400).json({ message: "No encontramos ese producto" });
  }

  res.status(200).json(entry!);
};

const removeEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entry = await Entry.findByIdAndRemove(id);
  await db.disconnect();

  if (!entry) {
    res.status(400).json({ message: "No encontramos ese producto" });
  }

  res.status(200).json(entry!);
};
