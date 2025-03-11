import { ChangeEvent, useState } from "react";
import { Input } from "../Input";
import { validatePoll } from "./ValidationCreatePollFrom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [pollData, setPollData] = useState({
    title: "",
    pollType: "multiple_choice",
    options: [{ id: 1, text: "" }],
    settings: {
      allowMultipleSelection: { type: "false" }, // Default single choice
      requireParticipantNames: false,
      resultsVisibility: "always_public",
      pollExpiryDate: "",
      allowComments: false,
    },
  });

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    field: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (field.startsWith("settings.")) {
      const settingsField = field.split(".")[1];
      setPollData((prevPollData) => ({
        ...prevPollData,
        settings: {
          ...prevPollData.settings,
          [settingsField]: e.target.value,
        },
      }));

      // **Validate after input change**
    } else {
      setPollData((prevPollData) => ({
        ...prevPollData,
        [field]: e.target.value,
      }));
      setErrors(validatePoll(pollData));
    }
  };

  const handleAddOption = () => {
    setPollData((prevPollData) => ({
      ...prevPollData,
      options: [
        ...prevPollData.options,
        {
          id: prevPollData.options.length + 1,
          text: "",
        },
      ],
    }));

    setErrors(
      validatePoll({
        ...pollData,
        options: [
          ...pollData.options,
          {
            id: pollData.options.length + 1,
            text: "",
          },
        ],
      })
    );
  };

  const checkAllOptionFieldFill = () => {
    return pollData.options.some((option) => option.text.length < 2);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...pollData.options];

    updatedOptions[index].text = value;

    setPollData((prevPollData) => ({
      ...prevPollData,
      options: updatedOptions,
    }));
  };

  const handleRemoveOption = (index: number) => {
    const remainingOption = pollData.options.filter(
      (_option, i) => index !== i
    );
    setPollData((prevPollData) => ({
      ...prevPollData,
      options: remainingOption,
    }));

    setErrors(validatePoll({ ...pollData, options: remainingOption }));
  };

  const handleFormSubmit = async () => {
    const validationErrors = validatePoll(pollData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const res = await fetch(
        `https://vanishvote-server-iota.vercel.app/api/v1/polls/create-poll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pollData),
        }
      );
      const data = await res.json();
      if (data?.success) {
        toast.success(data?.message || "Sucessfull");
        navigate(`/vote/${data?.data?._id}`);
      }
      setLoading(false);
      setPollData({
        ...pollData,
        title: "",
        options: [{ id: 1, text: "" }],
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate text-gray-900 dark:text-gray-100">
          Create a Poll
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Complete the below fields to create your poll.
        </p>
      </div>

      <div className="px-4 py-5 sm:p-6 bg-white max-w-3xl mx-auto box border divide-y border-t-[#EAB308] border-t-4 divide-gray-200 dark:divide-gray-700 rounded-md">
        <div className="space-y-4">
          {/* Title input */}
          <div>
            <label className="block text-[0.875rem] leading-5 mb-1 text-[#374151] font-semibold">
              Title
            </label>
            <div className="mt-1 relative">
              <Input
                value={pollData.title}
                onChange={(e) => handleInputChange("title", e)}
                type="text"
                placeholder="Type your question here"
              />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
          </div>

          {/* Option input */}
          <div className="space-y-2">
            <label className="block text-[0.875rem] leading-5 mb-1 text-[#374151] font-semibold">
              Answer Options
            </label>

            {pollData.options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  type="text"
                  placeholder={`Option ${index}`}
                />

                {pollData.options.length > 1 ? (
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="size-12 rounded-md border bg-red-50 text-red-500"
                  >
                    X
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}

            {errors?.options && (
              <p className="text-red-500 text-sm">{errors.options}</p>
            )}
            <button
              className={`border px-3 py-1.5 rounded-md bg-white ${
                checkAllOptionFieldFill() && "cursor-not-allowed"
              }`}
              disabled={checkAllOptionFieldFill()}
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>

          {/* pollExpiryDate input */}
          <div>
            <label className="block text-[0.875rem] leading-5 mb-1 text-[#374151] font-semibold">
              Expiry Date(Optional)
            </label>
            <div className="mt-1 relative">
              <Input
                value={pollData.settings.pollExpiryDate}
                onChange={(e) =>
                  handleInputChange("settings.pollExpiryDate", e)
                }
                type="datetime-local"
                placeholder="Type your question here"
              />
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handleFormSubmit}
            className={`border px-3 py-1.5 rounded-md bg-pramary text-white hover:bg-opacity-90`}
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
