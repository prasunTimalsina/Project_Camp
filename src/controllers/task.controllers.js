import { ProjectMember } from "../models/projectmember.models.js";
import { Task } from "../models/task.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

// get all tasks
const getTasks = async (req, res) => {
  // get all tasks
};

// get task by id
const getTaskById = async (req, res) => {
  // get task by id
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
const updateTask = async (req, res) => {
  // update task
};

// delete task
const deleteTask = async (req, res) => {
  // delete task
};

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
