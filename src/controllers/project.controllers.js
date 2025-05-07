import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";
const getProjects = async (req, res) => {
  const projects = await Project.find();
  res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetch sucessfully"));
};

const getProjectById = asyncHandler(async (req, res) => {
  // get project by id
  const projectId = req?.params.id;
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

  return res
    .status(200)
    .json(new ApiResponse(201, newProject, "New project created"));
});

const updateProject = async (req, res) => {
  const newTour = await Project.findByIdAndUpdate(req?.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!newTour) {
    throw new ApiError(400, "Invalid project id or Invalid data");
  }
  res
    .status(200)
    .json(new ApiResponse(204, newTour, "Data updated sucessfully"));
};

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req?.params.id);

  res
    .status(200)
    .json(new ApiResponse(204, { data: null }, "Project delete sucessfully"));
});

const getProjectMembers = async (req, res) => {
  // get project members
  const projectId = req?.params.id;
  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }
  const projectMembers = await ProjectMember.find({ project: projectId });
  if (!projectMembers) {
    throw new ApiError(400, "Invalid id");
  }

  res
    .status(200)
    .json(new ApiResponse(200, projectMembers, "Members found sucessfully"));
};

const addMemberToProject = async (req, res) => {
  // add member to project
  const { email, role, projectId } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const projectMember = await ProjectMember.create({
    user: user._id,
    role,
    project: projectId,
  });

  res
    .status(200)
    .json(new ApiResponse(201, projectMember, "Added user to project"));
};

//memeber id: 681b179d1b7201a689722e55
const deleteMember = async (req, res) => {
  const member = await ProjectMember.findByIdAndDelete(req?.params.id);

  if (!member) {
    throw new ApiError(400, "Invalid member id");
  }

  res
    .status(200)
    .json(new ApiResponse(204, null, "Member deleted sucessfully"));
};

const updateMemberRole = async (req, res) => {
  const memberId = req.params.id;
  const { role } = req.body;

  const updatedMember = await ProjectMember.findByIdAndUpdate(
    memberId,
    {
      role,
    },
    { runValidators: true, new: true }
  );

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
