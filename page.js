"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

const questions = [
  { question: "Where did we go on our first date?", answer: "Stories", options: ["Socials", "Vijaynagar Metro Station", "McDonald's", "Stories"] },
  { question: "Where did we go on our first trip?", answer: "Manipal", options: ["Pondicherry", "Manipal", "Gokarana"] },
  { question: "Which McDonald's did we go to first?", answer: "Cunningham Road", options: ["Vijaynagar", "Cunningham Road", "MG Road"] },
  { question: "Which club did we go to first?", answer: "Rahi", options: ["Socials", "Rahi", "Daddys"] },
  { question: "Who is your favourite friend?", answer: "Sidda", options: ["Ishani", "Shrishti", "Sidda", "Anushka", "Divyash"] },
  { question: "How much do I love you?", answer: "Infinity", options: ["Little", "Okay Okay", "Infinity"] }
];

export default function ValentineQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [attempts, setAttempts] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [showQuestionBox, setShowQuestionBox] = useState(true);

  const handleChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion] === questions[currentQuestion].answer) {
      setAttempts(1);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setSubmitted(true);
      }
    } else if (attempts < 2) {
      setAttempts(attempts + 1);
      alert("Try one more time!");
    } else {
      alert("Oops! The correct answer is: " + questions[currentQuestion].answer);
      setCurrentQuestion(currentQuestion + 1);
      setAttempts(1);
    }
  };

  const handleYes = () => {
    setIsConfettiActive(true);
    setShowQuestionBox(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6 text-white text-center" 
      style={{ backgroundImage: "url(https://media-hosting.imagekit.io//21bd841fc9764777/Untitled%20design.pdf_page-0001.jpg?Expires=1833800692&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=XRZnWH2hd3JU5gfdMD6Dl-RZ445S7n9gUEa5Por-WHqt9slj~XDRe9QPtSqb395gOuaVFXsMoxq~u3C3tQoa29WtD10lJHd7rfMSTGUDBNFbmSpYT9zY7p~y3sYLpP4lIPTmsi3FtHQ2gTMN49ZBpd8pSs3gKeETD1hfkvnqyBxEzXPhNNwSk9hoOyP8GtuKgzhkS8Yu423g0nMkzMZSHG8PcpL6Esr-Os0c2ZtHBXQ9IOTFlxBS3k7fRugwoX3rF8JKYeR3br6O0MzMvopbzmb4zOR9iTtvBh8PsZ-kjBaEvsVP2E24tBPCHYSIY3RW1xigoCF3OOGIidO4TmHzeQ__)" }}>
      {isConfettiActive && <Confetti />}
      {isConfettiActive ? (
        <h2 className="text-4xl font-bold text-red-500">Thank you Lalli, Love you!! 💖</h2>
      ) : (
        <div className="text-center">
          {showQuestionBox && !submitted ? (
            <div className="max-w-md bg-white p-12 rounded-2xl shadow-2xl text-gray-900 flex flex-col items-center text-center">
              <h1 className="text-4xl font-extrabold text-red-500 mb-8">💖 Suma, Let’s See How Well You Know Us!! Very Simple Quiz 💖</h1>
              <p className="text-2xl font-semibold mb-6">{questions[currentQuestion].question}</p>
              <select
                value={answers[currentQuestion]}
                onChange={(e) => handleChange(e.target.value)}
                className="w-3/4 p-4 mb-6 border-2 border-red-500 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select an answer</option>
                {questions[currentQuestion].options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
              <button 
                onClick={handleNext} 
                className="w-full bg-red-500 hover:bg-red-600 text-white text-xl py-3 rounded-xl shadow-md transform transition hover:scale-105"
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-red-500 mb-6">Will you be my Valentine? Sorry no option for NO! 💖</h2>
              <div className="flex justify-center gap-6 mt-6">
                <button 
                  onClick={handleYes} 
                  className="bg-green-500 text-white px-8 py-4 text-2xl rounded-xl shadow-md transform transition hover:scale-105"
                >Yes! 💕</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
