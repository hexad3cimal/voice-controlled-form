import React, { createContext, useEffect, useState } from "react";

export const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [transcript, setTranscript] = useState("");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = function(event) {
      console.log(event)
    setTranscript(event.results[event.resultIndex][0].transcript);
  }
  
  useEffect(()=>{

recognition.start()

  },[inputs])

  useEffect(()=>{
      const matchedWord =  transcript && transcript.split(" ").filter( word => {
            return inputs.includes(word)
        })
        console.log(matchedWord)
        console.log(transcript)

        if(transcript.includes("set") && matchedWord){
            setResult({[matchedWord[0]]: transcript.split(matchedWord)[1]})
            console.log({[matchedWord[0]]: transcript.split(matchedWord)[1]})
        }
    
      },[transcript])
  return (
    <VoiceContext.Provider
      value={{
        result,
    setInputs,
    setResult
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};