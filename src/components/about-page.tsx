import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function AboutPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)} {...props}>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-black">
            About QuantumVote
          </CardTitle>
          <CardDescription className="text-black">
            Learn how QuantumKey Distribution (QKD) ensures secure, transparent, and tamper-proof voting.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <section>
            <h2 className="text-2xl font-semibold text-black">How QuantumKey Distribution Makes Voting Secure</h2>
            <p className="mt-2 text-sm text-black">
              Traditional voting systems rely on encryption and authentication to secure votes. However, quantum computing presents new challenges and opportunities. In the QuantumVote system, we use **Quantum Key Distribution (QKD)**, a method derived from quantum mechanics, to securely exchange encryption keys between voters and servers.
            </p>
            <p className="mt-2 text-sm text-black">
              QKD uses the principles of quantum mechanics to ensure that any attempt to intercept or measure the key will immediately alter the system and be detectable. This ensures that the key exchange process is **highly secure** and **tamper-proof**.
            </p>
            <p className="mt-2 text-sm text-black">
              With QKD, only the intended recipient can decrypt the vote, ensuring that your vote remains confidential and protected from hackers or external interference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black">How It Works</h2>
            <p className="mt-2 text-sm text-black">
              Here's how the QuantumVote system works in practice:
            </p>
            <ul className="list-disc ml-6 text-sm text-black">
              <li className="mt-2">
                <strong>Step 1:</strong> **Voter Authentication** - Voters log into the platform securely using email/password or third-party authentication (e.g., Google).
              </li>
              <li className="mt-2">
                <strong>Step 2:</strong> **Quantum Key Exchange** - Once logged in, the voter and the server initiate a QKD process to securely exchange encryption keys using the BB84 protocol.
              </li>
              <li className="mt-2">
                <strong>Step 3:</strong> **Vote Encryption** - The voter selects their candidate and submits their vote. The vote is encrypted using the shared encryption key generated through QKD.
              </li>
              <li className="mt-2">
                <strong>Step 4:</strong> **Vote Submission & Tallying** - The encrypted vote is sent to the server for storage. Only authorized entities can decrypt and tally the votes once the election is over, ensuring that no vote can be tampered with during the election process.
              </li>
              <li className="mt-2">
                <strong>Step 5:</strong> **Audit & Transparency** - After the election, the system provides an audit trail that lets third-party auditors confirm that the votes were accurately counted without revealing any voter identity, ensuring full transparency.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-black">Why QuantumVote?</h2>
            <p className="mt-2 text-sm text-black">
              The QuantumVote system is designed to offer the highest level of security and transparency possible in an election system:
            </p>
            <ul className="list-disc ml-6 text-sm text-black">
              <li className="mt-2">🔒 **Quantum Security** - Traditional encryption systems may be vulnerable to future quantum attacks. QKD offers quantum-safe encryption, securing your vote today and in the future.</li>
              <li className="mt-2">🛡️ **Tamper-proof** - Any attempt to intercept or modify the vote during transmission would be immediately detectable, making it almost impossible to alter election results.</li>
              <li className="mt-2">📜 **Full Transparency** - Voters and auditors can review the vote tallying process, ensuring the integrity of the election without compromising voter privacy.</li>
            </ul>
          </section>

          <a href="/" className="mt-6 w-full text-black bg-gray-200 hover:bg-gray-300 flex items-center justify-center py-2 rounded">
            Back to Home
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
