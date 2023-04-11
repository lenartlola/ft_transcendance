import { ChatRoomDto } from "src/_shared_dto/chat-room.dto";
import MessageConv from "./MessageConv";
import MessageInput from "./MessageInput";
import { UseLoginDto } from "../Log/dto/useLogin.dto";

interface MessagePanelProps {
  selfId: number;
  sendMessage: Function;
  room: ChatRoomDto | undefined;
  loginer: UseLoginDto;
}

export default function MessagePanel({
  selfId,
  sendMessage,
  room,
  loginer,
}: MessagePanelProps) {
  return (
    <>
      <div className="mt-2 flex h-10 w-full items-center justify-center rounded-t bg-gray-200 text-center dark:bg-gray-700 dark:text-white">
        <div className="shadow-b mr-2 h-8 items-center justify-center overflow-x-hidden whitespace-nowrap border-b border-gray-900 px-20">
          {room?.name || "No room selected"}
        </div>
      </div>
      <div
        id="chat"
        className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch mb-2 h-0 flex-grow overflow-y-scroll rounded-b bg-gray-200 shadow-lg dark:bg-gray-700 dark:text-white"
      >
        <MessageConv
          loginer={loginer}
          selfId={selfId}
          messages={room?.messages || []}
        />
      </div>
      <MessageInput sendMessage={sendMessage} />
    </>
  );
}
