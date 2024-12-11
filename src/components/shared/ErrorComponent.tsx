import { Button } from "../Button";

type ErrorProps = {
  message?: string;
  refetch?: () => void;
};

export default function ErrorComponent({ message, refetch }: ErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-red-500 text-lg text-center">{message}</p>
      {refetch && <Button onClick={refetch} className="bg-green-700 text-white mt-4 px-4 py-1 rounded-lg">Retry</Button>}
    </div>
  );
}
