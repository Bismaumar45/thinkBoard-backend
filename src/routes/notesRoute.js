import express from "express";
import { getAllNotes,NotebyId ,createNotes, updateNotes, delNotes } from "../Controllers/notesController.js";

const router= express.Router();
 
router.get("/", getAllNotes);
router.get("/:id", NotebyId);
router.post("/",createNotes);
router.put("/:id",updateNotes);
router.delete("/:id",delNotes);


export default router;
