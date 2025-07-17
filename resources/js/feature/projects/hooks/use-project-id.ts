import { useParams } from "react-router-dom";

export const useProjectId = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return projectId!;
};
