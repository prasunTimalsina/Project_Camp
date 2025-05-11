import mongoose from "mongoose";
import { ProjectNote } from "../models/note.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const getNotes = asyncHandler(async (req, res) => {
  // get all notes
  const notes = await ProjectNote.find();
  if (!notes) {
    throw new ApiError(404, "Notes not found");
  }

  res.status(200).json(new ApiResponse(200, notes, "Notes found sucessfully"));
});

const getNoteById = asyncHandler(async (req, res) => {
  // get note by id
  const { noteId } = req.params;
  if (!noteId) {
    throw new ApiError(400, "Note id required");
  }
  const note = await ProjectNote.findById(noteId);
  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  res.status(200).json(new ApiResponse(200, note, "Note found sucessfully"));
});

const createNote = asyncHandler(async (req, res) => {
  // create note
  const { projectId } = req.params;
  const userId = req?.user._id;
  const { content } = req.body;

  const note = await ProjectNote.create({
    project: new mongoose.Types.ObjectId(projectId),
    createdBy: new mongoose.Types.ObjectId(userId),
    content,
  });

  if (!note) {
    throw new ApiError(400, "Error creating note");
  }

  res.status(200).json(new ApiResponse(201, note, "Note created successfully"));
});

const updateNote = asyncHandler(async (req, res) => {
  // update note
  const { noteId } = req.params;
  const { content } = req.body;

  if (!noteId) {
    throw new ApiError(400, "Note Id required");
  }
  if (!content) {
    throw new ApiError(400, "Content is required to update the note");
  }

  const note = await ProjectNote.findByIdAndUpdate(
    noteId,
    { content },
    {
      new: true,
      runValidators: false,
    }
  );

  res.status(200).json(new ApiResponse(204, note, "Updated note sucessfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
  // delete note
  const { noteId } = req.params;

  const note = await ProjectNote.findByIdAndDelete(noteId, {
    new: true,
  });

  if (!note) {
    throw new ApiError(400, "Unable to delete the note");
  }

  res.status(200).json(204, null, "Note delete sucessfully");
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
