import cookie from 'cookie';

import App from '../src/App';

export const getSessionCookie = async (cookies) => {
  const cookie = cookies['auth.session'];

  if (!cookie) {
    throw new Error('Auth session not found');
  }

  // Decrypt the auth cookie
  const decoded = await Iron.unseal(
    cookie,
    process.env.SESSION_SECRET,
    Iron.defaults,
  );

  return decoded;
};

export const getServerSideProps = async ({ req }) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const session = await getSessionCookie(cookies);

    return {
      props: {
        user: session.user,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default function IndexPage(props) {
  return <App user={props.user} />;
}