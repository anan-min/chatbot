"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import RecordButton from "@/components/home/RecordButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import AudioVisualize from "@/components/home/AudioVisualize";
import { Canva } from "@/components/home/Canva";

const MainCard = () => {
  const [sttProvider, setSttProvider] = useState("openai_stt");
  const [ttsProvider, setTtsProvider] = useState("openai_tts");
  const [queryProvider, setQueryProvider] = useState("chatgpt");
  const [processedAudioURL, setProcessedAudioURL] = useState(null);
  const [textResponse, setTextResponse] = useState(null);

  useEffect(() => {
    console.log("sttProvider", sttProvider);
    console.log("ttsProvider", ttsProvider);
    console.log("queryProvider", queryProvider);
    console.log("textResponse", textResponse);
  }, [sttProvider, ttsProvider, queryProvider, textResponse]);

  return (
    <Card className="w-2/3 h-2/3 max-w-[700px] dark:dark-shadow mt-4">
      <CardHeader>
        <CardTitle>
          Chat with <span className="text-teal-600 font-bold">SCG</span>
        </CardTitle>
        <CardDescription className="mb-4">
          Choose providers and hit record.
        </CardDescription>
      </CardHeader>

      <div className="w-full h-full flex justify-center items-center">
        <Card className="w-2/3 aspect-square overflow-hidden">
          <Canva
            processedAudioURL={processedAudioURL}
            textResponse={textResponse}
          />
        </Card>
      </div>

      <CardContent className="mt-4">
        <form>
          <div className="grid w-full items-center gap-4">
            {[
              {
                label: "STT Provider",
                id: "stt-provider",
                value: sttProvider,
                onChange: setSttProvider,
                options: [
                  { value: "google_stt", label: "Google Speech-to-Text" },
                  { value: "openai_stt", label: "OpenAI Whisper" },
                  { value: "aws_stt", label: "AWS Transcribe" },
                ],
              },
              {
                label: "TTS Provider",
                id: "tts-provider",
                value: ttsProvider,
                onChange: setTtsProvider,
                options: [
                  { value: "google_tts", label: "Google Text-to-Speech" },
                  { value: "openai_tts", label: "OpenAI TTS" },
                  { value: "aws_tts", label: "AWS Polly" },
                ],
              },
              {
                label: "Query Provider",
                id: "query-provider",
                value: queryProvider,
                onChange: setQueryProvider,
                options: [
                  { value: "chatgpt", label: "ChatGPT" },
                  { value: "gemini", label: "Gemini AI" },
                  { value: "llama", label: "Llama AI" },
                ],
              },
            ].map(({ label, id, value, onChange, options }) => (
              <div key={id} className="flex flex-col space-y-1.5">
                <Label htmlFor={id}>{label}</Label>
                <Select
                  value={value}
                  onValueChange={(value) => onChange(value)}
                >
                  <SelectTrigger id={id}>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {options.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <RecordButton
          sttProvider={sttProvider}
          ttsProvider={ttsProvider}
          queryProvider={queryProvider}
          setProcessedAudioURL={setProcessedAudioURL}
          setTextResponse={setTextResponse}
        />
      </CardFooter>
    </Card>
  );
};

export default MainCard;
