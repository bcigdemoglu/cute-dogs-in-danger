"use client";

import Image from "next/image";
import { useQuery } from "react-query";

const fetchDogPicUrl = async (): Promise<string> => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  if (!response.ok) throw new Error("Network response was not ok");
  const result = await response.json();
  return result.message;
};

export default function Home() {
  const {
    status,
    data: dogPicUrl,
    error,
  } = useQuery(["dogPicUrl"], fetchDogPicUrl);

  return (
    <main>
      <h1>Welcome to the home of dogs!</h1>
      {status === "loading" ? <p>Loading...</p> : null}
      {status === "error" ? <p>Error: {error.message}</p> : null}
      {status === "success" ? (
        <Image src={dogPicUrl} alt="A random dog" width={400} height={400} />
      ) : null}
    </main>
  );
}
