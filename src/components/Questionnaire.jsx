import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const schema = z.object({
  answer: z.string().nonempty(),
});

const Questionnaire = ({ questions = [], onComplete }) => {
  const { handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const onSubmit = (data) => {
    setAnswers((prevAnswers) => [...prevAnswers, data.answer]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-4">{currentQuestion.question}</h2>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSubmit({ answer: option })}
              className="w-full text-left bg-gray-100 hover:bg-gray-200 p-2 rounded-md mt-2"
              disabled={currentQuestionIndex !== answers.length}
            >
              {option}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
