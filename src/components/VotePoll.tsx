import { useParams } from "react-router-dom";

const VotePoll = () => {
  const { id } = useParams();
  return <div>VotePoll = {id}</div>;
};

export default VotePoll;
