import ReactMarkdown from "react-markdown";

type Card1Props = {
  name: string;
  email: string;
  nationality: string;
  status: string;
  about: string;
};

export default function Card1({ name, email, nationality, status, about }: Card1Props) {
  return (
    <div className="relative bg-secondary flex flex-col overflow-hidden rounded-xl p-6 mx-6 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(var(--color-primary-rgb))]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 p-2">
        <div>
          <p className="text-md md:text-lg font-bold">Name</p>
          <p className="text-lg md:text-xl">{name}</p>
        </div>
        <div>
          <p className="text-md md:text-lg font-bold">Nationality</p>
          <p className="text-lg md:text-xl">{nationality}</p>
        </div>
        <div>
          <p className="text-md md:text-lg font-bold">Email</p>
          <p className="text-lg md:text-xl">{email}</p>
        </div>
        <div>
          <p className="text-md md:text-lg font-bold">Employment Status</p>
          <p className="text-lg md:text-xl">{status}</p>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="gap-4 p-2 whitespace-pre-line text-2xl">
        <ReactMarkdown>{about}</ReactMarkdown>
      </div>
    </div>
  );
}