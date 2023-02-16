import { useMutation } from 'react-query';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const activationKeyMutation = async (data) => {
  const { name, role, serviceLevel, usage } = data;
  const chrome = useChrome();
  const token = await chrome.auth.getToken();
  const response = await fetch('/api/rhsm/v2/activation_keys', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      role: role,
      serviceLevel: serviceLevel,
      usage: usage,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Status Code ${response.status}.  Error creating activation key: ${response.statusText}.`
    );
  }
  return response.json();
};

const useCreateActivationKey = () => {
  return useMutation(activationKeyMutation);
};

export { useCreateActivationKey as default };
