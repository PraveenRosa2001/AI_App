import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index,nextWord) =>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord)
        },75*index)
    }

    const onSent = async () => {
        setResultData(""); // Clear previous result
        setLoading(true); // Set loading to true
        setShowResult(true); // Show result container
        setRecentPrompt(input); // Set recent prompt with input
        
        try {
          const response = await run(input); // Fetch the result using input
          
          // Process the response: make parts between '**' bold
          let responseArray = response.split("**");
          let newResponse = ""; // Initialize newResponse
          
          for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 0) {
              newResponse += responseArray[i]; // Normal text
            } else {
              newResponse += "<b>" + responseArray[i] + "</b>"; // Bold text
            }
          }

          let newResponse2=newResponse.split("*").join("</br>")

          let newResponseArray = newResponse2.split(" ");
          for(let i=0; i<newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
          } // Set processed result
        } catch (error) {
          console.error("Error:", error);
          setResultData("Failed to fetch response. Please try again.");
        }

        setLoading(false); // Stop loading
        setInput(""); // Clear the input field
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
