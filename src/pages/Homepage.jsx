// src/pages/Homepage.js
import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import Questionnaire from '../components/Questionnaire';
import Layout from '../components/Layout';
import questionsData from '../assets/questions.json';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DailyQuote from '../components/HomePage/DailyQuote';

const user = {
  name: "Alice Johnson",
  bio: "Dedicated to helping others find peace and balance.",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  activities: "Enjoys yoga, meditation, and reading self-help books.",
  backgroundImage: "https://randomuser.me/api/portraits/women/44.jpg"
};

const fetchTherapistMatch = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    name: "Dr. Emily Brown",
    specialty: "Mindfulness-Based Cognitive Therapy"
  };
};

const Homepage = () => {
  const [questions, setQuestions] = useState([]);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [sessionScheduled, setSessionScheduled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setQuestions(questionsData.questions);
  }, []);

  const handleQuestionnaireComplete = () => {
    setQuestionnaireCompleted(true);
  };

  const { data: therapistMatchData, isLoading, isError } = useQuery('therapistMatch', fetchTherapistMatch, {
    enabled: questionnaireCompleted,
  });

  const handleScheduleSession = () => {
    console.log("Session scheduled for:", selectedDate);
    setSessionScheduled(true);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const recommendedResources = [
    { title: "Managing Stress: A Guide", link: "#" },
    { title: "Coping with Anxiety: Techniques and Tips", link: "#" },
    { title: "Introduction to Mindfulness Meditation", link: "#" },
  ];

  const leftContent = <Profile user={user} />;

  const rightContent = (
    <>
    <h1 className="text-4xl font-bold mb-4">Hello, {user.name}!</h1>
      {isLoading && <p>Loading therapist match...</p>}
      {isError && <p>Error fetching therapist match data.</p>}
      {!questionnaireCompleted && questions.length > 0 && (
        <>
          <p className="text-lg mb-8">Ready to be matched with a therapist? Please answer the following questions:</p>
          <Questionnaire questions={questions} onComplete={handleQuestionnaireComplete} />
        </>
      )}
      {questionnaireCompleted && therapistMatchData && (
        <div className="bg-white rounded-lg shadow-md p-4 w-full text-center">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'green' }}>Congratulations!</h2>
          <p>You've completed the questionnaire. You are being matched to a therapist.</p>
          <p>Therapist Name: {therapistMatchData.name}</p>
          <p>Specialty: {therapistMatchData.specialty}</p>
          {!sessionScheduled && (
            <div className="mt-4">
              <p className="mb-2">Select a date for your session:</p>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border border-gray-300 p-2 rounded-md"
              />
              <button
                onClick={handleScheduleSession}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Schedule Session
              </button>
            </div>
          )}
          {sessionScheduled && <p className="mt-4">Session scheduled successfully!</p>}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Recommended Resources and Articles</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendedResources.map((resource, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{resource.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><a href={resource.link} className="text-blue-500 hover:underline">Read more</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <DailyQuote />
    </>
  );

  return <Layout user={user} leftContent={leftContent} rightContent={rightContent} />;
};

export default Homepage;
