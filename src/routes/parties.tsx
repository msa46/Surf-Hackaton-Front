import { PartiesPage } from '@/components/parties-page';
import { createFileRoute } from '@tanstack/react-router';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

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
mock.onGet("/users").reply(200, {
  users: [
    { id: 1, name: "Donald Trump" },
    { id: 2, name: "Hillary Clinton" },
  ],
});

// Export mock candidates
export const mockCandidates: Candidate[] = [
  { id: 1, name: "Donald Trump" },
  { id: 2, name: "Hillary Clinton" },
];

export const Route = createFileRoute('/parties')({
  component: Parties,
});

function Parties() {
  return (
    <>
      <PartiesPage candidates={mockCandidates} />
    </>
  );
}
