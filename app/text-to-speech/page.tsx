'use client'

import React, { useEffect, useState } from 'react'
import {Controller,useForm} from "react-hook-form";
import {Button} from "../(components)/index.js";
import {SentanceCase} from "../../utils/utils.js";

function TEXT_TO_SPEEACH() {
  interface Voice {
    voice_id:string,
    name:string,
    preview_url:string,
    labels?:Labels
  }

  interface Labels{
    accent?:string,
    age?:string,
    description?:string,
    gender?:string,
    use_case?:string,
  }

  interface FormData{
    userText:string
  }
  
  const {control,handleSubmit} = useForm<FormData>();
  const [voices,setVoices] = useState<Voice[]>([]);
  const [audioUrl,setAudioUrl] = useState<string>()

  useEffect(()=>{
    const elevenlabsVoices = async()=>{
      const voices = await fetch("https://api.elevenlabs.io/v1/voices",{method:"GET"});
      const jsonVoices  = await voices.json();
      console.log(jsonVoices.voices);
      setVoices(jsonVoices.voices)
    }
    elevenlabsVoices();
  },[]);

  const formSubmission = async(data:FormData)=>{
      console.log(data);

      const textToSpeech = {
        data : data.userText
      }

      const responseAudio = await fetch("/text-to-speech/api",
        {
          method:"POST",
          body: JSON.stringify(textToSpeech)
        });

      const reader = responseAudio.body?.getReader();

      const chunks = [];
      if (reader) {
        while(true){
          const {done,value} = await reader.read();
          // console.log(value);
          
          if (done) {
            break;
          }
          chunks.push(value)
        }
      }else{
        console.log("Reader is undifined not data fetched ");
      }

      const audioBuffer = new Blob(chunks,{type:'audio/mpeg'});
      const audioUrl = URL.createObjectURL(audioBuffer);

      console.log(audioUrl);
      setAudioUrl(audioUrl);

  }

console.log(voices);


  return (
    <div>
        <div>
            <div className='lg:w-[60%] mx-auto p-4'>
              <form onSubmit={handleSubmit(formSubmission)}>
                <Controller
                name='userText'
                control={control}
                defaultValue=""
                rules={{required:"This is required"}}
                render={({field,fieldState:{error}})=>
                   <div>
                    <textarea {...field} className='w-full h-32 bg-gray-200 resize-none p-4 rounded-md shadow-sm focus:outline-2 focus:outline-blue-400' placeholder='Enter your text to speech...'></textarea>
                    {error && (<span className='text-pink-400 font-bold'>{error.message}</span>)}
                   </div>
                }
                />
                <div className='flex justify-center'>
                  <Button className={"px-7 py-3 rounded-md shadow-sm bg-gray-300 hover:bg-gray-500 font-semibold hover:text-white"} text="Submit"/>
                </div>
              </form>
              <div className='mt-4 flex justify-center'>
                <audio controls={true} src={audioUrl}></audio>
              </div>
            </div>

            {/* voices sample */}
            <div>
              <div className='mx-auto lg:w-[65%] flex gap-4 flex-wrap justify-center'>
                {voices.length>0 ? voices.map((voice)=>(
                  <div key={voice.voice_id} className='max-[300px]:w-full w-[300px] flex flex-col justify-between'>
                    <h1 className='font-bold'>{voice.name}</h1>
                    <div className=' flex-1 flex flex-col justify-between'>
                      <div className='flex gap-2 font-semibold flex-wrap my-2'>
                        <span className='tags'>{`${SentanceCase(voice.labels?.accent)} Styles`}</span>
                        <span className='tags'>{SentanceCase(voice.labels?.age)}</span>
                        <span className='tags'>{SentanceCase(voice.labels?.description)}</span>
                        <span className='tags'>{SentanceCase(voice.labels?.gender)}</span>
                        <span className='tags'>{SentanceCase(voice.labels?.use_case)}</span>
                      </div>
                      <audio className='block' controls={true} src={voice.preview_url}></audio>
                    </div>
                  </div>
                )): <></>}
              </div>
            </div>
        </div>
    </div>
  )
}

export default TEXT_TO_SPEEACH