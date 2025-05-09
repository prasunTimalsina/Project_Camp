import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";
import mongoose, { mongo } from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetch sucessfully"));
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  res.status(200).ApiResponse(200, project, "Project found");
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const createdBy = req?.user._id;

  const newProject = await Project.create({ name, description, createdBy });
  if (!newProject) {
    throw new ApiError(400, "Error creating project");
  }

  const projectMember = await ProjectMember.create({
    user: new mongoose.Types.ObjectId(createdBy),
    project: new mongoose.Types.ObjectId(newProject._id),
    role: UserRolesEnum.ADMIN,
  });

  if (!projectMember) {
    throw new ApiError(400, "Error assinging you as project admin");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, newProject, "New project created"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Required Project Id");
  }

  const newProject = await Project.findByIdAndUpdate(projectId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!newProject) {
    throw new ApiError(400, "Invalid project id or Invalid data");
  }
  res
    .status(200)
    .json(new ApiResponse(204, newProject, "Data updated sucessfully"));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project Id required");
  }

  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw new ApiError(400, "Unable to delete the project");
  }

  res
    .status(200)
    .json(new ApiResponse(204, { data: null }, "Project delete sucessfully"));
});

const getProjectMembers = async (req, res) => {
  // get project members
  const { projectId } = req.params;
  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }
  const projectMembers = await ProjectMember.find({ project: projectId });
  if (!projectMembers) {
    throw new ApiError(404, "Members not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, projectMembers, "Members found sucessfully"));
};

const addMemberToProject = async (req, res) => {
  // add member to project
  const { projectId } = req.params;

  //will be validate with validator middlerware
  const { email, role } = req.body;

  const user = await User.findOne({ email }).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const projectMember = await ProjectMember.create({
    user: new mongoose.Types.ObjectId(user._id),
    role,
    project: new mongoose.Types.ObjectId(projectId),
  });

  res
    .status(200)
    .json(new ApiResponse(201, projectMember, "Added user to project"));
};

const deleteMember = async (req, res) => {
  const { memberId } = req.params;

  if (!memberId) {
    throw new ApiError(404, "Member id required");
  }

  const member = await ProjectMember.findByIdAndDelete(memberId);

  if (!member) {
    throw new ApiError(400, "Invalid member id");
  }

  res
    .status(200)
    .json(new ApiResponse(204, null, "Member deleted sucessfully"));
};

const updateMemberRole = async (req, res) => {
  const { memberId } = req.params;
  const { role } = req.body;

  if (!memberId) {
    throw new ApiError(400, "Member id required");
  }

  if (!AvailableUserRoles.includes(role)) {
    {
      throw new ApiError(400, "Invalid user role");
    }
  }

  const updatedMember = await ProjectMember.findByIdAndUpdate(
    new mongoose.Types.ObjectId(memberId),
    {
      role,
    },
    { runValidators: true, new: true }
  );

  if (!updatedMember) {
    throw new ApiError(400, "Failed to update user role");
  }

  res
    .status(200)
    .json(
      new ApiResponse(204, updatedMember, "Member role update sucessfully")
    );
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
