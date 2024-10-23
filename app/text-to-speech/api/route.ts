import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function POST(req:NextRequest){
  try {
    const body = await req.json();
    const {data:userText,voiceId} = body;
  
      // const voiceId = "9BWtsMINqrJLrRacOk9x"
      console.log("Yes working",req.url);
  
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`
      
      const headers = {
          "Accept":"audio/mpeg",
          "xi-api-key": `${process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY}`,
          "Content-Type":"application/json"
      }
  
      const data = {
          text:userText,
          model_id:"eleven_monolingual_v1",
          voice_settings:{
            similarity_boost:0.3,
            stability:0.1,
            style:0.2
          }
        }
  
        const responseAudio = await fetch(url,{
          method:"POST",
          headers: headers,
          body: JSON.stringify(data)
        })
  
        // console.log(responseAudio);
  
        const reader = responseAudio.body
        
        return new NextResponse(reader,{
          headers:{
              'Content-Type':'audio/mpeg'
          }
        })
  } catch (error) {
    NextResponse.json({
      status:500,
      message:"Error from the server side"
    })
  }
}



//  for checking typscript we npm run lint








// const responseAudio = await fetch(url,{
//     method:"POST",
//     headers: headers,
//     body: JSON.stringify(data)
//   })

//   console.log(responseAudio);
  
//   const filePath = fs.createWriteStream("audio.mp3");
//   const reader = responseAudio.body?.getReader()

//   let chunks = []
// while(true){
//     const {done,value} = await reader?.read();

//     if (done) break;
//     // // if we write code inside the while we use the from not the concat 
//     // filePath.write(Buffer.from(chunks))
//     chunks.push(value)
// }
// // if we write the code outside the while loop then we have to use the concat to join all array value into the one
// filePath.write(Buffer.concat(chunks))

// filePath.end("done")



// // //   this is for the making blob object 
// //   const audioBlob = new Blob(chunks,{type:"audio/mpeg"});
// // // this is for the making url for the blob
// //   const audioUrl = URL.createObjectURL(audioBlob);

// //   console.log(audioUrl);