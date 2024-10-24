'use client'

import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { Button } from '@/app/(components)/index.js';

function TEXT_TO_SPEEACH() {
    interface FormDatai{
        userText:string,
        gender:string,
        age:string,
        country:string
      }
    const { control, handleSubmit, register, watch } = useForm<FormDatai>();

    const [audioUrl, setAudioUrl] = useState<string>();
    const [spin, setSpin] = useState<boolean>(false);
    const [character, setCharacter] = useState<number>(0);

      const userText = watch("userText","");
    useEffect(()=>{
        // console.log(userText.length);
        setCharacter(userText.length);
        
    },[userText])


    const formSubmission = async (data: FormDatai) => {
        try {
            console.log(data);

            const datai = {
                gender: data.gender,
                accent: data.country,
                age: data.age,
                accent_strength: .3,
                text: data.userText
            }
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'xi-api-key': `${process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY}` },
                body: JSON.stringify(datai)
            };
            setSpin(true)
            fetch('https://api.elevenlabs.io/v1/voice-generation/generate-voice', options)
                .then(async (response) => {
                    console.log(response)
                    const reader = response.body?.getReader();

                    const chunks = []

                    if (reader) {
                     while (true) {
                      const { done, value } = await reader.read();
                       if (done) break;

                            chunks.push(value)
                        }
                    }else{
                        console.log("No data present");
                    }

                    const blob = new Blob(chunks,{type:"audio/mpeg"});
                    const blobAudioUrl = URL.createObjectURL(blob);

                    setAudioUrl(blobAudioUrl)
                    setSpin(false)
                })
                .catch((err) =>{
                    setSpin(false)
                     console.error(err)
                    });

        } catch (error) {
            console.log("Happen Some Errors", error);
            setSpin(false)
        }

    }


    // const watching = watch();
    // console.log(watching.voiceId);

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(formSubmission)}>
                    <div className='lg:w-[60%] mx-auto p-4'>
                        <Controller
                            name='userText'
                            control={control}
                            defaultValue=""
                            rules={{ required: "This is required",minLength:100 }}
                            render={({ field, fieldState: { error } }) =>
                                <div>
                                    <textarea {...field} className='w-full h-32 bg-gray-200 resize-none p-4 rounded-md shadow-sm focus:outline-2 focus:outline-blue-400 overflow-y-auto scrollbar' placeholder='Enter your text to speech...'></textarea>
                                    {error && (<span className='text-pink-400 font-bold'>{error.message}</span>)}
                                    <div className='flex justify-end font-bold gap-2'>
                                        <span>Minimum 100 Characters required:- {character}</span>
                                    </div>
                                </div>
                            }
                        />
                        <div>
                            <div className='flex flex-col gap-2 my-2'>
                                <span className='chooseStyle'>
                                    <label className='flex gap-4 justify-between '>
                                        <span className='font-bold'>Choose:-</span>
                                        <select
                                        className='w-1/2 flex-1'
                                        defaultValue={"#"}
                                        {...register("gender",{required:"This is required"})} id="">
                                            <option value="#">Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </label>
                                </span>
                                <span className='chooseStyle'>
                                    <label className='flex gap-4 justify-between '>
                                    <span className='font-bold'>Choose:-</span>
                                        <select className='w-1/2 flex-1'
                                        defaultValue={"#"}
                                        {...register("country",{required:"This is required"})}>
                                            <option value="#">Country</option>
                                            <option value="american">American</option>
                                            <option value="indian">Indian</option>
                                            <option value="african">african</option>
                                            <option value="australian">australian</option>
                                            <option value="british">british</option>
                                        </select>
                                    </label>
                                </span>
                                <span className='chooseStyle'>
                                    <label className='flex gap-4 justify-between '>
                                    <span className='font-bold'>Choose:-</span>
                                        <select className='w-1/2 flex-1'
                                        defaultValue={"#"}
                                        {...register("age",{required:"This is required"})}>
                                            <option value="#">Age</option>
                                            <option value="young">Young</option>
                                            <option value="middle_aged">Middle Aged</option>
                                            <option value="old">Old</option>
                                        </select>
                                    </label>
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Button spin={spin} className={"px-7 py-3 rounded-md shadow-sm bg-gray-300 hover:bg-gray-500 font-semibold hover:text-white"} text="Submit" />
                        </div>

                        <div className='mt-4 flex justify-center'>
                            {audioUrl ? (<> <audio controls={true} src={audioUrl}></audio></>) : (<></>)}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TEXT_TO_SPEEACH