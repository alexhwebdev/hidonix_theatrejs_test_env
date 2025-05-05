'use client';

import { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email (simple validation)
    if (!email || !email.includes('@')) {
      setStatus('Please provide a valid email.');
      return;
    }

    // Make the API request to insert email into DatoCMS
    try {
      const res = await fetch('/api/submit-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('Thank you for subscribing!');
        setEmail(''); // Reset the form
      } else {
        setStatus('Failed to submit email. Try again later.');
      }
    } catch (error) {
      setStatus('Error submitting email.');
      console.error(error);
    }
  };

  return (
    <div className={`footer__email_form`}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={`submit`} type="submit">
          Subscribe
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default EmailForm;
