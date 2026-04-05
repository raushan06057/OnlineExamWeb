export interface IResponseModel {
    id:number;
    success: boolean;
    message: string;
    roleName:string;
    organizationId:any;
    username:any;
    chatResponse?:IChatResponse;
}

export interface IResponseData extends IResponseModel{
    data: any;
}

export interface IResponseDataArray extends IResponseModel{
    data:any[];
}

export interface ILoginResponseModel extends IResponseData{
    isFirstTime:boolean;
}

//------------------------------------------------------------------------------------
export interface IChatResponse {
  messages: IMessage[] | null;
  responseId: string | null;
  conversationId?: string | null;
  modelId: string | null;
  createdAt: string | null;
  finishReason: string | null;
  usage: IUsage | null;
  continuationToken?: string | null;
  additionalProperties?: {
    load_duration?: string | null;
    total_duration?: string | null;
    prompt_eval_duration?: string | null;
    eval_duration?: string | null;
  } | null;
}

export interface IMessage {
  authorName?: string | null;
  createdAt: string | null;
  role: string | null;
  contents: IMessageContent[] | null;
  messageId?: string | null;
  additionalProperties?: any | null;
}
export interface IUsage {
  inputTokenCount: number | null;
  outputTokenCount: number | null;
  totalTokenCount: number | null;
  cachedInputTokenCount?: number | null;
  reasoningTokenCount?: number | null;
  inputAudioTokenCount?: number | null;
  inputTextTokenCount?: number | null;
  outputAudioTokenCount?: number | null;
  outputTextTokenCount?: number | null;
  additionalCounts?: any | null;
}
export interface IMessageContent {
  $type: string | null;
  text: string | null;
  annotations?: any | null;
  additionalProperties?: any | null;
}