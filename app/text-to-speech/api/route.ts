import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ElevenLabsClient, ElevenLabs } from "elevenlabs";

export async function GET(req:NextRequest){

    console.log("Yes working",req.url);
    
    const client = new ElevenLabsClient({apiKey:process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY});

    const resultResponse =  await client.textToSpeech.convert("pMsXgVXv3BLzUgSXRplE",{
        optimize_streaming_latency:ElevenLabs.OptimizeStreamingLatency.Zero,
        text:"It sure does, Jackie\u2026 My mama always said: \u201CIn Carolina, the air's so thick you can wear it!\u201D",
        output_format:ElevenLabs.OutputFormat.Mp32205032,
        voice_settings:{
          similarity_boost:0.3,
          stability:0.1,
          style:0.2
        }
      })

      console.log(resultResponse);

      return NextResponse.json({ message: "API Route Triggered" });
     
}