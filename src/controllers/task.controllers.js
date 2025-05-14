import { title } from "process";
import { ProjectMember } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import deleteAttachments from "../utils/attachmentDelete.js";
import { availableParallelism } from "os";
import mongoose from "mongoose";
// get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  //TODO:update get memebers function to get only members which are realted to your project
  const tasks = await Task.find({ project: projectId });
  if (!tasks) {
    throw new ApiError(400, "Failed to get tasks");
  }

  res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched sucessfully"));
});

// get task by id
const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    throw new ApiError(400, "Failed to get task");
  }

  res.status(200).json(new ApiResponse(200, task, "Task found sucessfully"));
};

// create task
const createTask = asyncHandler(async (req, res) => {
  const { projectId: project } = req.params;
  const { title, description } = JSON.parse(req.body.data);
  let { assignedTo } = JSON.parse(req.body.data);

  const attachments = [req.file];
  const assignedBy = req?.user._id;
  assignedTo = await User.findOne({ email: assignedTo });
  assignedTo = await ProjectMember({
    user: assignedTo._id,
    project,
  });

  if (!assignedTo) {
    throw new ApiError(400, "Assigned member is not part of this project");
  }
  //TODO: Check if it throw error if the user doesn't provide attachments
  const task = await Task.create({
    title,
    description,
    project,
    assignedTo,
    assignedBy,
    attachments,
  });

  res.status(200).json(new ApiResponse(201, task, "Task created sucessfully"));
});

// update task
//TODO: Brainstrom to find way to delete or add attachment
const updateTask = async (req, res) => {
  // update task
  const { taskId, projectId } = req.params;

  const task = await Task.findById(taskId);

  const {
    title,
    description,
    status: projectStatus,
    assignedTo,
  } = JSON.parse(req.body.data);

  if (title) {
    task.title = title;
  }

  if (description) {
    task.description = description;
  }

  if (projectStatus) {
    if (!availableParallelism.includes(projectStatus)) {
      throw new ApiError(400, "Invalid status");
    }
    task.status = projectStatus;
  }

  if (assignedTo) {
    //TODO:only select id and not other field
    console.log(assignedTo);
    const assignedUser = await User.find({ email: assignedTo });
    console.log(assignedUser);
    if (!assignedUser) {
      throw new ApiError(400, "Assigned user not found ");
    }
    const assignedToProjectMember = await ProjectMember.find({
      user: assignedUser._id,
      project: projectId,
    });
    if (!assignedToProjectMember) {
      throw new ApiError(400, "Assigned user is not part of the project");
    }

    task.assignedTo = new mongoose.Types.ObjectId(assignedToProjectMember._id);
  }

  if (req?.file) {
    task.attachments.push(req.file);
  }

  const updtatedTask = await task.save();

  res
    .status(200)
    .json(new ApiResponse(204, updtatedTask, "Task updated sucessfully"));
};

// delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  //find task
  let task = await Task.findById(taskId);

  //delete attachment realated to task
  const attachments = task.attachments;
  if (attachments.length > 0) {
    await deleteAttachments(attachments);
  }
  // now delete the task from db
  task = await Task.findByIdAndDelete(taskId, { new: true });

  res.status(200).json(new ApiResponse(204, null, "Task deleted sucessfully"));
});

// create subtask
const createSubTask = async (req, res) => {
  // create subtask
};

// update subtask
const updateSubTask = async (req, res) => {
  // update subtask
};

// delete subtask
const deleteSubTask = async (req, res) => {
  // delete subtask
};

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
