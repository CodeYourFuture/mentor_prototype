// An integration runs PER TRAINEE

import { IntegrationResponse } from "../..";

// Fetch and return data for a trainee from the external service

export const fetchData = async function (config, id: string) {
  const key = config.api_key; // see default_config.json
  const response: any = await fetch(`example.io/user=${id}&key=${key}`);
  return response.score;
};

// This fetchedData gets passed into the function below for processing (and comparison)

export const processData = async function (
  fetchedData,
  others?: IntegrationResponse[] // Data of other trainees for comparison (optional)
): Promise<IntegrationResponse> {
  const scores = others.map((t) => t.score.value);
  const isTopScore = Math.max(...(scores as number[])) >= fetchedData;
  const sentiment = isTopScore ? "positive" : "neutral";

  // This response data is stored with the trainee in JSON format, ready for querying

  return {
    score: { value: fetchedData, sentiment },
    isTopScore: { value: isTopScore },
  };
};
