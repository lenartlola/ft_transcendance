import { UserDto } from "src/_shared_dto/user.dto";

interface MessageBulleSendProps {
  user: UserDto;
  text: string;
}

export default function MessageBulleSend({
  user,
  text,
}: MessageBulleSendProps) {
  return (
    <div className="my-1 flex w-full items-end justify-end pr-2">
      <div className="mx-2 break-all rounded-lg bg-cyan-500 p-2 px-4 text-xs text-white ">
        {text}
      </div>
      <img
        src={user.avatar_url}
        alt={user.pseudo}
        title={user.pseudo}
        className="order-2 h-6 w-6 rounded-full object-cover"
      />
    </div>
  );
}
