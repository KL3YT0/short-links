export function getAuthorization(): string | null {
  const token_type = localStorage.getItem('token_type');
  const access_token = localStorage.getItem('access_token');

  if (!token_type || !access_token) {
    return null;
  }

  return `${token_type} ${access_token}`;
}