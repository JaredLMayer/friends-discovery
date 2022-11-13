import Iron from '@hapi/iron';
import { serialize } from 'cookie';

export const setAuthCookie = async (res, session, options = {}) => {
  const defaults = {
    maxAge: 3600 * 1000 * 5,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  };
  const opts = { ...defaults, ...options };

  try {
    // We're encrypting our session here using the SESSION_SECRET defined in our
    // .env file.
    const signedSession = await Iron.seal(
      session,
      process.env.SPOTIFY_SESSION_SECRET,
      Iron.defaults,
    );

    const stringValue =
      typeof signedSession === 'object'
        ? 'j:' + JSON.stringify(signedSession)
        : String(signedSession);

    if ('maxAge' in opts) {
      opts.expires = new Date(Date.now() + opts.maxAge);
      opts.maxAge /= 1000;
    }

    // Set the cookie in the header of the response
    res.setHeader('Set-Cookie', serialize('auth.session', stringValue, opts));
  } catch (error) {
    console.error('Failed to seal session object', error);
    return;
  }
};