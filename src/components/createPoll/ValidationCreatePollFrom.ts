import { TPollData } from "../../types/type.common";

export const validatePoll = (data: TPollData) => {
  const errors: Record<string, string> = {};

  // Title Validation
  if (!data.title.trim()) {
    errors.title = "Poll title is required.";
  } else if (data.title.length < 5) {
    errors.title = "Title must be at least 5 characters long.";
  }

  // Options Validation (Minimum 2 options required)
  if (!data.options || data.options.length < 2) {
    errors.options = "At least two options are required.";
  }

  return errors;
};
