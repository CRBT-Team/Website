import { CLIENT_SECRET } from '$env/static/private';

export async function getTokens(grantType: 'authorization_code' | 'refresh_token', codeOrToken: string, hostUrl: string) {
  return await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: '595731552709771264',
      client_secret: CLIENT_SECRET,
      grant_type: grantType,
      redirect_uri: `http://${hostUrl}/api/session/handle-login`,
      [grantType === 'authorization_code' ? 'code' : 'refresh_token']: codeOrToken,
      scope: 'identify guilds',
    }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  }).then((r) => r.json());
}