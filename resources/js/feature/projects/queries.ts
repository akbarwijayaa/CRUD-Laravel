// These functions should be replaced with Laravel API calls
// All Appwrite dependencies have been removed

// import { createSessionClient } from "@/lib/appwrite";
// import { Project } from "./type";
// import { DATABASE_ID, PROJECTS_ID } from "@/config";

// interface GetProjectProps {
//   projectId: string;
// }

// export const getProject = async ({ projectId }: GetProjectProps) => {
//   const { account, databases } = await createSessionClient();

//   const user = await account.get();

//   const project = await databases.getDocument<Project>(
//     DATABASE_ID,
//     PROJECTS_ID,
//     projectId
//   );

//   const member = await getMembers({
//     databases,
//     workspaceId: project.workspaceId,
//     userId: user.$id,
//   });

//   if (!member) {
//     throw new Error("UnAuthorized");
//   }
//   return project;
// };

// Placeholder export to prevent module errors
export const getProject = () => {
  throw new Error('This function should be replaced with Laravel API calls');
};
