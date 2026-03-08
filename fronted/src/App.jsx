import React from "react";
import SurveyForm from "./SurveyForm";

export default function App() {
  const topicId = "0.0.8120935"; // ton topic Hedera existant
  return <SurveyForm topicId={topicId} />;
}