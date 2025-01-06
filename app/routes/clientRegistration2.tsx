import { prisma } from '~/utils/db.server';
import { ActionFunction, json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import React, { useState } from 'react';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const fName = formData.get('fName') as string;
  const lName = formData.get('lName') as string;
  const age = formData.get('age') as string;
  const dob = formData.get('dob') as string;

  if (!fName || !lName || !age || !dob) {
    return json({ error: 'All fields are required!' }, { status: 400 });
  }

  try {
    const newClient = await prisma.client.create({
      data: { fName, lName, age, dob },
    });
    return json({ success: true, client: newClient });
  } catch (error) {
    console.error(error);
    return json({ error: 'Failed to register client. Please try again.' }, { status: 500 });
  }
};

export default function RegisterClient() {
  const actionData = useActionData();
  const [clients, setClients] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    setIsSubmitting(true);
  };

  React.useEffect(() => {
    if (actionData?.client) {
      setClients((prevClients) => [...prevClients, actionData.client]);
      setIsSubmitting(false);
    }
  }, [actionData]);

  return (
    <div>
      <h1>Register Client</h1>

      {actionData?.error && <p style={{ color: 'red' }}>{actionData.error}</p>}

      <Form method="post" onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="fName" />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lName" />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" name="age" />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input type="text" name="dob" />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </Form>

      <div>
        <h2>Registered Clients</h2>
        {clients.length > 0 ? (
          <ul>
            {clients.map((client, index) => (
              <li key={client.cid || index}>
                <p>
                  <strong>Name:</strong> {client.fName} {client.lName}
                </p>
                <p>
                  <strong>Age:</strong> {client.age}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {client.dob}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No clients registered yet.</p>
        )}
      </div>
    </div>
  );
}
