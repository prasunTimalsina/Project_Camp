import fs from "fs/promises";
const deleteAttachments = async (attachments) => {
  for (const attachment of attachments) {
    try {
      //to check whether the file is available or not
      await fs.access(attachment.path);
      //delete the file
      await fs.unlink(attachment.path);
    } catch (err) {
      console.error(`Failed to delete file: ${attachment.path}`, err);
    }
  }
};

export default deleteAttachments;
