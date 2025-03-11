import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VotePoll = () => {
  const { id } = useParams();

  const [pollData, setPollData] = useState(null);

  useEffect(() => {
    fetch(`https://vanishvote-server-iota.vercel.app/api/v1/polls/${id}`)
      .then((res) => res.json())
      .then((data) => setPollData(data?.data));
  }, [id]);

  console.log(pollData);
  return (
    <div className="px-4 py-5 sm:p-6 bg-white max-w-3xl mx-auto box border divide-y border-t-[#EAB308] border-t-4 divide-gray-200 dark:divide-gray-700 rounded-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate text-gray-900 dark:text-gray-100">
          Create a Poll
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Complete the below fields to create your poll.
        </p>
      </div>
    </div>
  );
};

export default VotePoll;
