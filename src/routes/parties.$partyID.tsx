import { PartiesPage } from '@/components/parties-page';
import { encrypt } from '@/qkd-client/encrypt';
import { createFileRoute } from '@tanstack/react-router';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useEffect, useState } from "react";

// Define the Candidate type
export type Candidate = {
  id: number;
  name: string;
};

// Mock Axios instance
export const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

// Mock QKD POST requests
mock.onPost("/vote").reply((config) => {
  const { candidate } = JSON.parse(config.data);
  return [200, { message: `Vote registered for ${candidate} using QKD!` }];
});

// Mock GET request for candidates
mock.onGet(/\/api\/\d{4}-\d{2}-\d{2}/).reply((config) => {
  const electionDate = config.url?.split("/").pop(); // Extract the date from the URL
  const data = {
    "2025-05-10": { users: [{ id: 1, name: "Donald Trump" }, { id: 2, name: "Hillary Clinton" }] },
    "2025-06-15": { users: [{ id: 3, name: "Barack Obama" }, { id: 4, name: "George Bush" }] },
  };

  if (electionDate && data[electionDate as keyof typeof data]) {
    return [200, data[electionDate as keyof typeof data]];
  } else {
    return [404, { message: "No candidates found for this election date." }];
  }
});
export const Route = createFileRoute('/parties/$partyID')({
  loader: async ({ params }) => {
    const response = await axiosInstance.get(`/api/${params.partyID}`);
    return response.data;
  },
  component: Parties,
});

function Parties() {
  const { partyID } = Route.useParams(); // Access the dynamic route parameter
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Default to an empty array
  const [message, setMessage] = useState("");

  // Fetch candidates dynamically based on partyId (election date)
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axiosInstance.get(`/api/${partyID}`);
        setCandidates(response.data.users); // Assuming the API returns a `users` array
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
        setCandidates([]); // Reset candidates if the fetch fails
      }
    };

    fetchCandidates();
  }, [partyID]);

  const handleVote = (candidate: string) => {
    const candidateEncrypted = encrypt(candidate, "key"); 
    const key_id = "6a6ada0a-c179-44d3-8b51-249fba50dc50";
    const key = "u+0xxY/Mg3J8WhTxLXvGatH5b6QXRXYftKZsX6Lztmg=";
    axiosInstance.post("/vote", { candidate:candidateEncrypted, key_id, key , })
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Failed to register vote:", error));
  };

  return (
    <>
      <PartiesPage 
        candidates={candidates} 
        handleVote={handleVote} 
        message={message} 
      />
    </>
  );
}