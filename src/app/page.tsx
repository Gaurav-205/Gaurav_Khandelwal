/**
 * Home page — server component.
 * Static metadata is resolved at build time; interactive behaviour
 * is delegated to HomeClient (the client island).
 */
import HomeClient from './HomeClient';

export default function Home() {
  return <HomeClient />;
}
