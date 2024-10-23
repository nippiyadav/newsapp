declare interface Voice {
    voice_id:string,
    name:string,
    preview_url:string,
    labels?:Labels
  }

 declare interface Labels{
    accent?:string,
    age?:string,
    description?:string,
    gender?:string,
    use_case?:string,
  }

 declare interface FormData{
    userText:string,
    voiceId:string
  }